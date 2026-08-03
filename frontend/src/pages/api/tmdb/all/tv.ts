import { SeriesProps, TMDBSeries } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

//const tmdbToken = process.env.TMDB_TOKEN

const maxAttempts = 3
const batchSize = 90
const requestTimeout = 8_000
const batchInterval = 500
const retryInterval = 2_000

const cache = new Map<number, TMDBSeries>()

interface SeriesRequestBody {
    series?: SeriesProps[]
}

interface CardDataSuccess {
    success: true
    cardId: number
    data: TMDBSeries
}

interface CardDataFailure {
    success: false
    cardId: number
    error: string
}

type CardDataResponse = CardDataSuccess | CardDataFailure

interface HandlerResponse {
    success: boolean
    data?: TMDBSeries[]
    errors?: CardDataFailure[]
    error?: string
}

const getTmdbToken = (): string => {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN?.trim()

    if (!token) {
        throw new Error('TMDB_TOKEN não configurado')
    }

    return token
}

const sleep = async (milliseconds: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, milliseconds))
}

const shouldRetry = (error: unknown): boolean => {
    if (!axios.isAxiosError(error)) {
        return false
    }

    if (
        error.code === AxiosError.ECONNABORTED ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ECONNRESET'
    ) {
        return true
    }

    const status = error.response?.status

    if (!status) {
        return true
    }

    return status === 429 || status >= 500
}

const getErrorMessage = (error: unknown): string => {
    if (!axios.isAxiosError(error)) {
        return error instanceof Error
            ? error.message
            : 'Erro desconhecido'
    }

    const responseData = error.response?.data

    if (typeof responseData === 'string') {
        return responseData
    }

    if (
        responseData &&
        typeof responseData === 'object' &&
        'status_message' in responseData &&
        typeof responseData.status_message === 'string'
    ) {
        return responseData.status_message
    }

    return error.message
}

const fetchCardData = async (
    cardId: number,
    token: string,
    attempt = 1,

): Promise<CardDataResponse> => {
    const cached = cache.get(cardId)

    if (cached) {
        debug.log('Série encontrada no cache', cardId)

        return {
            success: true,
            cardId,
            data: cached,
        }
    }



    try {
        const response = await axios.get<TMDBSeries>(
            `https://api.themoviedb.org/3/tv/${cardId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    language: 'pt-BR',
                },
                timeout: requestTimeout,
            },
        )

        cache.set(cardId, response.data)

        return {
            success: true,
            cardId,
            data: response.data,
        }
    } catch (error: unknown) {
        const canRetry =
            attempt < maxAttempts &&
            shouldRetry(error)

        if (canRetry) {
            debug.log(
                `Tentativa ${attempt} falhou para a série ${cardId}. Tentando novamente...`,
            )

            await sleep(retryInterval * attempt)

            return fetchCardData(cardId, token, attempt + 1)
        }

        return {
            success: false,
            cardId,
            error: getErrorMessage(error),
        }
    }
}

const fetchInBatches = async (
    items: SeriesProps[],
    size: number,
    token: string
): Promise<CardDataResponse[]> => {
    const results: CardDataResponse[] = []

    for (let index = 0; index < items.length; index += size) {
        const batch = items.slice(index, index + size)

        const batchResults = await Promise.all(
            batch.map(serie => fetchCardData(serie.tmdbID, token)),
        )

        results.push(...batchResults)

        const hasNextBatch = index + size < items.length

        if (hasNextBatch) {
            await sleep(batchInterval)
        }
    }

    return results
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HandlerResponse>,
): Promise<void> {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])

        res.status(405).json({
            success: false,
            error: `Method ${req.method} Not Allowed`,
        })

        return
    }

    const token: string = getTmdbToken()

    if (!token) {
        res.status(500).json({
            success: false,
            error: 'TMDB token is missing',
        })

        return
    }

    const { series } = req.body as SeriesRequestBody

    if (!Array.isArray(series) || series.length === 0) {
        res.status(400).json({
            success: false,
            error: 'Nenhuma série enviada.',
        })

        return
    }

    const validSeries = series.filter(serie => {
        return (
            Number.isInteger(serie.tmdbID) &&
            serie.tmdbID > 0
        )
    })

    if (validSeries.length === 0) {
        res.status(400).json({
            success: false,
            error: 'Nenhuma série possui um tmdbID válido.',
        })

        return
    }

    try {
        const uniqueSeries = Array.from(
            new Map(
                validSeries.map(serie => [
                    serie.tmdbID,
                    serie,
                ]),
            ).values(),
        )

        const results = await fetchInBatches(
            uniqueSeries,
            batchSize,
            token
        )

        const successfulById = new Map<number, TMDBSeries>()

        const errors: CardDataFailure[] = []

        for (const result of results) {
            if (result.success) {
                successfulById.set(
                    result.cardId,
                    result.data,
                )

                continue
            }

            errors.push(result)
        }

        const data = validSeries.flatMap(serie => {
            const result = successfulById.get(serie.tmdbID)

            return result ? [result] : []
        })

        res.status(200).json({
            success: true,
            data,
            errors,
        })
    } catch (error: unknown) {
        console.error(
            'Erro inesperado ao buscar dados das séries:',
            error,
        )

        res.status(500).json({
            success: false,
            error: 'Erro interno ao buscar dados das séries.',
        })
    }
}
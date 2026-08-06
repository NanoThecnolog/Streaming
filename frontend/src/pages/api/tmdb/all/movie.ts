import { CardsProps, MovieTMDB } from '@/@types/Cards'
import { debug } from '@/classes/DebugLogger'
import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const maxAttempts = 3
const batchSize = 90
const requestTimeout = 8_000
const batchInterval = 500
const retryInterval = 2_000

const cache = new Map<number, MovieTMDB>()

interface MoviesRequestBody {
    movies?: CardsProps[]
}

interface MovieSuccessResult {
    success: true
    cardId: number
    data: MovieTMDB
}

interface MovieErrorResult {
    success: false
    cardId: number
    error: string
}

type MovieResult = MovieSuccessResult | MovieErrorResult

interface MoviesResponse {
    success: boolean
    data?: MovieTMDB[]
    errors?: MovieErrorResult[]
    error?: string
}

const sleep = async (milliseconds: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getTmdbToken = (): string | null => {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN?.trim()

    return token || null
}

export const shouldRetry = (error: unknown): boolean => {
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

const fetchMovieData = async (movieId: number, token: string, attempt = 1): Promise<MovieResult> => {
    const cachedMovie = cache.get(movieId)

    if (cachedMovie) {
        //debug.log('Filme encontrado no cache:', movieId)

        return {
            success: true,
            cardId: movieId,
            data: cachedMovie,
        }
    }

    try {
        const response = await axios.get<MovieTMDB>(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: 'application/json',
                },
                params: {
                    language: 'pt-BR',
                },
                timeout: requestTimeout,
            },
        )

        cache.set(movieId, response.data)

        return {
            success: true,
            cardId: movieId,
            data: response.data,
        }
    } catch (error: unknown) {
        const canRetry = attempt < maxAttempts && shouldRetry(error)

        if (canRetry) {
            debug.log(`Tentativa ${attempt} falhou para o filme ${movieId}. Tentando novamente...`)

            await sleep(retryInterval * attempt)

            return fetchMovieData(
                movieId,
                token,
                attempt + 1,
            )
        }

        return {
            success: false,
            cardId: movieId,
            error: getErrorMessage(error),
        }
    }
}

const fetchInBatches = async (items: CardsProps[], size: number, token: string): Promise<MovieResult[]> => {
    const results: MovieResult[] = []

    for (let index = 0; index < items.length; index += size) {
        const batch = items.slice(index, index + size)

        const batchResults = await Promise.all(
            batch.map(movie =>
                fetchMovieData(
                    movie.tmdbId,
                    token,
                ),
            ),
        )

        results.push(...batchResults)

        const hasNextBatch =
            index + size < items.length

        if (hasNextBatch) {
            await sleep(batchInterval)
        }
    }

    return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MoviesResponse>): Promise<void> {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])

        res.status(405).json({
            success: false,
            error: `Method ${req.method} Not Allowed`,
        })

        return
    }

    const token = getTmdbToken()

    if (!token) {
        res.status(500).json({
            success: false,
            error: 'TMDB token is missing',
        })

        return
    }

    const { movies } = req.body as MoviesRequestBody

    if (!Array.isArray(movies) || movies.length === 0) {
        res.status(400).json({
            success: false,
            error: 'Nenhum filme enviado.',
        })

        return
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')

    const validMovies = movies.filter(movie => {
        return (
            Number.isInteger(movie.tmdbId) &&
            movie.tmdbId > 0
        )
    })

    if (validMovies.length === 0) {
        res.status(400).json({
            success: false,
            error: 'Nenhum filme possui um tmdbId válido.',
        })

        return
    }

    debug.time('TempoTotalDaRotaMovies')

    try {
        /*
         * Remove IDs duplicados apenas durante a busca.
         * A ordem e as duplicações originais são reconstruídas depois.
         */
        const uniqueMovies = Array.from(
            new Map(
                validMovies.map(movie => [
                    movie.tmdbId,
                    movie,
                ]),
            ).values(),
        )

        const results = await fetchInBatches(
            uniqueMovies,
            batchSize,
            token,
        )

        const moviesById = new Map<number, MovieTMDB>()
        const errors: MovieErrorResult[] = []

        for (const result of results) {
            if (result.success) {
                moviesById.set(
                    result.cardId,
                    result.data,
                )

                continue
            }

            errors.push(result)
        }

        /*
         * Preserva a ordem recebida do frontend.
         */
        const data = validMovies.flatMap(movie => {
            const movieData = moviesById.get(movie.tmdbId)

            return movieData
                ? [movieData]
                : []
        })

        res.status(200).json({
            success: true,
            data,
            errors,
        })
    } catch (error: unknown) {
        console.error(
            'Erro inesperado ao buscar filmes:',
            error,
        )

        res.status(500).json({
            success: false,
            error: 'Erro interno ao buscar dados dos filmes.',
        })
    } finally {
        debug.timeEnd('TempoTotalDaRotaMovies')
    }
}
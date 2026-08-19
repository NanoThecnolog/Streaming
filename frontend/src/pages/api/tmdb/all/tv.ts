import { SeriesProps, TMDBSeries } from '@/@types/series'
import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import pLimit from 'p-limit'
import { debug } from '@/classes/DebugLogger'

//const tmdbToken = process.env.TMDB_TOKEN

const maxAttempts = 3
const requestTimeout = 8_000
const retryInterval = 2_000
const defaultConcurrency = 16

const cache = new Map<number, TMDBSeries>()
const inFlightRequests = new Map<number, Promise<CardDataResponse>>()

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
  metrics?: CacheMetrics
}

interface CacheMetrics {
  cacheHits: number
  cacheMisses: number
  cacheSize: number
  durationMs: number
  concurrency: number
  tmdbRequests: number
  retries: number
  rateLimited: number
  failures: number
  averageLatencyMs: number
}

interface RequestMetrics {
  tmdbRequests: number
  retries: number
  rateLimited: number
  totalLatencyMs: number
}

const getTmdbToken = (): string => {
  const token = process.env.TMDB_TOKEN?.trim()

  if (!token) {
    throw new Error('TMDB_TOKEN não configurado')
  }

  return token
}

const sleep = async (milliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds))
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
    return error instanceof Error ? error.message : 'Erro desconhecido'
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

const requestCardData = async (
  cardId: number,
  token: string,
  metrics: RequestMetrics,
  attempt = 1,
): Promise<CardDataResponse> => {
  const cached = cache.get(cardId)

  if (cached) {
    //debug.log('Série encontrada no cache', cardId)

    return {
      success: true,
      cardId,
      data: cached,
    }
  }

  const requestStartedAt = Date.now()

  try {
    metrics.tmdbRequests += 1
    const response = await axios.get<TMDBSeries>(`https://api.themoviedb.org/3/tv/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: 'pt-BR',
      },
      //timeout: requestTimeout,
    })
    metrics.totalLatencyMs += Date.now() - requestStartedAt

    cache.set(cardId, response.data)

    return {
      success: true,
      cardId,
      data: response.data,
    }
  } catch (error: unknown) {
    metrics.totalLatencyMs += Date.now() - requestStartedAt
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      metrics.rateLimited += 1
    }
    const canRetry = attempt < maxAttempts && shouldRetry(error)

    if (canRetry) {
      metrics.retries += 1
      //debug.log(                `Tentativa ${attempt} falhou para a série ${cardId}. Tentando novamente...`,            )

      await sleep(retryInterval * attempt)

      return requestCardData(cardId, token, metrics, attempt + 1)
    }

    return {
      success: false,
      cardId,
      error: getErrorMessage(error),
    }
  }
}

const fetchCardData = async (
  cardId: number,
  token: string,
  metrics: RequestMetrics,
): Promise<CardDataResponse> => {
  const cachedCard = cache.get(cardId)

  if (cachedCard) {
    return { success: true, cardId, data: cachedCard }
  }

  const pendingRequest = inFlightRequests.get(cardId)
  if (pendingRequest) return pendingRequest

  const request = requestCardData(cardId, token, metrics)
  inFlightRequests.set(cardId, request)

  try {
    return await request
  } finally {
    if (inFlightRequests.get(cardId) === request) inFlightRequests.delete(cardId)
  }
}

const fetchWithConcurrency = async (
  items: SeriesProps[],
  token: string,
  concurrency: number,
  metrics: RequestMetrics,
): Promise<CardDataResponse[]> => {
  const limit = pLimit(concurrency)
  let completed = 0
  debug.info(`[TMDB series] Fila iniciada: ${items.length} IDs, concorrência ${concurrency}.`)
  const watchdog = setInterval(() => {
    debug.info(
      `[TMDB series] Progresso: ${completed}/${items.length}; ativas: ${limit.activeCount}; aguardando: ${limit.pendingCount}.`,
    )
  }, 10_000)

  try {
    return await Promise.all(
      items.map((serie) =>
        limit(async () => {
          try {
            return await fetchCardData(serie.tmdbID, token, metrics)
          } finally {
            completed += 1
          }
        }),
      ),
    )
  } finally {
    clearInterval(watchdog)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>,
): Promise<void> {
  const startedAt = Date.now()

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
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')

  const validSeries = series.filter((serie) => {
    return Number.isInteger(serie.tmdbID) && serie.tmdbID > 0
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
      new Map(validSeries.map((serie) => [serie.tmdbID, serie])).values(),
    )

    const cachedResults: CardDataSuccess[] = []
    const missingSeries: SeriesProps[] = []

    for (const serie of uniqueSeries) {
      const cachedSerie = cache.get(serie.tmdbID)

      if (cachedSerie) {
        cachedResults.push({
          success: true,
          cardId: serie.tmdbID,
          data: cachedSerie,
        })
      } else {
        missingSeries.push(serie)
      }
    }

    const concurrency = Math.max(
      1,
      Number(process.env.TMDB_FETCH_CONCURRENCY) || defaultConcurrency,
    )
    const requestMetrics: RequestMetrics = {
      tmdbRequests: 0,
      retries: 0,
      rateLimited: 0,
      totalLatencyMs: 0,
    }
    const fetchedResults = await fetchWithConcurrency(
      missingSeries,
      token,
      concurrency,
      requestMetrics,
    )
    const results: CardDataResponse[] = [...cachedResults, ...fetchedResults]

    const successfulById = new Map<number, TMDBSeries>()

    const errors: CardDataFailure[] = []

    for (const result of results) {
      if (result.success) {
        successfulById.set(result.cardId, result.data)

        continue
      }

      errors.push(result)
    }

    const data = validSeries.flatMap((serie) => {
      const result = successfulById.get(serie.tmdbID)

      return result ? [result] : []
    })

    const metrics: CacheMetrics = {
      cacheHits: cachedResults.length,
      cacheMisses: missingSeries.length,
      cacheSize: cache.size,
      durationMs: Date.now() - startedAt,
      concurrency,
      tmdbRequests: requestMetrics.tmdbRequests,
      retries: requestMetrics.retries,
      rateLimited: requestMetrics.rateLimited,
      failures: errors.length,
      averageLatencyMs: requestMetrics.tmdbRequests
        ? Math.round(requestMetrics.totalLatencyMs / requestMetrics.tmdbRequests)
        : 0,
    }

    debug.info('[TMDB series] Métricas finais:', metrics)

    res.status(200).json({
      success: true,
      data,
      errors,
      metrics,
    })
  } catch (error: unknown) {
    console.error('Erro inesperado ao buscar dados das séries:', error)

    res.status(500).json({
      success: false,
      error: 'Erro interno ao buscar dados das séries.',
    })
  }
}

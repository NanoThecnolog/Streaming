import { CardsProps, MovieTMDB } from '@/@types/Cards'
import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import pLimit from 'p-limit'
import { debug } from '@/classes/DebugLogger'

const maxAttempts = 3
const requestTimeout = 15_000
const retryInterval = 2_000
const defaultConcurrency = 16

const cache = new Map<number, MovieTMDB>()
const inFlightRequests = new Map<number, Promise<MovieResult>>()

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

const sleep = async (milliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const getTmdbToken = (): string | null => {
  const token = process.env.TMDB_TOKEN?.trim()

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

const requestMovieData = async (
  movieId: number,
  token: string,
  metrics: RequestMetrics,
  attempt = 1,
): Promise<MovieResult> => {
  const cachedMovie = cache.get(movieId)

  if (cachedMovie) {
    //debug.log('Filme encontrado no cache:', movieId)

    return {
      success: true,
      cardId: movieId,
      data: cachedMovie,
    }
  }

  const requestStartedAt = Date.now()

  try {
    metrics.tmdbRequests += 1

    const response = await axios.get<MovieTMDB>(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      params: {
        language: 'pt-BR',
      },
      //timeout: requestTimeout,
    })

    metrics.totalLatencyMs += Date.now() - requestStartedAt

    cache.set(movieId, response.data)

    return {
      success: true,
      cardId: movieId,
      data: response.data,
    }
  } catch (error: unknown) {
    metrics.totalLatencyMs += Date.now() - requestStartedAt

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) metrics.rateLimited += 1
    }
    const canRetry = attempt < maxAttempts && shouldRetry(error)

    if (canRetry) {
      metrics.retries += 1
      //debug.log(`Tentativa ${attempt} falhou para o filme ${movieId}. Tentando novamente...`)

      await sleep(retryInterval * attempt)

      return requestMovieData(movieId, token, metrics, attempt + 1)
    }

    return {
      success: false,
      cardId: movieId,
      error: getErrorMessage(error),
    }
  }
}

const fetchMovieData = async (
  movieId: number,
  token: string,
  metrics: RequestMetrics,
): Promise<MovieResult> => {
  const cachedMovie = cache.get(movieId)

  if (cachedMovie) {
    return { success: true, cardId: movieId, data: cachedMovie }
  }

  const pendingRequest = inFlightRequests.get(movieId)
  if (pendingRequest) return pendingRequest

  const request = requestMovieData(movieId, token, metrics)
  inFlightRequests.set(movieId, request)

  try {
    return await request
  } finally {
    if (inFlightRequests.get(movieId) === request) inFlightRequests.delete(movieId)
  }
}

const fetchWithConcurrency = async (
  items: CardsProps[],
  token: string,
  concurrency: number,
  metrics: RequestMetrics,
): Promise<MovieResult[]> => {
  const limit = pLimit(concurrency)
  let completed = 0

  debug.info(`[TMDB movies] Fila iniciada: ${items.length} IDs, concorrência ${concurrency}.`)

  const watchdog = setInterval(() => {
    debug.info(
      `[TMDB movies] Progresso: ${completed}/${items.length}; ativas: ${limit.activeCount}; aguardando: ${limit.pendingCount}.`,
    )
  }, 10_000)

  try {
    return await Promise.all(
      items.map((movie) =>
        limit(async () => {
          try {
            return await fetchMovieData(movie.tmdbId, token, metrics)
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
  res: NextApiResponse<MoviesResponse>,
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

  const validMovies = movies.filter((movie) => {
    return Number.isInteger(movie.tmdbId) && movie.tmdbId > 0
  })

  if (validMovies.length === 0) {
    res.status(400).json({
      success: false,
      error: 'Nenhum filme possui um tmdbId válido.',
    })

    return
  }

  //debug.time('TempoTotalDaRotaMovies')

  try {
    /*
     * Remove IDs duplicados apenas durante a busca.
     * A ordem e as duplicações originais são reconstruídas depois.
     */
    const uniqueMovies = Array.from(
      new Map(validMovies.map((movie) => [movie.tmdbId, movie])).values(),
    )

    const cachedResults: MovieSuccessResult[] = []
    const missingMovies: CardsProps[] = []

    for (const movie of uniqueMovies) {
      const cachedMovie = cache.get(movie.tmdbId)

      if (cachedMovie) {
        cachedResults.push({
          success: true,
          cardId: movie.tmdbId,
          data: cachedMovie,
        })
      } else {
        missingMovies.push(movie)
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
      missingMovies,
      token,
      concurrency,
      requestMetrics,
    )
    const results: MovieResult[] = [...cachedResults, ...fetchedResults]

    const moviesById = new Map<number, MovieTMDB>()
    const errors: MovieErrorResult[] = []

    for (const result of results) {
      if (result.success) {
        moviesById.set(result.cardId, result.data)

        continue
      }

      errors.push(result)
    }

    /*
     * Preserva a ordem recebida do frontend.
     */
    const data = validMovies.flatMap((movie) => {
      const movieData = moviesById.get(movie.tmdbId)

      return movieData ? [movieData] : []
    })

    const metrics: CacheMetrics = {
      cacheHits: cachedResults.length,
      cacheMisses: missingMovies.length,
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

    debug.info('[TMDB movies] Métricas finais:', metrics)

    res.status(200).json({
      success: true,
      data,
      errors,
      metrics,
    })
  } catch (error: unknown) {
    console.error('Erro inesperado ao buscar filmes:', error)

    res.status(500).json({
      success: false,
      error: 'Erro interno ao buscar dados dos filmes.',
    })
  }
}

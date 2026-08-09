import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series'
import { apiManager } from '@/services/apiManager'
import axios from 'axios'
import { debug } from './DebugLogger'

interface ContentError {
  id: number
  code: 'TMDB_HTTP_ERROR' | 'TMDB_REQUEST_ERROR'
  message: string
  status: number | null
  retryable: boolean
}

interface ContentResponse<T> {
  success: boolean
  status: 'complete' | 'partial'
  data: T[]
  errors: ContentError[]
}

class FlixFetcher {
  private movieRequest: Promise<MovieTMDB[]> | null = null
  private serieRequest: Promise<TMDBSeries[]> | null = null

  fetchMovieData(): Promise<MovieTMDB[]> {
    if (this.movieRequest) return this.movieRequest

    const request = this.fetchContent<MovieTMDB>('/movie/tmdb', 'filmes')
    this.movieRequest = request

    void request
      .finally(() => {
        if (this.movieRequest === request) this.movieRequest = null
      })
      .catch(() => undefined)

    return request
  }

  fetchSerieData(): Promise<TMDBSeries[]> {
    if (this.serieRequest) return this.serieRequest

    const request = this.fetchContent<TMDBSeries>('/serie/tmdb', 'séries')
    this.serieRequest = request

    void request
      .finally(() => {
        if (this.serieRequest === request) this.serieRequest = null
      })
      .catch(() => undefined)

    return request
  }

  private async fetchContent<T>(path: string, contentType: string): Promise<T[]> {
    try {
      const response = await apiManager.get<ContentResponse<T>>(path)
      const { data, errors, status } = response.data

      if (status === 'partial') {
        debug.warn(`Resposta parcial ao carregar ${contentType}.`, errors)
      }

      if (!data.length && errors.length) {
        throw new Error(`Nenhum item de ${contentType} pôde ser carregado.`)
      }

      return data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        const code = error.response?.data?.code

        throw new Error(
          [code, message].filter(Boolean).join(': ') || `Não foi possível carregar ${contentType}.`,
        )
      }

      throw error
    }
  }
}

export const flixFetcher = new FlixFetcher()

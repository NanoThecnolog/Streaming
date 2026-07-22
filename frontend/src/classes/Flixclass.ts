import { apiTMDB } from "@/services/apiTMDB";
import { debug } from "./DebugLogger";
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { SeriesProps, TMDBSeries } from "@/@types/series";

class FlixFetcher {
    private movieLoading: boolean
    private serieLoading: boolean
    private allData: MovieTMDB[]
    private serieData: TMDBSeries[]
    private maxRetries: number

    constructor() {
        this.movieLoading = false
        this.serieLoading = false
        this.allData = []
        this.serieData = []
        this.maxRetries = 5
    }

    /**
     * Realiza a busca dos dados no TMDB e salva no context.
     * @returns não retorna dado nenhum
    */
    async fetchMovieData(setAllData: (data: MovieTMDB[]) => void, movies: CardsProps[], attempt: number = 1) {
        if (this.movieLoading) return
        if (movies.length === 0) return debug.error("Lista movies vazia!", movies)

        this.movieLoading = true
        try {
            const response = await apiTMDB.post<{ success: boolean, data: MovieTMDB[], errors: any[] }>('/all/movie', {
                movies
            })

            if (response.status === 502 || !response.data) {
                await this.retryMovie(setAllData, attempt, movies)
                return
            }

            debug.log("Erros na requisição ao tmdb de filmes: ", response.data.errors)
            this.allData = response.data.data as MovieTMDB[]
            setAllData(this.allData)
        } catch (err) {
            debug.error(`Erro na tentativa ${attempt}`, err)
            await this.retryMovie(setAllData, attempt, movies)
        } finally {
            this.movieLoading = false
        }
    }

    async fetchSerieData(setSerieData: (data: TMDBSeries[]) => void, series: SeriesProps[], attempt: number = 1) {
        if (this.serieLoading) return

        this.serieLoading = true

        if (!series || !series.length) {
            debug.warn("series em fetchSeriesData vazio", series)
            return
        }

        debug.log("Series em fecthSerieData", series)

        try {
            const response = await apiTMDB.post('/all/tv', {
                series
            })

            if (response.status === 502 || !response.data) {
                await this.retrySerie(setSerieData, series, attempt)
                return
            }

            debug.log("Erros na requisição ao tmdb de séries: ", response.data.errors)

            this.serieData = response.data.data as TMDBSeries[]
            setSerieData(this.serieData)
        } catch (err) {
            debug.error(`Erro na tentativa ${attempt}`, err)
            await this.retrySerie(setSerieData, series, attempt)
        } finally {
            this.serieLoading = false
        }
    }

    private retryMovie(setAllData: (data: MovieTMDB[]) => void, attempt: number, movies: CardsProps[]) {
        if (attempt < this.maxRetries) {
            debug.warn(`Tentativa ${attempt}/${this.maxRetries} falhou. Tentando novamente em 4 segundos...`)
            setTimeout(() => this.fetchMovieData(setAllData, movies, attempt + 1), 4000)
        } else {
            debug.log("Numero maximo de tentativas atingido.")
        }
    }
    private retrySerie(setSerieData: (data: TMDBSeries[]) => void, series: SeriesProps[], attempt: number) {
        if (attempt < this.maxRetries) {
            debug.warn(`Tentativa ${attempt}/${this.maxRetries} falhou. Tentando novamente em 4 segundos...`)
            setTimeout(() => this.fetchSerieData(setSerieData, series, attempt + 1), 4000)
        } else {
            debug.log("Numero maximo de tentativas atingido.")
        }
    }
}

export const flixFetcher = new FlixFetcher()
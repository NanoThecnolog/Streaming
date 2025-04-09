import { apiTMDB } from "@/services/apiTMDB";
import { debug } from "./DebugLogger";
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";

class FlixFetcher {
    private loading: boolean
    private allData: MovieTMDB[]
    private serieData: TMDBSeries[]
    private maxRetries: number
    //private setAllData: (data: MovieTMDB[]) => void
    //private setSerieData: (data: TMDBSeries[]) => void

    constructor(/*setAllData: (data: MovieTMDB[]) => void, setSerieData: (data: TMDBSeries[]) => void*/) {
        //if (!FlixFetcher.api) debug.error("API mal configurada na classe")
        this.loading = false
        this.allData = []
        this.serieData = []
        this.maxRetries = 5
        //this.setAllData = setAllData
        //this.setSerieData = setSerieData
    }

    /**
     * Realiza a busca dos dados no TMDB e salva no context.
     * @returns não retorna dado nenhum
    */

    async fetchMovieData(setAllData: (data: MovieTMDB[]) => void, movies: CardsProps[], attempt: number = 1) {
        if (this.loading) return

        this.loading = true
        try {
            debug.log("Movies no fetchMovieData", movies)
            if (movies.length === 0) return debug.error("Lista movies vazia!", movies)
            const response = await apiTMDB.post('/all/movie', {
                movies: movies
            })
            if (response.status === 502 || !response.data) {
                this.retryMovie(setAllData, attempt, movies)
                return
            }
            debug.log("Erros na requisição ao tmdb: ", response.data.errors)
            this.allData = response.data.data as MovieTMDB[]
            //return this.allData
            setAllData(this.allData)
        } catch (err) {
            debug.error(`Erro na tentativa ${attempt}`, err)
            this.retryMovie(setAllData, attempt, movies)
        } finally {
            this.loading = false
        }
    }

    async fetchSerieData(setSerieData: (data: TMDBSeries[]) => void, attempt: number = 1) {
        if (this.loading) return

        this.loading = true
        try {
            const response = await apiTMDB.get('/all/tv')
            if (response.status === 502 || !response.data) {
                this.retrySerie(setSerieData, attempt)
            }
            this.serieData = response.data.data as TMDBSeries[]
            setSerieData(this.serieData)
        } catch (err) {
            debug.error(`Erro na tentativa ${attempt}`, err)
            this.retrySerie(setSerieData, attempt)
        } finally {
            this.loading = false
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
    private retrySerie(setSerieData: (data: TMDBSeries[]) => void, attempt: number) {
        if (attempt < this.maxRetries) {
            debug.warn(`Tentativa ${attempt}/${this.maxRetries} falhou. Tentando novamente em 4 segundos...`)
            setTimeout(() => this.fetchSerieData(setSerieData, attempt + 1), 4000)
        } else {
            debug.log("Numero maximo de tentativas atingido.")
        }
    }
}

export const flixFetcher = new FlixFetcher()
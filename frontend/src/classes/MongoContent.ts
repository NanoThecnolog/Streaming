import { apiManager } from "@/services/apiManager";
import { debug } from "./DebugLogger";
import { CardsProps } from "@/@types/Cards";
import { SeriesProps } from "@/@types/series";
import { MovieProps } from "@/components/dashboard/Movie/Create";
import { TVProps } from "@/components/dashboard/Tv/Create";

class MongoContentService {
    constructor() { }
    async fetchMovieData(): Promise<CardsProps[]> {
        try {
            const response = await apiManager.get('/movie')
            const data: CardsProps[] = response.data
            //debug.log('Filmes', data)
            return data
        } catch (err) {
            debug.error(err)
            return []
        }
    }
    async fetchSerieData(): Promise<SeriesProps[]> {
        try {
            const response = await apiManager.get('/serie')
            const data: SeriesProps[] = response.data
            //debug.log('Series', data)
            return data
        } catch (err) {
            debug.error(err)
            return []
        }
    }

    async findOneMovieById(id: number): Promise<CardsProps | null> {
        try {
            const response = await apiManager.get(`/movie/tmdbid/${id}`)
            const data: CardsProps = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
    async findOneSerieById(id: number): Promise<SeriesProps | null> {
        try {
            const response = await apiManager.get(`/serie/tmdbid/${id}`)
            const data: SeriesProps = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
    async createMovie(movie: MovieProps): Promise<CardsProps | null> {
        try {
            //debug.log(data)
            const response = await apiManager.post('/movie', movie)
            const data: CardsProps = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
    async updateMovie(id: number, movie: any): Promise<CardsProps | null> {
        try {
            const response = await apiManager.put(`/movie/${id}`, movie)
            const data: CardsProps = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
    async createSerie(serie: TVProps): Promise<SeriesProps | null> {
        try {
            const response = await apiManager.post('/serie', serie)
            const data = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
    async updateSerie(id: number, serie: any): Promise<SeriesProps | null> {
        try {
            const response = await apiManager.put(`/serie/${id}`, serie)
            const data: SeriesProps = response.data
            return data
        } catch (err) {
            debug.error(err)
            return null
        }
    }
}
export const mongoService = new MongoContentService()
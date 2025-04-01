import { apiManager } from "@/services/apiManager";
import { debug } from "./DebugLogger";
import { CardsProps } from "@/@types/Cards";
import { SeriesProps } from "@/@types/series";

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
}
export const mongoService = new MongoContentService()
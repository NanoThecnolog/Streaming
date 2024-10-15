import { TMDBEpisodes } from "@/@types/series"
import axios from "axios"

export async function episodeImage(tmdbID: number, season: number): Promise<TMDBEpisodes[] | null> {
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
    if (!tmdbToken) {
        console.warn("Variável de ambiente TMDB não definida.")
        return null
    }
    if (tmdbID === 0) return null
    const tmdbUrl = 'https://api.themoviedb.org/3/tv/'
    const language = 'pt-BR'
    const endPoint = `${tmdbUrl}${tmdbID}/season/${season}?language=${language}`

    try {
        const response = await axios.get(endPoint, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            }
        })
        return response.data.episodes
    } catch (err) {
        console.error("Erro ao buscar imagens dos episódios", err)
        return null
    }
}
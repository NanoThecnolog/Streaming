import axios from "axios"

export async function fetchTMDBPoster(tmdbID: number): Promise<string | null> {
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
    if (!tmdbToken) {
        console.warn("Variável de ambiente TMDB não definida.")
        return null
    }
    const tmdbUrl = 'https://api.themoviedb.org/3/movie/'
    const language = 'pt-BR'
    const endPoint = `${tmdbUrl}${tmdbID}?language=${language}/images`

    try {
        const response = await axios.get(endPoint, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            }
        })
        const imageURL = `https://image.tmdb.org/t/p/original${response.data.poster_path}`
        return imageURL
    } catch (err: any) {
        console.error("Erro ao buscar imagens do filme", err)
        return null
    }
}
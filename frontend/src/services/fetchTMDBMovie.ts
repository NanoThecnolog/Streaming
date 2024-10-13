import axios from "axios"

export async function fetchTMDBImage(tmdbID: number) {
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
    if (!tmdbToken) {
        console.warn("Variável de ambiente TMDB não definida.")
        return { error: "TMDB Token is missing" }
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
        return response.data
    } catch (err: any) {
        console.error("Erro ao buscar imagens do filme", err)
        return { error: err.message || "Failed to fetch movie images" }
    }
}
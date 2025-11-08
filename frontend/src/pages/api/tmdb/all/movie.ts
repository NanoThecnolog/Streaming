import { CardsProps } from "@/@types/Cards";
import { debug } from "@/classes/DebugLogger";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
const maxTentativas = 3
const batchSize = 90
const cache = new Map<number, any>()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!tmdbToken) {
        return res.status(401).json({ error: "TMDB token is missing" });
    }
    const { movies } = req.body;

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
        return res.status(400).json({ error: "Nenhum filme enviado." })
    }

    try {
        /*
        -- desse jeito é mais simples, mas demora mais, cerca de 35 segundos
        const cardData = await Promise.all(movies.map(async card => fetchCardData(card.tmdbId, maxTentativas)))
        const successFulData = cardData
            .filter(result => result.success)
            .map(result => result.data)
        const errorData = cardData.filter(result => !result.success)
        debug.timeEnd("TempoRequest")
        return res.status(200).json({
            success: true,
            data: successFulData,
            errors: errorData
        })*/
        //desse jeito é mais complexo, porém mais rápido, cerca de 10 a 12 segundos. Usurfrui de paralelismo
        const cachedResults: any[] = []
        const uncachedMovies: CardsProps[] = []
        for (const movie of movies) {
            const cached = cache.get(movie.tmdbId)
            if (cached) {
                debug.log("Cache hit:", movie.tmdbId)
                cachedResults.push(cached)
            } else {
                uncachedMovies.push(movie)
            }
        }
        const fetchedResults = await fetchInBatches(movies, batchSize)

        for (const result of fetchedResults) {
            if (result.success) cache.set(result.cardId, result)
        }
        const allResults = [...cachedResults, ...fetchedResults.filter(r => r.success)]
        const errorResults = fetchedResults.filter(r => !r.success)

        return res.status(200).json({
            success: true,
            data: allResults.map(r => r.data),
            errors: errorResults
        })
    } catch (err) {
        debug.timeEnd("TempoTotalDaRota")
        console.error("Erro ao buscar dados:", err);
        return res.status(500).json({ error: "Error at fetching data", details: err });
    }
}

async function fetchInBatches(items: CardsProps[], batchSize: number) {
    const results: any[] = []
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)

        const batchResults = await Promise.all(
            batch.map(card => fetchCardData(card.tmdbId, maxTentativas))
        )
        results.push(...batchResults)
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    return results
}

async function fetchCardData(cardId: number, retries: number = maxTentativas): Promise<any> {
    if (cache.has(cardId)) {
        debug.log("card no cache", cardId)
        return cache.get(cardId)
    }

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${cardId}`,
            {
                headers: { Authorization: `Bearer ${tmdbToken}` },
                params: { language: "pt-BR" },
            }
        )
        return {
            success: true,
            data: response.data,
            cardId
        }
    } catch (err: any) {
        if (retries > 0) {
            debug.log(`Tentativa falha pro card ${cardId}, tentando de novo...`)
            await new Promise(resolve => setTimeout(resolve, 2000))
            return fetchCardData(cardId, retries - 1)
        }
        return {
            success: false,
            error: err.response?.data || err.message,
            cardId
        }
    }
}
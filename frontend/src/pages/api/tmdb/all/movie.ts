import { CardsProps } from "@/@types/Cards";
import { debug } from "@/classes/DebugLogger";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
const maxTentativas = 3
const batchSize = 90
const cache = new Map<number, any>()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    debug.time("TempoTotalDaRota")
    if (!tmdbToken) {
        return res.status(401).json({ error: "TMDB token is missing" });
    }
    const { movies } = req.body;

    //debug.log('MongoData movie: ', mongoData)
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')
    debug.log("Rota sendo chamada")

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
        debug.timeEnd("TempoTotalDaRota")
        return res.status(400).json({ error: "Nenhum filme enviado." })
    }

    try {
        debug.time("fetchInBatches")
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
        debug.timeEnd("fetchInBatches")

        for (const result of fetchedResults) {
            if (result.success) cache.set(result.cardId, result)
        }
        const allResults = [...cachedResults, ...fetchedResults.filter(r => r.success)]
        const errorResults = fetchedResults.filter(r => !r.success)

        debug.timeEnd("TempoTotalDaRota")
        return res.status(200).json({
            success: true,
            data: allResults.map(r => r.data),
            errors: errorResults
        })
        /*
        if (movies.length > 0) {
            debug.log("Inciando fetch de dados")
            const cardData = await fetchInBatches(movies, batchSize)
            debug.log("Fetch de dados concluído")

            const successFulData = cardData
                .filter(result => result.success)
                .map(result => result.data)
            const errorData = cardData.filter(result => !result.success)

            return res.status(200).json({
                success: true,
                data: successFulData,
                errors: errorData
            });
        }
        return res.status(400).json({ error: "Nenhum filme enviado." })*/
    } catch (err) {
        debug.timeEnd("TempoTotalDaRota")
        console.error("Erro ao buscar dados:", err);
        return res.status(500).json({ error: "Error at fetching data", details: err });
    }
}

async function fetchInBatches(items: CardsProps[], batchSize: number) {
    debug.log("Iniciando função fetchInBatches")
    const results: any[] = []
    //debuglog(items)
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)
        debug.time(`batch-${i / batchSize}`)

        const batchResults = await Promise.all(
            batch.map(card => fetchCardData(card.tmdbId, maxTentativas))
        )
        debug.timeEnd(`batch-${i / batchSize}`)
        results.push(...batchResults)
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    /*const batchPromises = []
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)
        batchPromises.push(
            Promise.all(batch.map(card => fetchCardData(card.tmdbId, maxTentativas)))
        )
    }
    try {
        const batchResults = await Promise.all(batchPromises)
        results = batchResults.flat()
    } catch (err) {
        console.log("Erro no card", err)
    }*/
    debug.log("Fim do FOR em fetchInBatches")
    return results
}

async function fetchCardData(cardId: number, retries: number = maxTentativas): Promise<any> {
    //debug.log("Inciando fetchCardData, cardId", cardId)
    if (cache.has(cardId)) {
        debug.log("card no cache", cardId)
        return cache.get(cardId)
    }

    let attempts = 0;
    while (attempts <= retries) {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${cardId}`,
                {
                    headers: { Authorization: `Bearer ${tmdbToken}` },
                    params: { language: "pt-BR" },
                    timeout: 3000
                }
            );
            const data = {
                success: true,
                data: response.data,
                cardId
            }
            cache.set(cardId, data)
            return data
        } catch (err: any) {
            //console.log(`Erro na tentativa ${attempts + 1}, card ${cardId}.`)

            if (err.code === 'ECONNABORTED') {
                //console.log(`Timeout na request para o card ${cardId}, tentando novamente em 2s...`)
            } else if (err.response) {
                console.log(`Erro HTTP ${err.response.status} para o card ${cardId}, tentando novamente...`)
            }
            attempts++;
            if (attempts > retries) {
                return {
                    success: false,
                    error: err.response?.data || err.message,
                    cardId
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }
}
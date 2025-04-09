import { CardsProps } from "@/@types/Cards";
import { debug } from "@/classes/DebugLogger";
import { mongoService } from "@/classes/MongoContent";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
const maxTentativas = 3
const batchSize = 20
const cache = new Map<number, any>()

async function fetchCardData(cardId: number, retries: number = maxTentativas): Promise<any> {
    debug.log("Inciando fetchCardData, cardId", cardId)
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
            console.log(`Erro na tentativa ${attempts + 1}, card ${cardId}.`)

            if (err.code === 'ECONNABORTED') {
                console.log(`Timeout na request para o card ${cardId}, tentando novamente em 2s...`)
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

async function fetchInBatches(items: CardsProps[], batchSize: number) {
    debug.log("Iniciando função fetchInBatches")
    let results: any[] = []
    //debuglog(items)
    const batchPromises = []
    for (let i = 0; i < items.length; i += batchSize) {
        //debuglog("Durante o FOR", i)
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
    }
    debug.log("Fim do FOR em fetchInBatches")
    return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!tmdbToken) {
        return res.status(500).json({ error: "TMDB token is missing" });
    }
    const { movies } = req.body;

    //debug.log('MongoData movie: ', mongoData)
    res.setHeader('Cache-Control', 's-maxage=18000, stale-while-revalidate=300')
    debug.log("Rota sendo chamada")

    try {
        debug.log("Inciando fetch de dados")
        //const mongoData = await mongoService.fetchMovieData()

        if (movies.length > 0) {
            const cardData = await fetchInBatches(movies, batchSize)
            debug.log("Fetch de dados concluído")

            const successFulData = cardData
                .filter(result => result.success)
                .map(result => result.data)
            const errorData = cardData
                .filter(result => !result.success)
            return res.status(200).json({
                success: true,
                data: successFulData,
                errors: errorData
            });
        }

    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        return res.status(500).json({ error: "Error fetching data", details: err });
    }
}
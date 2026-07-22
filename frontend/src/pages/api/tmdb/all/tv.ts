import { SeriesProps } from "@/@types/series";
import { debug } from "@/classes/DebugLogger";
import { mongoService } from "@/classes/MongoContent";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;
const maxTentativas = 3
const batchSize = 90
const cache = new Map<number, SeriesProps>()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json(`Method ${req.method} Not Allowed`)
    }
    if (!tmdbToken) {
        return res.status(401).json({ error: "TMDB token is missing" });
    }

    const { series } = req.body;

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')

    if (!series || !Array.isArray(series) || series.length === 0) {
        return res.status(400).json({ error: "Nenhuma série enviada." })
    }

    try {
        const cachedResults: any[] = []
        const uncachedSeries: SeriesProps[] = []
        for (const serie of series) {
            const cached = cache.get(serie.tmdbId)
            if (cached) {
                cachedResults.push(cached)
            } else {
                uncachedSeries.push(serie)
            }
        }
        const fetchedResults = await fetchInBatches(uncachedSeries, batchSize)

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
        console.error("Erro ao buscar dados:", err);
        return res.status(500).json({ error: "Error fetching TV data", details: err });
    }
}

async function fetchInBatches(items: SeriesProps[], batchSize: number) {
    const results: any[] = []
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)

        const batchResults = await Promise.all(
            batch.map(card => fetchCardData(card.tmdbID, maxTentativas))
        )
        results.push(...batchResults)

        const hasNext = i + batchSize < items.length

        if (hasNext)
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
        //if (cardId === 0) return
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${cardId}`,
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
            debug.log(`Tentativa falha para a serie ${cardId}, tentando novamente...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchCardData(cardId, retries - 1);
        }
        return {
            success: false,
            error: err.response?.data || err.message,
            cardId
        };
    }
}

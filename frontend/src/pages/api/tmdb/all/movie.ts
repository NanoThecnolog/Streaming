import { cards } from "@/data/cards";
import { series } from "@/data/series";
import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;
const max_tentativas = 3;

async function fetchCardData(cardId: number, retries: number = max_tentativas): Promise<any> {
    let attempts = 0;
    while (attempts <= retries) {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${cardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${tmdbToken}`,
                    },
                    params: {
                        language: "pt-BR",
                    },
                }
            );
            return {
                success: true,
                data: response.data,
                cardId
            };
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
                    error: err.response.data || err.message,
                    cardId
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!tmdbToken) {
        return res.status(500).json({ error: "TMDB token is missing" });
    }
    res.setHeader('Cache-Control', 's-maxage=18000, stale-while-revalidate=300')

    try {
        const cardData = await Promise.all(cards.map(async card => fetchCardData(card.tmdbId, max_tentativas)))

        const successFulData = cardData.filter((result) => result.success).map((result) => result.data)
        const errorData = cardData.filter((result) => !result.success)
        return res.status(200).json({
            success: true,
            data: successFulData,
            errors: errorData
        });
    } catch (err) {
        console.error("Erro ao buscar dados do TMDB:", err);
        return res.status(500).json({ error: "Error fetching data from TMDB", details: err });
    }
}
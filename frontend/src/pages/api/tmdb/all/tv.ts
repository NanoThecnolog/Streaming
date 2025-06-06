import { mongoService } from "@/classes/MongoContent";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;
const max_tentativas = 3;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!tmdbToken) {
        return res.status(401).json({ error: "TMDB token is missing" });
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=300')

    try {
        const mongoData = await mongoService.fetchSerieData()

        if (mongoData.length > 0) {
            const cardData = await Promise.all(mongoData.map(async card => fetchCardData(card.tmdbID, max_tentativas)))

            const successFulData = cardData
                .filter((result) => result.success)
                .map((result) => result.data)
            const errorData = cardData
                .filter((result) => !result.success)
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

async function fetchCardData(cardId: number, retries: number = max_tentativas): Promise<any> {

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${cardId}`,
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
        if (retries > 0) {
            console.log(`Tentativa falha para o card ${cardId}, tentando novamente...`);
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

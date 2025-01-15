import { cards } from "@/js/cards";
import { series } from "@/js/series";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;
const max_tentativas = 3;

const fetchCardData = async (cardId: number, retries: number = max_tentativas, type: string = 'movie'): Promise<any> => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/${cardId}`,
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
            return fetchCardData(cardId, retries - 1, type);
        }
        return {
            success: false,
            error: err.response?.data || err.message,
            cardId
        };
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type } = req.query;

    if (!tmdbToken) {
        res.status(500).json({ error: "TMDB token is missing" });
        return;
    }

    try {
        const cardData = await Promise.all(
            type === "tv" ?
                series.map(async card => fetchCardData(card.tmdbID, undefined, type as string))
                : cards.map(async card => fetchCardData(card.tmdbId, undefined, type as string)))
        const successFulData = cardData.filter((result) => result.success).map((result) => result.data)
        res.status(200).json({
            success: true,
            data: successFulData,
            errors: cardData.filter((result) => !result.success)
        });
    } catch (err) {
        console.error("Erro ao buscar dados do TMDB:", err);
        res.status(500).json({ error: "Error fetching data from TMDB", details: err });
    }
}
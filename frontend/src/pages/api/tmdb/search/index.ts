import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, page } = req.query;

    if (!tmdbToken) {
        res.status(500).json({ error: "TMDB token is missing" });
        return;
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            },
            params: {
                query,
                language: "pt-BR",
                page
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from TMDB" });
    }
}

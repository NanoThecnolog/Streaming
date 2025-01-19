import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { tmdbId, type } = req.query;

    if (!tmdbToken) return res.status(500).json({ error: "TMDB token is missing" });

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${tmdbId}/videos`, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            },
            params: {
                language: "pt-BR",
            },
        })
        res.status(200).json(response.data)
    } catch (err) {
        res.status(500).json({ error: "Error fetching data from TMDB" });
    }
}
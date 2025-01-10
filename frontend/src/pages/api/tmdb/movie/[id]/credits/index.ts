import { apiTMDB } from '@/services/apiTMDB';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!tmdbToken) {
        return res.status(400).json({ error: "TMDB Token is missing." })
    }
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            },
            params: {
                language: "pt-BR",
            },
        })
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data from TMDB" });
    }
}
import { WatchLaterProps } from "@/@types/watchLater";
import { debug } from "@/classes/DebugLogger";
import { WatchLaterManager } from "@/classes/watchLaterManager";
import { SetupAPIClient } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end()
    const client = new SetupAPIClient({ req })
    try {
        const response = await client.api.get<WatchLaterProps[]>('/watchLater')
        const data: WatchLaterProps[] = response.data
        return res.status(200).json(data)
    } catch (err) {
        console.log('Erro ao buscar a lista de filmes para assistir mais tarde', err)
        return res.status(401).json({ error: err, message: 'Erro ao buscar a lista de filmes para assistir mais tarde' })
    }
}
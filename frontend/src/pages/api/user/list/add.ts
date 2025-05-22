import { debug } from "@/classes/DebugLogger";
import { WatchLaterManager } from "@/classes/watchLaterManager";
import { SetupAPIClient } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    const client = new SetupAPIClient({ req })
    const watchLaterManager = new WatchLaterManager(client, { req })
    try {
        const filme = req.body
        const addMovie = await watchLaterManager.addWatchLater(filme)
        return res.status(200).json({ message: 'Conteúdo adicionado!', request: addMovie })
    } catch (err) {
        console.log('Erro ao adicionar filme a lista para assistir mais tarde', err)
        return res.status(401).json({ error: err, message: 'Erro ao adicionar filme a lista para assistir mais tarde' })
    }
}
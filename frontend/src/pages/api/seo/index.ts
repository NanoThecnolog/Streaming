import { mongoService } from '@/classes/MongoContent';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try {
        const movieIDs = await mongoService.getMapId()
        return res.status(200).json(movieIDs)
    } catch (err) {
        console.log("Erro ao buscar map de filmes", err)
        return res.status(500).json({ message: "Erro interno do servidor", path: "/api/map" })
    }
}
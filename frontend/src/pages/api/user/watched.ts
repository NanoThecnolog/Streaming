import { SetupAPIClient } from '@/services/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const client = new SetupAPIClient({ req })

    try {
        const response = await client.api.get('/user/watched')
        return res.status(200).json(response.data)
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar watchedList' })
    }


}
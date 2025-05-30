// pages/api/user-data.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new SetupAPIClient({ req })

    try {
        const response = await client.api.get('/user/access')
        return res.status(200).json(response.data)
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar dados.' })
    }
}

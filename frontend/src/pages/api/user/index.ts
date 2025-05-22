// pages/api/user-data.ts
import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /**const { 'flix-token': token } = parseCookies({ req })
    debug.log('Chamando rota /api/user')

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }*/
    const client = new SetupAPIClient({ req })

    try {
        const response = await client.api.get('/user')
        return res.status(200).json(response.data)
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar dados.' })
    }
}

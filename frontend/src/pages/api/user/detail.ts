// pages/api/user-data.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { debug } from '@/classes/DebugLogger'
import { isAxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new SetupAPIClient({ req })

  try {
    const response = await client.api.get('/user/access')
    return res.status(200).json(response.data)
  } catch (err) {
    debug.log('Erro ao buscar dados no backend', err)
    if (isAxiosError(err)) {
      return res.status(err.response?.status ?? 502).json(
        err.response?.data ?? {
          error: 'Não foi possível consultar o backend.',
        },
      )
    }
    return res.status(500).json({ error: 'Erro ao buscar dados.' })
  }
}

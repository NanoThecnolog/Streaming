import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { debug } from '@/classes/DebugLogger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const client = new SetupAPIClient({ req })

  try {
    const response = await client.api.get('/genres')
    debug.log('[API /genres] backend status:', response.status)
    debug.log('[API /genres] response.data type:', typeof response.data, 'isArray:', Array.isArray(response.data))
    debug.log('[API /genres] response.data:', JSON.stringify(response.data)?.slice(0, 500))
    return res.status(200).json(response.data)
  } catch (err) {
    if (isAxiosError(err)) {
      console.error('[API /genres] axios error:', err.response?.status, JSON.stringify(err.response?.data)?.slice(0, 300))
      return res.status(err.response?.status ?? 502).json(
        err.response?.data ?? { error: 'Não foi possível listar gêneros.' },
      )
    }
    console.error('[API /genres] unknown error:', err)
    return res.status(500).json({ error: 'Erro ao listar gêneros.' })
  }
}

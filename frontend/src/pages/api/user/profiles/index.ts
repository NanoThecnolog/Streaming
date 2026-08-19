import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { debug } from '@/classes/DebugLogger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new SetupAPIClient({ req })

  debug.log('[API /user/profiles] method:', req.method)
  debug.log('[API /user/profiles] has token:', Boolean((client as any).token))
  debug.log('[API /user/profiles] cookie names:', Object.keys(req.cookies || {}))
  debug.log('[API /user/profiles] has flix-token cookie:', Boolean(req.cookies?.['flix-token']))

  if (req.method === 'GET') {
    try {
      const response = await client.api.get('/profiles')
      debug.log('[API /user/profiles] backend status:', response.status)
      debug.log('[API /user/profiles] response.data type:', typeof response.data, 'isArray:', Array.isArray(response.data))
      debug.log('[API /user/profiles] response.data:', JSON.stringify(response.data)?.slice(0, 500))
      return res.status(200).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        console.error('[API /user/profiles] axios error:', err.response?.status, JSON.stringify(err.response?.data)?.slice(0, 300))
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível listar perfis.' },
        )
      }
      console.error('[API /user/profiles] unknown error:', err)
      return res.status(500).json({ error: 'Erro ao listar perfis.' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, avatar } = req.body
      const response = await client.api.post('/profiles', { name, avatar })
      return res.status(201).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível criar perfil.' },
        )
      }
      return res.status(500).json({ error: 'Erro ao criar perfil.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}

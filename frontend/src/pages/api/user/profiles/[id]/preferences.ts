import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { debug } from '@/classes/DebugLogger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new SetupAPIClient({ req })
  const { id } = req.query

  debug.log('[API /profiles/:id/preferences] method:', req.method, 'profileId:', id)

  if (req.method === 'GET') {
    try {
      const response = await client.api.get(`/profiles/${id}/preferences`)
      debug.log('[API /profiles/:id/preferences] GET response type:', typeof response.data, 'isArray:', Array.isArray(response.data))
      return res.status(200).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        console.error('[API /profiles/:id/preferences] GET error:', err.response?.status, JSON.stringify(err.response?.data)?.slice(0, 300))
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível buscar preferências.' },
        )
      }
      return res.status(500).json({ error: 'Erro ao buscar preferências.' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { genres } = req.body
      debug.log('[API /profiles/:id/preferences] PUT body genres:', JSON.stringify(genres)?.slice(0, 300))
      const response = await client.api.put(`/profiles/${id}/preferences`, { genres })
      return res.status(200).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        console.error('[API /profiles/:id/preferences] PUT error:', err.response?.status, JSON.stringify(err.response?.data)?.slice(0, 300))
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível atualizar preferências.' },
        )
      }
      return res.status(500).json({ error: 'Erro ao atualizar preferências.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}

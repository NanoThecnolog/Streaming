import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new SetupAPIClient({ req })
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const { name, avatar } = req.body
      const response = await client.api.put(`/profiles/${id}`, { name, avatar })
      return res.status(200).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível editar perfil.' },
        )
      }
      return res.status(500).json({ error: 'Erro ao editar perfil.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const response = await client.api.delete(`/profiles/${id}`)
      return res.status(200).json(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        return res.status(err.response?.status ?? 502).json(
          err.response?.data ?? { error: 'Não foi possível excluir perfil.' },
        )
      }
      return res.status(500).json({ error: 'Erro ao excluir perfil.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}

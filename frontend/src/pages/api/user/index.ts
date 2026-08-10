import type { NextApiRequest, NextApiResponse } from 'next'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new SetupAPIClient({ req })

  try {
    const response = await client.api.get('/user')
    return res.status(200).json(response.data)
  } catch (err) {
    if (isAxiosError(err)) {
      return res.status(err.response?.status ?? 502).json(
        err.response?.data ?? {
          error: 'Não foi possível consultar o backend.',
        },
      )
    }
    return res.status(500).json({ error: 'Erro ao buscar dados do usuário.' })
  }
}

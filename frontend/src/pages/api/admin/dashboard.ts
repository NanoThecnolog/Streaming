import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'
import { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const client = new SetupAPIClient({ req })
  try {
    const { period } = req.query
    const response = await client.api.get(`/admin/dashboard`, {
      params: { period: period ?? '30d' },
    })
    return res.status(200).json(response.data)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('Erro ao buscar overview do painel', err.response)
      return res.status(err.response?.status ?? 500).json({ error: err.response?.data })
    }
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

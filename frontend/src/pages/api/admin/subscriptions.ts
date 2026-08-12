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
    const response = await client.api.get('/admin/subscriptions', {
      params: { search: req.query.search, status: req.query.status },
    })
    return res.status(200).json(response.data)
  } catch (err) {
    if (err instanceof AxiosError) {
      return res.status(err.response?.status ?? 500).json({ error: err.response?.data })
    }
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

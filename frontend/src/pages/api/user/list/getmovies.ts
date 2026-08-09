import { WatchLaterProps } from '@/@types/watchLater'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const client = new SetupAPIClient({ req })

  const auth = req.headers
  debug.log('autorização', auth)

  try {
    const response = await client.api.get<WatchLaterProps[]>('/watchLater')
    const data = response.data
    return res.status(200).json(data)
  } catch (err) {
    //console.log('Erro ao buscar a lista de filmes para assistir mais tarde', err)

    if (axios.isAxiosError(err)) {
      return res.status(err.response?.status ?? 500).json(err.response?.data)
    }
    return res
      .status(500)
      .json({
        error: err,
        message: 'Erro interno do servidor ao buscar a lista de filmes para assistir mais tarde',
      })
  }
}

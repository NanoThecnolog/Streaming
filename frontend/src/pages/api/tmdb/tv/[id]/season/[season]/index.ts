import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Método não permitido.' })

  const token = process.env.TMDB_TOKEN
  if (!token) return res.status(500).json({ message: 'TMDB não configurado.' })

  const { id, season } = req.query

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { language: 'pt-BR' },
    })
    return res.status(200).json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res
        .status(error.response?.status ?? 502)
        .json({ message: 'Não foi possível consultar a temporada no TMDB.' })
    }
    return res.status(500).json({ message: 'Erro interno ao consultar o TMDB.' })
  }
}

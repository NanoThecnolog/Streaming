import { proxyRequest } from '@/server/proxyRequest'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['GET', 'HEAD'].includes(req.method ?? '')) {
    const token = req.cookies['flix-token']
    const backendUrl = process.env.NEXT_PUBLIC_RENDER

    if (!token || !backendUrl) {
      return res.status(401).json({ message: 'Usuário não autenticado.' })
    }

    try {
      await axios.get(`${backendUrl.replace(/\/$/, '')}/user/access`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return res
          .status(error.response?.status ?? 502)
          .json(error.response?.data ?? { message: 'Não foi possível validar o acesso.' })
      }
      return res.status(500).json({ message: 'Erro ao validar o acesso.' })
    }
  }

  return proxyRequest(req, res, {
    baseUrl: process.env.NEXT_PUBLIC_CONTENT_MANAGER_URL,
    apiKey: process.env.API_KEY,
  })
}

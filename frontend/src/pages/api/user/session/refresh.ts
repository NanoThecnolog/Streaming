import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

const sessionMaxAge = 60 * 60 * 24 * 30

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const token = req.cookies['flix-token']
  if (!token) return res.status(401).json({ message: 'Usuário não autenticado.' })

  try {
    const client = new SetupAPIClient({ req })
    const { data } = await client.api.post<{ token: string | null }>('/session/refresh')

    if (data.token) {
      setCookie({ res }, 'flix-token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: sessionMaxAge,
        path: '/',
        sameSite: 'lax',
      })
    }

    return res.status(204).end()
  } catch (error) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status ?? 502)
        .json(error.response?.data ?? { message: 'Não foi possível renovar a sessão.' })
    }
    return res.status(500).json({ message: 'Erro interno ao renovar a sessão.' })
  }
}

import { LoginProps } from '@/@types/user'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const client = new SetupAPIClient()
    const response = await client.api.post<LoginProps>('/login/device/verify', req.body)
    const { token, deviceToken } = response.data

    setCookie({ res }, 'flix-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
    setCookie({ res }, 'flix-device', deviceToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    if (isAxiosError(error)) {
      return res.status(error.response?.status ?? 502).json(
        error.response?.data ?? {
          message: 'Não foi possível confirmar o dispositivo.',
        },
      )
    }
    return res.status(500).json({ message: 'Erro interno ao confirmar o dispositivo.' })
  }
}

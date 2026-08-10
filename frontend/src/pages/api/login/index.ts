import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { DeviceVerificationRequired, LoginProps } from '@/@types/user'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password, replaceDeviceId } = req.body
  debug.log('Request inside loginHandler')
  const client = new SetupAPIClient()

  debug.log('Iniciando o try catch na rota api/login')
  try {
    const forwardedFor = req.headers['x-forwarded-for']
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : (forwardedFor?.split(',')[0]?.trim() ?? req.socket.remoteAddress)
    const response = await client.api.post<LoginProps | DeviceVerificationRequired>(
      '/login',
      { email, password, replaceDeviceId, deviceToken: req.cookies['flix-device'] },
      {
        headers: {
          'x-client-user-agent': req.headers['user-agent'],
          'x-forwarded-for': clientIp,
        },
      },
    )
    if ('verificationRequired' in response.data) {
      return res.status(202).json(response.data)
    }
    const { token, deviceToken, avatar, watchLater, name, id } = response.data

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

    return res.status(200).json({ data: { avatar, watchLater, name, id }, success: true })
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      debug.error('Erro ao fazer login', err.response)
      return res.status(err.response?.status ?? 502).json(
        err.response?.data ?? {
          error: err.message,
          message: 'Login inválido',
        },
      )
    }

    return res.status(500).json({
      message: 'Erro interno do servidor',
    })
  }
}

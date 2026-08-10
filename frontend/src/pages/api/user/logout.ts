import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { SetupAPIClient } from '@/services/api'

export default async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const client = new SetupAPIClient({ req })
    await client.api.post('/logout')
  } catch {
    // O cookie deve ser removido mesmo quando a sessão já expirou ou foi revogada.
  }

  setCookie({ res }, 'flix-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: -1,
  })

  return res.status(204).end()
}

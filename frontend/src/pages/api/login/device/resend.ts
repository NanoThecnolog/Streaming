import { SetupAPIClient } from '@/services/api'
import { isAxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const client = new SetupAPIClient()
    const response = await client.api.post('/login/device/resend', req.body)
    return res.status(200).json(response.data)
  } catch (error) {
    if (isAxiosError(error)) {
      return res.status(error.response?.status ?? 502).json(
        error.response?.data ?? {
          message: 'Não foi possível reenviar o código.',
        },
      )
    }
    return res.status(500).json({ message: 'Erro interno ao reenviar o código.' })
  }
}

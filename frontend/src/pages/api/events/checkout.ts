import { SetupAPIClient } from '@/services/api'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface BackendErrorResponse {
  error?: string
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])

    return res.status(405).json({
      error: `Método ${req.method} não permitido.`,
    })
  }

  const client = new SetupAPIClient({ req })

  try {
    const response = await client.api.post('/checkout/events', req.body)

    return res.status(response.status).json(response.data)
  } catch (err: unknown) {
    if (axios.isAxiosError<BackendErrorResponse>(err)) {
      if (!err.response) {
        return res.status(502).json({
          error: 'Não foi possível conectar ao serviço de checkout.',
        })
      }

      return res.status(err.response.status).json(
        err.response.data ?? {
          error: 'Erro ao registrar evento do checkout.',
        },
      )
    }

    return res.status(500).json({
      error: 'Erro interno ao registrar evento do checkout.',
    })
  }
}

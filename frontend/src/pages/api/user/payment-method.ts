import { UserContext } from '@/@types/user'
import { SetupAPIClient } from '@/services/api'
import { apiSub } from '@/services/apiSubManager'
import { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface PaymentMethodRequest {
  subscriptionId?: number
  action?: 'change-method' | 'update-card'
  method?: 'credit' | 'billet'
  paymentToken?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).json({ message: 'Método não permitido.' })
  }

  const data = req.body as PaymentMethodRequest
  if (!Number.isInteger(data.subscriptionId) || !data.action) {
    return res.status(400).json({ message: 'Solicitação de pagamento inválida.' })
  }
  if ((data.action === 'update-card' || data.method === 'credit') && !data.paymentToken?.trim()) {
    return res.status(422).json({ message: 'Token do cartão não informado.' })
  }

  try {
    const client = new SetupAPIClient({ req })
    const { data: user } = await client.api.get<UserContext>('/user')
    const endpoint =
      data.action === 'update-card'
        ? `/subscription/${data.subscriptionId}/card`
        : `/subscription/${data.subscriptionId}/payment-method`
    const payload =
      data.action === 'update-card'
        ? { userId: user.id, paymentToken: data.paymentToken }
        : {
            userId: user.id,
            method: data.method,
            paymentToken: data.paymentToken,
            notificationUrl: process.env.NOTIFICATION_URL,
          }

    const response = await apiSub.put(endpoint, payload)
    return res.status(200).json(response.data)
  } catch (error) {
    const status = error instanceof AxiosError ? (error.response?.status ?? 502) : 500
    const message =
      error instanceof AxiosError
        ? (error.response?.data?.message ?? 'Não foi possível alterar o pagamento.')
        : 'Não foi possível alterar o pagamento.'
    return res.status(status).json({ message })
  }
}

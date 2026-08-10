import { UserContext } from '@/@types/user'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { isAxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end()
  const client = new SetupAPIClient({ req })
  try {
    const userData = req.body
    debug.log('UserData na rota de update', userData)
    const response = await client.api.put('/user', userData)
    const data: UserContext = response.data
    return res.status(200).json({ message: 'Dados alterados', request: data })
  } catch (err) {
    console.log('Erro ao alterar dados do usuário', err)
    if (isAxiosError(err)) {
      return res.status(err.response?.status ?? 502).json(
        err.response?.data ?? {
          message: 'Não foi possível alterar os dados do usuário.',
        },
      )
    }
    return res.status(500).json({ message: 'Erro ao alterar dados do usuário.' })
  }
}

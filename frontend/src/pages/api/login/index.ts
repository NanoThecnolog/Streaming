import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { LoginProps } from '@/@types/user'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()

    const { email, password } = req.body
    debug.log('Request inside loginHandler')
    const client = new SetupAPIClient()

    debug.log("Iniciando o try catch na rota api/login")
    try {
        const response = await client.api.post<LoginProps>('/login', { email, password })
        debug.log('Resposta do api.post', response.data)
        const { token, avatar, watchLater, name } = response.data

        setCookie({ res }, 'flix-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
            sameSite: 'lax'
        })

        return res.status(200).json({ data: { avatar, watchLater, name }, success: true })
    } catch (err) {
        return res.status(401).json({ error: err, message: 'Login inválido' })
    }
}

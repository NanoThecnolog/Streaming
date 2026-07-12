import { watchedProgressEntry } from '@/@types/watchedProgress';
import { debug } from '@/classes/DebugLogger';
import { SetupAPIClient } from '@/services/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

const allowedMethods = ['GET', 'POST']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !allowedMethods.includes(req.method)) {
        res.setHeader('Allow', ['POST', 'GET'])
        return res.status(405).json(`Method ${req.method} Not Allowed`)
    }

    const cookies = parseCookies({ req })
    const token = cookies['flix-token']
    if (!token) {
        return res.status(401).json({ message: 'Usuário não autenticado' })
    }

    const client = new SetupAPIClient({ req })

    if (req.method === 'GET') {

        const { tmdbID } = req.query

        //debug.log("tmdbID recebido na query da rota de busca api/watched/progress", tmdbID)

        try {
            const { data } = await client.api.get('/content/watched', {
                params: {
                    tmdbID
                }
            })

            return res.status(200).json({
                result: data
            })
        } catch (err) {
            console.log("Erro ao buscar progresso assistido pelo id", err)
            return res.status(502).json({ message: "Erro ao buscar progressão pelo id" })
        }
    }

    if (req.method === 'POST') {
        const { tmdbID, mediaType, completed, episode, season, progress }: watchedProgressEntry = req.body

        //debug.log("body recebido na rota api/watched/progress", req.body)

        try {
            await client.api.post('/content/watched', {
                tmdbID, mediaType, completed, episode, season, progress
            })

            return res.status(200).json({
                result: "progresso salvo!"
            })
        } catch (err) {
            console.log("Erro ao salvar/atualizar progresso assistido", err)
            return res.status(502).json({ message: "Erro ao salvar/atualizar progressão" })
        }
    }
}
import { SetupAPIClient } from '@/services/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { path } = req.body;
    console.log("path recebido: ", path)
    const client = new SetupAPIClient({ req })
    try {
        await client.api.post('/track', { path })
        return res.status(200).json({ message: 'ok' })
    } catch (err) {
        console.log("Erro ao realizar o tracking da rota")
        return res.status(502).json({ error: "Erro ao realizar o tracking da rota" })
    }

}
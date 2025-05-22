import { UserContext } from "@/@types/user";
import { debug } from "@/classes/DebugLogger";
import { SetupAPIClient } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') return res.status(405).end()
    const client = new SetupAPIClient({ req })
    try {
        const userData = req.body;
        debug.log('UserData na rota de update', userData)
        const response = await client.api.put('/user', userData)
        const data: UserContext = response.data
        return res.status(200).json({ message: 'Dados alterados', request: data })
    } catch (err) {
        console.log('Erro ao alterar dados do usuário', err)
        return res.status(401).json({ error: err, message: 'Erro ao alterar dados do usuário' })
    }
}
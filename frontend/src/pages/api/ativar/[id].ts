import { SetupAPIClient } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";

const urlServer = process.env.NEXT_PUBLIC_RENDER;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(400).json({ code: 400, message: "Essa requisição não aceita esse método." })
    const { id } = req.query;
    console.log('id recebido na rota api', id)
    const client = new SetupAPIClient()
    try {
        const response = await client.api.post(`/ativar?id=${id}`)
        console.log('comunicação com o servidor dentro da rota api do frontend', response.data)
        res.status(200).json(response.data)
    } catch (err: any) {
        console.log(`erro na comunicação da rota api com o servidor ao ativar a conta: `, err)
        res.status(err.status).json({ code: err.status, message: "Erro ao tentar ativar a conta", erro: err })
    }
}
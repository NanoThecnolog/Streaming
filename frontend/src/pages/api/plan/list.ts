import { apiSub } from "@/services/apiSubManager";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(400).json({ code: 400, message: "Essa requisição não aceita esse método." })

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    try {
        const response = await apiSub.get('/plans/database')
        res.status(200).json(response.data)
    } catch (err: any) {
        res.status(err.status).json({ code: err.status, message: "Erro ao tentar buscar dados dos planos", erro: err })
    }
}
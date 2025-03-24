import { verifyAllDataFiles, verifySerieDataFiles } from "@/services/googleCheck";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(400).json({ code: 400, message: "Método não permitido para essa rota" })
    try {
        const { type } = req.query;

        const result = type === 'movie' ? await verifyAllDataFiles() : await verifySerieDataFiles();

        return res.status(200).json({
            code: 200,
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({ code: 500, erro: err, message: err.message })
    }
}
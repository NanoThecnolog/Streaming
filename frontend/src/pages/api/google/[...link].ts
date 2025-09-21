import { drive } from "@/services/googleCheck";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') return res.status(400).json({ code: 400, message: "Método não permitido para essa rota" })

    const { link } = req.query
    if (!link) {
        return res.status(400).json({ error: "Missing link", message: "Link não recebido nada rota." })
    }

    try {
        const decodedLink = decodeURIComponent(
            Array.isArray(link) ? link.join('/') : link)
        const fileId = drive.extractFileId(decodedLink);

        if (fileId) {
            const infoFile = await drive.checkFile(fileId);
            return res.status(200).json(infoFile)
        } else {
            return res.status(400).json({ code: 400, message: '❗ ID do arquivo não encontrado no link.' })
        }
    } catch (err: any) {
        return res.status(500).json({ code: 500, erro: err, message: err.message })
    }
}
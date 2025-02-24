import { checkDriveFile, extractFileId } from "@/services/googleCheck";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') return res.status(400).json({ code: 400, message: "Método não permitido para essa rota" })

    const { link } = req.query
    if (!link) throw new Error("Link não fornecido")

    try {
        const decodedLink = decodeURIComponent(link as string)
        const fileId = extractFileId(decodedLink);

        if (fileId) {
            const infoFile = await checkDriveFile(fileId);
            return res.status(200).json(infoFile)
        } else {
            return res.status(400).json({ code: 400, message: '❗ ID do arquivo não encontrado no link.' })
        }
    } catch (err: any) {
        return res.status(500).json({ code: 500, erro: err, message: err.message })
    }

}
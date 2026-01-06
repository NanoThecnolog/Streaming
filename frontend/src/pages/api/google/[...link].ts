import { drive } from "@/services/googleCheck";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET')
        return res.status(405).json({ code: 405, message: "Método não permitido" })

    const { link } = req.query

    if (!link) {
        return res.status(400).json({ message: "Link não recebido." })
    }

    try {
        const infoFile = await drive.checkFile(link as string);
        return res.status(200).json(infoFile)
    } catch (err: any) {
        console.error('Erro durante verificação de arquivo', err.message)
        if (err.message === 'FILE_PRIVATE')
            return res.status(403).json({ message: 'Arquivo privad' })
        if (err.message === 'FILE_NOT_FOUND')
            return res.status(404).json({ message: 'Arquivo não encontrado' })

        return res.status(500).json({ message: 'Erro ao verificar arquivo.' })
    }
}
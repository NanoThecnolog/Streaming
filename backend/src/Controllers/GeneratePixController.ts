import { Request, Response } from "express";
import { GeneratePixService } from "../Services/GeneratePixService";

class GeneratePixController {
    async handle(req: Request, res: Response) {
        try {
            const generatePixService = new GeneratePixService();

            const qrCode = await generatePixService.execute();

            res.json(qrCode)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao gerar qrcode" })
        }
    }
}

export { GeneratePixController }
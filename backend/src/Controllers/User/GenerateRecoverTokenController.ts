import { Request, Response } from "express";
import { GenerateRecoverTokenService } from "../../Services/User/GenerateRecoverTokenService";

export class GenerateRecoverTokenController {
    async handle(req: Request, res: Response) {
        try {
            const recoverService = new GenerateRecoverTokenService();
            const { email } = req.body
            const recover = await recoverService.execute(email)
            return res.json(recover)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao gerar token e enviar email" })
        }
    }
}
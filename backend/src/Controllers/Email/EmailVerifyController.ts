import { Request, Response } from 'express';
import { EmailVerifyService } from '../../Services/Email/EmailVerifyService';

export class EmailVerifyController {
    async handle(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const service = new EmailVerifyService()
            const hasEmail = await service.execute(email)
            //console.log("email no controller", email)
            return res.status(200).json(hasEmail)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a verificar email' })
        }
    }
}
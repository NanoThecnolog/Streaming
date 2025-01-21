import { Request, Response } from 'express';
import { EmailInfoService } from '../../Services/Email/EmailInfoService';

export class EmailInfoController {
    async handle(req: Request, res: Response) {
        try {
            const emailInfoService = new EmailInfoService();
            const enviarEmail = await emailInfoService.execute()
            return res.json(enviarEmail)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
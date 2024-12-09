import { Request, Response } from 'express';
import { SendEmailService } from '../../Services/Email/SendEmailService';

export class SendEmailController {
    async handle(req: Request, res: Response) {
        try {
            const { title, description, tmdbId, userId } = req.body;
            const sendEmailService = new SendEmailService();
            const sendingEmail = await sendEmailService.execute(title, description, tmdbId as number, userId)

            return res.json(sendingEmail)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
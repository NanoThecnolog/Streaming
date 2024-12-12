import { Request, Response } from 'express';
import { PromotionalEmailService } from '../../Services/Email/PromotionalEmailService';

export class PromotionalEmailController {
    async handle(req: Request, res: Response) {
        try {
            const promotionalService = new PromotionalEmailService();
            const enviarEmail = await promotionalService.execute()
            return res.json(enviarEmail)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
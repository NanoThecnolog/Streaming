import { Request, Response } from 'express';
import { RecoverService } from '../../Services/User/RecoverService';

export class RecoverController {
    async handle(req: Request, res: Response) {
        try {
            const recoverService = new RecoverService();
            const { token, password } = req.body;
            const recover = await recoverService.execute(token, password)
            return res.json(recover)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
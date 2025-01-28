import { Request, Response } from 'express';
import { CancelSubService } from '../../../Services/Efi/Subscription/CancelSubService';

export class CancelSubController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user_id;
            const cancelService = new CancelSubService();
            const sub = await cancelService.execute({ id: Number(id), userId })
            return res.status(200).json(sub)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
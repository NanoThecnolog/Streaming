import { Request, Response } from 'express';
import { DetailSubService } from '../../../Services/Efi/Subscription/DetailSubService';

export class DetailSubController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(id)
            const detailService = new DetailSubService()
            const details = await detailService.execute(Number(id))
            return res.status(200).json(details)
        } catch (err: any | Error) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(err.status).json({ error: 'Erro ao fazer a requisição dos detalhes da assinatura.' })
        }
    }
}
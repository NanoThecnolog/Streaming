import { Request, Response } from 'express';
import { ListWatchedService } from '../../Services/User/ListWatchedService';

export class ListWatchedController {
    async handle(req: Request, res: Response) {
        try {
            const id = req.user_id

            const service = new ListWatchedService()
            const result = await service.execute(id as string)

            return res.status(200).json(result)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
import { Request, Response } from 'express';
import { getWatchedService } from '../../Services/User/GetWatchedService';

export class GetWatchedController {
    async handle(req: Request, res: Response) {
        try {
            const uid = req.user_id

            const { tmdbID } = req.query

            const watchedService = new getWatchedService()
            const watchedList = await watchedService.execute({
                uid, tmdbID: Number(tmdbID)
            })
            return res.status(200).json(watchedList)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
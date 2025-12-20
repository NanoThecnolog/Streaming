import { Request, Response } from 'express';
import { TrackingService } from '../../Services/User/trackingService';

export class TrackingController {
    async handle(req: Request, res: Response) {
        try {
            const { path } = req.body;
            const id = req.user_id
            console.log(path, id)
            const trackingService = new TrackingService()
            await trackingService.execute({
                path,
                userId: id
            })
            return res.status(201).json({ message: 'tracked' })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
import { Request, Response } from 'express';
import { ProblemNotificationService } from '../../Services/Email/ProblemNotificationService';

export class ProblemNotificationController {
    async handle(req: Request, res: Response) {
        try {
            const { title, description, userId, tmdbId, season, episode } = req.body;
            const problemNotificationService = new ProblemNotificationService();
            const sendingEmail = await problemNotificationService.execute(title, description, Number(tmdbId), userId, Number(season), Number(episode))

            return res.json(sendingEmail)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
import { Request, Response } from 'express';
import { ProblemNotificationService } from '../../Services/Movie/ProblemNotificationService';

export class ProblemNotificationController {
    /*private problemNotificationService: ProblemNotificationService

    constructor() {
        this.problemNotificationService = new ProblemNotificationService()
    }*/
    async handle(req: Request, res: Response) {
        try {
            const problemNotificationService = new ProblemNotificationService()
            const { title, description, tmdbId, season, episode, userId } = req.body;

            if (!title || !description || !tmdbId || !userId) {
                console.log(req.body)
                return res.status(400).json({ error: "Campos obrigatórios estão faltando.", data: req.body });
            }
            const handleNotification = await problemNotificationService.execute({
                title,
                description,
                tmdbId,
                season,
                episode,
                userId
            })
            return res.status(handleNotification.code).json(handleNotification)
        } catch (err) {
            console.log("Erro no controller", err)
            return res.status(500).json({
                code: 500,
                message: "Erro interno ao processar a requisição",
                error: err instanceof Error ? err.message : String(err)
            })
        }
    }
}
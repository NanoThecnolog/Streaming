import { Request, Response } from 'express';
import { CreateWatchedService } from '../../Services/User/CreateWatchedService';
import { Entry } from '../../@types/watchedTypes';
import { debugLog } from '../../Utils/DebugLog';

interface AuthenticatedRequest extends Request {
    user_id: string;
    profile_id?: string;
}

export class CreateWatchedController {
    async handle(req: Request, res: Response) {
        try {
            const r = req as AuthenticatedRequest;
            const watchedService = new CreateWatchedService()
            const { tmdbID, mediaType, season, episode, progress, completed } = req.body

            const data: Entry = {
                userId: r.user_id,
                profileId: r.profile_id,
                tmdbID,
                mediaType,
                season,
                episode,
                progress,
                completed
            }

            const create = await watchedService.createEntry(data)

            return res.status(200).json(create)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao salvar progresso watched' })
        }
    }
}
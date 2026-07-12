import { Request, Response } from 'express';
import { CreateWatchedService } from '../../Services/User/CreateWatchedService';
import { Entry } from '../../@types/watchedTypes';
import { debugLog } from '../../Utils/DebugLog';

export class CreateWatchedController {
    async handle(req: Request, res: Response) {
        try {
            debugLog("controller createWatched iniciando")
            const watchedService = new CreateWatchedService()
            const { tmdbID, mediaType, season, episode, progress, completed } = req.body

            const data: Entry = {
                userId: req.user_id,
                tmdbID,
                mediaType,
                season,
                episode,
                progress,
                completed
            }
            debugLog("objeto recebido", data)

            const create = await watchedService.createEntry(data)

            debugLog("retorno do controller", create)

            return res.status(200).json(create)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao salvar progresso watched' })
        }
    }
}
import { Request, Response } from 'express';
import { FavoriteService } from '../../Services/User/FavoriteService';

export class FavoriteController {
    async handle(req: Request, res: Response) {
        try {
            const favoriteService = new FavoriteService();
            const { tmdbid, title, subtitle = "", userId } = req.body;
            const favoritar = await favoriteService.execute({
                tmdbid,
                title,
                subtitle,
                userId
            })
            return res.json(favoritar)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição de favoritar' })
        }
    }
}
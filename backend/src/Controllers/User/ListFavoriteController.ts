import { Request, Response } from 'express';
import { ListFavoriteService } from '../../Services/User/ListFavoriteService';

export class ListFavoriteController {
    async handle(req: Request, res: Response) {
        try {
            const listarfavoritos = new ListFavoriteService();
            const { user } = req.query;
            if (!user) return res.json({ error: "Usuário não definido" })
            const favoritos = await listarfavoritos.execute(user as string)
            return res.json(favoritos)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
import { Request, Response } from 'express';
import { RemoveFavoriteService } from '../../Services/User/RemoveFavoriteService';

export class RemoveFavoriteController {
    async handle(req: Request, res: Response) {
        try {
            const removerFavorito = new RemoveFavoriteService();
            const { favoriteid } = req.params;
            if (!favoriteid) return res.json({ error: "ID do Favorito não recebido" })
            const remover = await removerFavorito.execute(favoriteid as string)
            return res.json(remover)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}
import { Request, Response } from 'express';
import { RequestContentService } from '../../Services/Email/RequestContentService';


export class RequestContentController {
    async handle(req: Request, res: Response) {


        try {
            const user = req.user_id;
            if (!user) res.status(401).json({ erro: "Usuário não autenticado ou autenticação inválida." })
            const { tmdbId } = req.body;
            const requestService = new RequestContentService();
            const requestEmail = await requestService.execute({
                id: Number(tmdbId),
                userId: user
            })
            return res.json(requestEmail)
        } catch (err: any | Error) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(err.status).json({ error: 'Erro ao fazer a requisição de conteúdo' })
        }
    }
}
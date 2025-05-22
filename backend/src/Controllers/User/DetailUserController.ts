import { Request, Response } from "express";
import { DetailUserService } from "../../Services/User/DetailUserService";

export class DetailUserController {
    async handle(req: Request, res: Response) {
        try {
            const detailService = new DetailUserService();
            const id = req.user_id;
            const userDetails = await detailService.execute({
                id: id as string
            })
            return res.json(userDetails)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao buscar os dados do usuario" })
        }
    }
}
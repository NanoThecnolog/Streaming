import { Request, Response } from "express";
import { ActiveUserService } from "../../Services/User/ActiveUserService";


export class ActiveUserController {
    async handle(req: Request, res: Response) {
        try {
            const activeUserService = new ActiveUserService();
            const { id } = req.query;
            //console.log("Chamando ativação", id)
            if (!id) {
                throw new Error("ID não recebido no controller.")
            }
            const user = await activeUserService.execute({
                id: id as string
            })

            return res.status(200).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao ativar usuário." })
        }
    }
}
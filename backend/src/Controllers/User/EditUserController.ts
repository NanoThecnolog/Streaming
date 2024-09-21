import { Request, Response } from "express";
import { EditUserService } from "../../Services/User/EditUserService";


class EditUserController {
    async handle(req: Request, res: Response) {
        try {
            const editUserService = new EditUserService();
            const { id, name, password, avatar, birthday } = req.body;
            const user = await editUserService.execute({
                id,
                name,
                password,
                avatar,
                birthday
            })
            return res.json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao editar usuario." })
        }
    }
}

export { EditUserController }
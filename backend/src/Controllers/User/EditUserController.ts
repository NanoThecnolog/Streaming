import { Request, Response } from "express";
import { EditUserService } from "../../Services/User/EditUserService";
import { debugLog } from "../../Utils/DebugLog";


class EditUserController {
    async handle(req: Request, res: Response) {
        try {
            const editUserService = new EditUserService();
            const { name, password, avatar, birthday, news } = req.body;
            const id = req.user_id
            debugLog('dados do user no controller', { name, password, avatar, birthday, news, id })
            const user = await editUserService.execute({
                id,
                name,
                password,
                avatar,
                birthday,
                news
            })
            return res.status(200).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao editar usuario." })
        }
    }
}

export { EditUserController }
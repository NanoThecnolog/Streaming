import { Request, Response } from "express";
import { DeleteUserService } from "../../Services/User/DeleteUserService";


class DeleteUserController {
    async handle(req: Request, res: Response) {
        try {

            const deleteUserService = new DeleteUserService();
            const { id } = req.body;

            const deleteUser = await deleteUserService.execute({ id });

            return res.json(deleteUser);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao tentar deletar o usuário." })
        }
    }
}

export { DeleteUserController }
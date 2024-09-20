import { Request, Response } from "express";
import { AuthUserService } from "../../Services/User/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {

        try {
            const authUserService = new AuthUserService();
            const { email, password } = req.body;
            const user = await authUserService.execute(email, password)

            return res.json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao autenticar usuário." })
        }
    }
}

export { AuthUserController }
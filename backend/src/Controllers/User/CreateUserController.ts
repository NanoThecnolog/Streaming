import { Request, Response } from "express";
import { CreateUserService } from "../../Services/User/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            const createUserService = new CreateUserService();
            const { name, email, birthday, password } = req.body;
            const user = await createUserService.execute({
                name,
                email,
                birthday,
                password
            })
            return res.status(200).json(user)
        } catch (err: any | Error) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(err.status).json({ error: "Erro ao criar usuário.", erro: err })
        }
    }
}

export { CreateUserController }
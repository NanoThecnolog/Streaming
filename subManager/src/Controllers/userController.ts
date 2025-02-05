import { Request, Response } from "express";
import { CreateUserService } from "../Services/userService";

class CreateUser {
    async handle(req: Request, res: Response) {
        try {
            const { name } = req.body;
            return res.status(200).json({ name })
        } catch (err) {
            return res.status(500).json({ message: "deu ruim" })
        }
    }
}
export { CreateUser }

/*class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const createUser = new CreateUserService();
            const user = await createUser.execute({
                name,
                email,
                password
            })
            return res.status(201).json({ message: 'Usuário criado com sucesso!', user });
        } catch (err: any) {
            console.error(err);
            return res.status(err.status).json({ message: 'Erro ao criar usuário' });
        }
    }
}
export { CreateUserController }*/
import { Request, Response } from "express";
import { CreateUserService } from "../../Services/User/CreateUserService";
import { BadRequestError } from "../../Utils/badRequestExtend";

class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            const createUserService = new CreateUserService();
            const { name, email, birthday, password, cpf, phone_number, address } = req.body;
            if (!name || !email || !birthday || !password) throw new BadRequestError("Campos obrigatórios inválidos")

            const user = await createUserService.execute({
                name,
                email,
                birthday,
                password,
                cpf,
                phone_number,
                address
            })
            console.log("resultado da requisição do service:", user)
            return res.status(200).json(user)
        } catch (err: any | Error) {
            if (err instanceof BadRequestError) {
                return res.status(err.statusCode).json({ code: err.statusCode, error: "Erro ao criar usuario", message: err.message })
            }
            return res.status(500).json({ code: 500, message: "Erro ao criar o usuário.", error: err })
        }
    }
}

export { CreateUserController }
import { compare } from "bcrypt";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

class AuthUserService {
    async execute(email: string, password: string) {
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (!userExiste) throw new Error("Email ou senha incorreto.")

        const passwordMatch = await compare(password, userExiste.password);
        if (!passwordMatch) throw new Error("Email ou senha incorreto.")

        const secret = process.env.SECRET_JWT;
        if (!secret) throw new Error("Variável de ambiente não definida corretamente.")

        const token = sign(
            {
                name: userExiste.name,
                email: userExiste.email,
            },
            secret,
            {
                subject: userExiste.id,
                expiresIn: '30d'

            }
        )
        return {
            id: userExiste.id,
            name: userExiste.name,
            email: userExiste.email,
            avatar: userExiste.avatar,
            token: token
        }
    }
}

export { AuthUserService }
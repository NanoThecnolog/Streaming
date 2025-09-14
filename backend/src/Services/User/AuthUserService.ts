import { compare } from "bcrypt";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { ListFavoriteService } from "./ListFavoriteService";
import { v4 as uuidv4 } from 'uuid'

class AuthUserService {
    async execute(email: string, password: string) {
        const secret = process.env.SECRET_JWT;
        if (!secret) throw new AppError("Variável de ambiente não definida corretamente.", 500)
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (!userExiste) throw new AppError("Email ou senha incorreto.", 401)

        const passwordMatch = await compare(password, userExiste.password);
        if (!passwordMatch) throw new AppError("Email ou senha incorreto.", 401)

        //if (!userExiste.verified) throw new AppError("Account not verified. Please, check your email!--", 403)

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
        const watchLaterList = await prismaClient.watchLater.findMany({
            where: {
                userId: userExiste.id
            }
        })
        //const favoriteService = new ListFavoriteService();
        //const favoriteList = await favoriteService.execute(userExiste.id)

        return {
            name: userExiste.name,
            avatar: userExiste.avatar,
            watchLater: watchLaterList,
            token: token,
        }
    }
}

export { AuthUserService }


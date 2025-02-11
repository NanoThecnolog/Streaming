import { compare } from "bcrypt";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { ListFavoriteService } from "./ListFavoriteService";

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
        const watchLaterList = await prismaClient.watchLater.findMany({
            where: {
                userId: userExiste.id
            }
        })
        const favoriteService = new ListFavoriteService();
        const favoriteList = await favoriteService.execute(userExiste.id)

        return {
            id: userExiste.id,
            name: userExiste.name,
            email: userExiste.email,
            avatar: userExiste.avatar,
            verified: userExiste.verified,
            birthday: userExiste.birthday,
            myList: watchLaterList,
            favoritos: favoriteList,
            news: userExiste.news,
            token: token,
            createdAt: userExiste.created_at
        }
    }
}

export { AuthUserService }
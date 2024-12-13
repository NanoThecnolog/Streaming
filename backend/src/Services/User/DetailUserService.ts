import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface DetailUserProps {
    id: string,
    name: string,
    email: string,
    avatar: string | null,
    verified: boolean,
    birthday: Date,
    news: boolean,
    favoritos: {
        id: string,
        title: string,
        subtitle: string | null,
        tmdbid: number,
        userId: string
    }[],
    myList: {
        id: string,
        title: string,
        subtitle: string,
        tmdbid: number,
        userId: string,
        created_at: Date;
    }[],
    token: string
}
interface RequestProps {
    id: string
}


export class DetailUserService {
    async execute({ id }: RequestProps): Promise<DetailUserProps> {
        const [user, watchLaterList] = await Promise.all([
            prismaClient.user.findUniqueOrThrow({
                where: { id: id }
            }),

            prismaClient.watchLater.findMany({
                where: { userId: id }
                , select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    tmdbid: true,
                    userId: true,
                    created_at: true
                }
            })
        ])
        const secret = process.env.SECRET_JWT;
        if (!secret) throw new Error("Variável de ambiente não definida corretamente.")

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            secret,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        const favoritos = await prismaClient.favorito.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                title: true,
                subtitle: true,
                tmdbid: true,
                userId: true
            }
        })
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            birthday: user.birthday,
            news: user.news,
            favoritos: favoritos ?? favoritos,
            myList: watchLaterList,
            token: token
        }
    }
}

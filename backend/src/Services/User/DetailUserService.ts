import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface DetailUserProps {
    id: string,
    name: string,
    email: string,
    avatar: string | null,
    verified: boolean,
    birthday: Date,
    myList: {
        id: string,
        title: string,
        subtitle: string,
        userId: string,
        created_at: Date;
        updated_at: Date;
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
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            birthday: user.birthday,
            myList: watchLaterList,
            token: token
        }
    }
}

import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface DetailUserProps {
    name: string,
    email: string,
    avatar: string | null,
    verified: boolean,
    birthday: Date,
    news: boolean,
    createdAt: Date,
    watchLater: {
        id: string,
        title: string,
        subtitle: string,
        tmdbid: number,
        userId: string,
        created_at: Date;
    }[],
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
                    created_at: true,
                }
            })
        ])
        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            birthday: user.birthday,
            news: user.news,
            watchLater: watchLaterList,
            createdAt: user.created_at
        }
    }
}

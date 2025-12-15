import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { address } from "@prisma/client";

interface DetailUserProps {
    name: string,
    email: string,
    cpf: string | null,
    phone_number: string | null,
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
    subscription: SubscriptionProps | null,
    donator: boolean,
    address: address | null
}
interface RequestProps {
    id: string
}

interface SubscriptionProps {
    id: string,
    userId: string,
    subId: number,
    planId: string,
    startedAt?: string | Date,
    status: string
}


export class DetailUserService {
    async execute({ id }: RequestProps): Promise<DetailUserProps | string> {
        //console.log("teste")
        //return 'teste'
        const [user, watchLaterList, subscription] = await Promise.all([
            prismaClient.user.findUniqueOrThrow({
                where: { id: id },
                include: { address: true }
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
            }),
            prismaClient.subscription.findUnique({ where: { userId: id } })
        ])
        console.log(user.id)
        await prismaClient.loginHistory.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                name: user.name,
                email: user.email,
                lastAccess: new Date()
            },
            update: {
                name: user.name,
                email: user.email,
                lastAccess: new Date()
            }
        })
        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            birthday: user.birthday,
            cpf: user.cpf,
            phone_number: user.phone_number,
            news: user.news,
            watchLater: watchLaterList,
            createdAt: user.created_at,
            subscription: subscription,
            donator: user.donator,
            address: user.address
        }
    }
}

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
    }[]
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
        //if (!user) throw new Error("Usuário Não encontrado")
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            birthday: user.birthday,
            myList: watchLaterList,
        }
    }
}

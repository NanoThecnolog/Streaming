import prismaClient from "../../prisma";

interface WatchLaterProps {
    title: string,
    subtitle: string,
    id: string
}

class WatchLaterService {
    async execute({ id, title, subtitle }: WatchLaterProps) {
        const userExiste = await prismaClient.user.findUnique({
            where: { id }
        })
        if (!userExiste) throw new Error("Usuário não encontrado")

        const movieList = await prismaClient.watchLater.create({
            data: {
                title,
                subtitle,
                user: {
                    connect: { id }
                }
            }
        })
        return movieList
    }
}
export { WatchLaterService }
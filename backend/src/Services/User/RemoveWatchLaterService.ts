import prismaClient from "../../prisma";


class RemoveWatchLaterService {
    async execute(id: string) {
        const remover = await prismaClient.watchLater.delete({
            where: { id }
        })
        return remover
    }
}

export { RemoveWatchLaterService }
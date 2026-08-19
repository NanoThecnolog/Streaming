import prismaClient from "../../prisma";


class RemoveWatchLaterService {
    async execute(id: string, profileId?: string) {
        const result = await prismaClient.watchLater.deleteMany({
            where: { id, profileId }
        })
        if (result.count === 0) {
            throw new Error("Título não encontrado na lista do perfil.")
        }
        return { message: "removido" }
    }
}

export { RemoveWatchLaterService }
import prismaClient from "../../prisma";

class ListWatchLaterService {
    async execute(id: string) {
        const userExiste = await prismaClient.user.findUnique({
            where: { id }
        })
        if (!userExiste) throw new Error("Usuário não encontrado")
        const lista = await prismaClient.watchLater.findMany({
            where: { userId: id },
            select: {
                id: true,
                title: true,
                subtitle: true,
                created_at: true
            }
        })
        return lista
    }
}

export { ListWatchLaterService }
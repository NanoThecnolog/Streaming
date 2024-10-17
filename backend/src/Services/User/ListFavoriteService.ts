import prismaClient from '../../prisma';

export class ListFavoriteService {
    async execute(userId: string) {
        const userExiste = await prismaClient.user.findUnique({ where: { id: userId } })
        if (!userExiste) throw new Error("Usuário não encontrado")
        const listaFavoritos = await prismaClient.favorito.findMany({ where: { userId } })
        if (!listaFavoritos) throw new Error("Lista de Favoritos vazia ou não encontrada")
        return listaFavoritos
    }
}
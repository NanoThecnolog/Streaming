import prismaClient from '../../prisma';

export class RemoveFavoriteService {
    async execute(favoriteId: string) {
        const favoritoExiste = await prismaClient.favorito.findUnique({ where: { id: favoriteId } })
        if (!favoritoExiste) throw new Error("Favorito não encontrado")
        const removerFavorito = await prismaClient.favorito.delete({ where: { id: favoriteId } })
        return removerFavorito
    }
}
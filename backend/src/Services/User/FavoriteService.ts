import prismaClient from '../../prisma';

interface FavoriteProps {
    tmdbid: number,
    title: string,
    subtitle: string,
    userId: string
}
export class FavoriteService {
    async execute({ tmdbid, title, subtitle, userId }: FavoriteProps) {
        const userExiste = await prismaClient.user.findUnique({
            where: { id: userId }
        })
        if (!userExiste) throw new Error("Usuário não encontrado")
        const favoritar = await prismaClient.favorito.create({
            data: {
                tmdbid,
                title,
                subtitle,
                userId
            }
        })
        return favoritar
    }
}
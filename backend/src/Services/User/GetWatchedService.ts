import prismaClient from '../../prisma';

export class getWatchedService {
    async execute({ uid, tmdbID }: { uid: string, tmdbID: number }) {

        const data = await prismaClient.watched.findMany({
            where: {
                userId: uid,
                tmdbID
            }
        })

        if (!data) return {
            result: "nada"
        }
        return data
    }
}
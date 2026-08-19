import prismaClient from '../../prisma';

export class getWatchedService {
    async execute({ uid, tmdbID, profileId }: { uid: string, tmdbID: number, profileId?: string }) {

        const where: Record<string, unknown> = {
            userId: uid,
            tmdbID
        };
        if (profileId) where.profileId = profileId;

        const data = await prismaClient.watched.findMany({ where })

        if (!data) return {
            result: "nada"
        }
        return data
    }
}
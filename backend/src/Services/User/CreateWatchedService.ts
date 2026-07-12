import { Entry } from '../../@types/watchedTypes';
import prismaClient from '../../prisma';

export class CreateWatchedService {
    async getWatchedList(id: string) {
        const data = await prismaClient.watched.findMany({ where: { userId: id } })

        if (!data) throw new Error("Entradas de usuário não encontradas")
        return data
    }
    async createEntry(data: Entry) {
        return await prismaClient.watched.upsert({
            where: {
                userId_tmdbID_season_episode: {
                    userId: data.userId,
                    tmdbID: data.tmdbID,
                    season: data.season ?? 0,
                    episode: data.episode ?? 0,
                }
            },
            create: {
                ...data,
                season: data.season ?? 0,
                episode: data.episode ?? 0
            },
            update: {
                progress: data.progress,
                completed: data.completed,
            }
        })
    }
}
import { Entry } from '../../@types/watchedTypes';
import prismaClient from '../../prisma';

export class CreateWatchedService {
    async getWatchedList(uid: string, profileId?: string) {
        const where: Record<string, unknown> = { userId: uid };
        if (profileId) where.profileId = profileId;

        const data = await prismaClient.watched.findMany({ where });

        if (!data) throw new Error("Entradas de usuário não encontradas");
        return data
    }
    async createEntry(data: Entry) {
        if (!data.profileId) throw new Error("Profile ID é obrigatório.");

        return await prismaClient.watched.upsert({
            where: {
                profileId_tmdbID_season_episode: {
                    profileId: data.profileId,
                    tmdbID: data.tmdbID,
                    season: data.season ?? 0,
                    episode: data.episode ?? 0,
                }
            },
            create: {
                userId: data.userId,
                profileId: data.profileId,
                tmdbID: data.tmdbID,
                mediaType: data.mediaType,
                season: data.season ?? 0,
                episode: data.episode ?? 0,
                progress: data.progress ?? 0,
                completed: data.completed,
            },
            update: {
                progress: data.progress,
                completed: data.completed,
            }
        })
    }
}
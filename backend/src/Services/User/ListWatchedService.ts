import prismaClient from '../../prisma';

type TrackingParsed =
    | {
        id: string
        name: string
        type: 'movie'
        tmdbID: string
        createdAt: Date
    }
    | {
        id: string
        name: string
        type: 'tv'
        tmdbID: string
        season?: number
        episode?: number
        createdAt: Date
    }

export class ListWatchedService {
    async execute(uid: string) {
        const extractTmdbId = (path: string) => {
            if (path.includes('?')) {
                const query = path.split('?')[1]
                const params = new URLSearchParams(query)

                const seasonParam = params.get('season')
                const episodeParam = params.get('episode')
                const tmdbID = params.get('tmdbID')

                const hasSeason = seasonParam !== null
                const hasEpisode = episodeParam !== null

                if (hasSeason && hasEpisode) {
                    if (!tmdbID) return null

                    const season = Number(seasonParam)
                    const episode = Number(episodeParam)

                    if (
                        !Number.isInteger(season) ||
                        !Number.isInteger(episode) ||
                        Number(season) < 0 ||
                        Number(episode) < 0
                    ) {
                        return null
                    }

                    return {
                        type: 'tv',
                        tmdbID: tmdbID,
                        season,
                        episode
                    }
                }
            }
            const match = path.match(/\/watch\/(\d+)/)
            if (!match) return null

            return {
                type: 'movie',
                tmdbID: match[1]
            }
        }

        const dataTracked = await prismaClient.tracking.findMany({
            where: {
                userId: uid
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const map = new Map<string, TrackingParsed>()

        for (const item of dataTracked) {
            const parsed = extractTmdbId(item.path)

            if (!parsed) continue

            if (map.has(String(parsed.tmdbID))) continue

            if (parsed.type === 'movie') {
                map.set(String(parsed.tmdbID), {
                    id: item.id,
                    name: item.name,
                    type: 'movie',
                    tmdbID: String(parsed.tmdbID),
                    createdAt: item.createdAt
                })
            } else {
                map.set(String(parsed.tmdbID), {
                    id: item.id,
                    name: item.name,
                    type: 'tv',
                    tmdbID: String(parsed.tmdbID),
                    season: Number(parsed.season),
                    episode: Number(parsed.episode),
                    createdAt: item.createdAt
                })
            }
        }

        const result = Array.from(map.values())
        return {
            count: result.length,
            result
        }
    }
}
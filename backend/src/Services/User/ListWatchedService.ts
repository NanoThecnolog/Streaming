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
        const extracktTmdbId = (path: string) => {
            if (path.includes('?')) {
                const query = path.split('?')[1]
                const params = new URLSearchParams(query)

                const tmdbID = params.get('tmdbID')
                if (!tmdbID) return null

                return {
                    type: 'tv',
                    tmdbID,
                    season: params.get('season')
                        ? Number(params.get('season'))
                        : undefined,
                    episode: params.get('episode')
                        ? Number(params.get('episode'))
                        : undefined
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
            const parsed = extracktTmdbId(item.path)

            if (!parsed) continue

            if (map.has(parsed.tmdbID)) continue

            if (parsed.type === 'movie') {
                map.set(parsed.tmdbID, {
                    id: item.id,
                    name: item.name,
                    type: 'movie',
                    tmdbID: parsed.tmdbID,
                    createdAt: item.createdAt
                })
            } else {
                map.set(parsed.tmdbID, {
                    id: item.id,
                    name: item.name,
                    type: 'tv',
                    tmdbID: parsed.tmdbID,
                    season: parsed.season,
                    episode: parsed.episode,
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
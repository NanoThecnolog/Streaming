export type TrackingParsed =
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
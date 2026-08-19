export interface Entry {
    userId: string,
    profileId?: string,
    tmdbID: number,
    mediaType: 'movie' | 'tv'
    season?: number
    episode?: number
    progress?: number
    completed: boolean

}
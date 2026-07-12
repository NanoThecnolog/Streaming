export interface watchedProgressEntry {
    tmdbID: number,
    mediaType: 'movie' | 'tv'
    season?: number
    episode?: number
    progress?: number
    completed: boolean
}

export interface ProgressEntry {
    id: string
    userId: string
    tmdbID: number
    mediaType: 'movie' | 'tv'
    season: number | null
    episode: number | null
    progress: number
    completed: boolean
    lastWatched: string
    createdAt: string
    updatedAt: string
}

export interface ProgressData {
    progress: number
    completed?: boolean
    season: number
    episode: number
    id: string
    mediaType: 'movie' | 'tv'
    tmdbID: number
    lastWatched: Date
}

export interface ProgressResponse {
    result: ProgressData[]
}

export interface EpisodeProgressProps {
    episode: number,
    season: number,
    progress: number
    percentage: number
    complete: boolean
}
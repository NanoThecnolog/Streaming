export interface SubtitleTrack {
    id: number
    label: string
    language: string
    type: 'forced' | 'full' | 'unknown'
}
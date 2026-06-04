export interface SubtitleTrack {
    id: number
    label: string
    language: string
    type: 'forced' | 'full' | 'unknown'
    url?: string
}

export interface AudioTrack {
    id: number,
    name: string,
    lang: string
}

export interface PlayerPreferences {
    audioLanguage: string | null
    subtitleLanguage: string | null
    subtitleType: 'forced' | 'full' | 'unknown' | null
    subtitlesEnabled: boolean
}

export interface ManualSubtitleCue {
    start: number,
    end: number,
    text: string
}
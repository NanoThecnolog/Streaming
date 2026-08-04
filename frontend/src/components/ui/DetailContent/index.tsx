import { minToHour } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

type MovieLanguage = 'Dub' | 'Leg'

interface DetailsProps {
    duration?: string
    runtime?: number
    releaseDate?: string
    language?: MovieLanguage
}

const languageLabels: Record<MovieLanguage, string> = {
    Dub: 'Dublado',
    Leg: 'Legendado',
}

const getDurationLabel = (duration?: string, runtime?: number): string | null => {
    const catalogDuration = duration?.trim()

    if (catalogDuration) {
        return catalogDuration
    }

    if (
        typeof runtime === 'number' &&
        Number.isFinite(runtime) &&
        runtime > 0
    ) {
        return minToHour(runtime)
    }

    return null
}

const getReleaseYear = (releaseDate?: string): string | null => {
    if (!releaseDate) return null

    const yearMatch = releaseDate.match(/^(\d{4})/)

    return yearMatch?.[1] ?? null
}

export default function Details({ duration, runtime, releaseDate, language }: DetailsProps) {
    const durationLabel = getDurationLabel(
        duration,
        runtime,
    )

    const releaseYear = getReleaseYear(releaseDate)

    const languageLabel = language
        ? languageLabels[language]
        : null

    const details = [
        durationLabel,
        releaseYear,
        languageLabel,
    ].filter((detail): detail is string => Boolean(detail))

    if (details.length === 0) return null

    return (
        <div className={styles.movieDetail}>
            <ul
                className={styles.detailsList}
                aria-label="Informações do filme"
            >
                {details.map((detail) => (
                    <li
                        key={detail}
                        className={styles.detailItem}
                    >
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    )
}
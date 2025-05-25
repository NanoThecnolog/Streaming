import { minToHour } from '@/utils/UtilitiesFunctions'
import styles from './styles.module.scss'

interface DetailsProps {
    title: string
    duration: string
    runtime: number
    releaseDate: string
    language: "Dub" | "Leg" | undefined
}

export default function Details({ title, duration, runtime, releaseDate, language }: DetailsProps) {
    return (
        <div className={styles.movieDetail}>
            <h4>{title.toLowerCase() === 'batman vs superman' ?
                duration
                : minToHour(runtime)} - {new Date(releaseDate).getFullYear()} - {language && language === "Leg" ? "Legendado" : "Dublado"}
            </h4>
        </div>
    )
}
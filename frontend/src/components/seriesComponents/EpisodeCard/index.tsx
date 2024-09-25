import styles from './styles.module.scss'
import { Episodes } from '@/@types/series'

interface EpisodeProps {
    episode: Episodes
}

export default function EpisodeCard({ episode }: EpisodeProps) {
    return (
        <div className={styles.container}>
            <div>
                Episódio {episode.ep}
                {episode.duration}
            </div>
        </div>
    )
}
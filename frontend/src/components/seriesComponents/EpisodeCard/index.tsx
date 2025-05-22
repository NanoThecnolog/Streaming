import { PlayIcon } from 'lucide-react'
import styles from './styles.module.scss'
import { Episodes, TMDBEpisodes } from '@/@types/series'
import { minToHour } from '@/utils/UtilitiesFunctions'
import { debug } from '@/classes/DebugLogger'

interface EpisodeProps {
    episodeData: {
        serieTmdbId: number,
        seasonNumber: number | undefined,
        image: string,
        episode: TMDBEpisodes | undefined,
        data: Episodes,
    },
    handlePlay: (ep: Episodes, season?: number) => void
}

export default function EpisodeCard({ episodeData, handlePlay }: EpisodeProps) {
    //debug.log(episodeData)
    return (
        <div className={styles.episodeContainer} onClick={() => handlePlay(episodeData.data, episodeData.seasonNumber)}>
            <div
                className={styles.episodeImage}
                style={{ backgroundImage: `url(${episodeData.image})` }}
            >
                <PlayIcon size={35} />
            </div>
            <div className={styles.epiInfo}>
                <h3>Ep.{episodeData.data.ep}: {episodeData.episode?.name}</h3>
                <p>Duração: {episodeData.episode ? minToHour(episodeData.episode.runtime) : episodeData.data.duration ? episodeData.data.duration : "--"}</p>
                <p className={styles.description} title={episodeData.episode?.overview}>{episodeData.episode?.overview}</p>
            </div>
        </div>
    )
}
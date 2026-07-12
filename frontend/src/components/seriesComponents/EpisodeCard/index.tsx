import { PlayIcon } from 'lucide-react'
import styles from './styles.module.scss'
import { Episodes, TMDBEpisodes } from '@/@types/series'
import { minToHour } from '@/utils/UtilitiesFunctions'
import { debug } from '@/classes/DebugLogger'
import { EpisodeProgressProps } from '@/@types/watchedProgress'

interface EpisodeProps {
    episodeData: {
        serieTmdbId: number,
        seasonNumber: number | undefined,
        image: string,
        episode: TMDBEpisodes | undefined,
        data: Episodes,
        progress: EpisodeProgressProps | null
    },
    handlePlay: (ep: Episodes, startTime?: number, season?: number) => void
}

export default function EpisodeCard({ episodeData, handlePlay }: EpisodeProps) {
    //debug.log("info do episodio recebido", episodeData)
    //debug.log("dados do episódio???", episodeData.episode)

    const type = episodeData.episode?.episode_type
    const isComplete = episodeData.progress?.complete

    return (
        <div className={styles.episodeContainer} onClick={() => handlePlay(episodeData.data, isComplete ? 0 : episodeData.progress?.progress, episodeData.seasonNumber)}>
            <div
                className={styles.episodeImage}
                style={{ backgroundImage: `url(${episodeData.image})` }}
            >
                <PlayIcon size={35} />
                {
                    type && type === 'finale' && <div className={styles.typeContainer}><span>Final de temporada</span></div>
                }
                <div className={styles.progress}>
                    <div className={styles.progressFill} style={{ width: `${episodeData.progress ? isComplete ? 100 : episodeData.progress.percentage : 0}%` }} />
                </div>
            </div>
            <div className={styles.epiInfo}>
                <h3>Ep.{episodeData.data.ep}: {episodeData.episode?.name}</h3>
                <p>Duração: {episodeData.episode ? minToHour(episodeData.episode.runtime) : episodeData.data.duration ? episodeData.data.duration : "--"}</p>
                <p className={styles.description} title={episodeData.episode?.overview}>{episodeData.episode?.overview}</p>
            </div>
        </div>
    )
}
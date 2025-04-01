import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'

interface NextProps {
    title: string,
    subtitle: string,
    season: number,
    episode: number
    serie: SeriesProps | null
}
interface NextEpisodeProps {
    season: number,
    episode: number,
    src: string,

}

export default function NextEpisode({ title, subtitle, season, episode, serie }: NextProps) {
    const router = useRouter()

    function getNextEpisode(): NextEpisodeProps | null {
        debug.log(serie)

        if (!serie) return null

        const currentSerie = serie.season[season - 1]
        if (!currentSerie) return null

        if (currentSerie.episodes.length > episode) return { season: currentSerie.s, episode: currentSerie.episodes[episode].ep, src: currentSerie.episodes[episode].src }

        const nextSeason = serie.season[season]
        if (nextSeason && nextSeason.episodes.length > 0) return { season: nextSeason.s, episode: nextSeason.episodes[0].ep, src: nextSeason.episodes[0].src }

        return null
    }
    const nextEpisode = getNextEpisode()

    function handleNextEpisode() {
        const movie = new URLSearchParams({
            title: `${title}`,
            subtitle: `${subtitle}` || "",
            src: `${nextEpisode?.src}`,
            episode: `${nextEpisode?.episode}`,
            season: `${nextEpisode?.season}`,
            tmdbID: `${serie?.tmdbID}`
        });
        const play: string = `/watch/serie?${movie}`
        debug.log(play)
        router.replace(play)
    }
    return (
        <>
            <button
                className={styles.next}
                onClick={handleNextEpisode}
                disabled={!nextEpisode}
                type='button'
            >
                Próximo Episódio
            </button>
        </>
    )
}
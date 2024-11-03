import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { series } from '@/js/series'

interface NextProps {
    title: string,
    subtitle: string,
    season: number,
    episode: number
}
interface NextEpisodeProps {
    season: number,
    episode: number,
    src: string,
}

export default function NextEpisode({ title, subtitle, season, episode }: NextProps) {
    const router = useRouter()

    function getNextEpisode(): NextEpisodeProps | null {
        const serie = series.find(serie => serie.title === title && serie.subtitle === subtitle)

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
            subTitle: `${subtitle}` || "",
            src: `${nextEpisode?.src}`,
            episode: `${nextEpisode?.episode}`,
            season: `${nextEpisode?.season}`
        });
        const play: string = `/watch/serie?${movie}`
        router.push(play)
    }
    return (
        <>
            <button
                className={styles.next}
                onClick={handleNextEpisode}
                disabled={!nextEpisode}
            >
                Próximo Episódio
            </button>
        </>
    )
}
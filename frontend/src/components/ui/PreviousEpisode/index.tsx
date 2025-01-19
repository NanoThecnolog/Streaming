import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { series } from '@/data/series'

interface PrevProps {
    title: string,
    subtitle: string,
    season: number,
    episode: number
}

interface PrevEpisodeProps {
    season: number,
    episode: number,
    src: string,
}

export default function PrevEpisode({ title, subtitle, season, episode }: PrevProps) {
    const router = useRouter()

    function getPrevEpisode(): PrevEpisodeProps | null {
        const serie = series.find(serie => serie.title === title && serie.subtitle === subtitle);

        if (!serie) return null;

        const currentSeason = serie.season[season - 1];
        if (!currentSeason) return null;

        if (episode > 1) {
            const prevEpisode = currentSeason.episodes[episode - 2];
            return { season, episode: prevEpisode.ep, src: prevEpisode.src };
        }

        const prevSeason = serie.season[season - 2];
        if (prevSeason && prevSeason.episodes.length > 0) {
            const lastEpisode = prevSeason.episodes[prevSeason.episodes.length - 1];
            return { season: prevSeason.s, episode: lastEpisode.ep, src: lastEpisode.src };
        }

        return null;
    }

    const prevEpisode = getPrevEpisode();

    function handlePrevEpisode() {
        if (!prevEpisode) return;

        const movie = new URLSearchParams({
            title: `${title}`,
            subtitle: `${subtitle}` || "",
            src: `${prevEpisode.src}`,
            episode: `${prevEpisode.episode}`,
            season: `${prevEpisode.season}`
        });
        const play = `/watch/serie?${movie}`;

        router.push(play);
    }

    return (
        <>
            <button
                className={styles.prev}
                onClick={handlePrevEpisode}
                disabled={!prevEpisode}
                type='button'
            >
                Episódio Anterior
            </button>
        </>
    )
}

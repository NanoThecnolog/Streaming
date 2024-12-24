import { PlayIcon, X } from 'lucide-react'
import styles from './styles.module.scss'
import { DubbedEpisode, Episodes, TMDBEpisodes } from '@/@types/series'
import { useEffect, useState } from 'react'
import { dubbedEpisodes } from '@/js/dubbedEpisodes'
import ChangeLanguage from '@/components/ui/SwitchLang'

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
    const [changeLang, setChangeLang] = useState(false)

    function handleChangeLanguage() {
        //chama a funcão handlePlayEpisode
        setChangeLang(!changeLang)
    }
    function minToHour(min: number = 0): string {
        if (min <= 0) {
            return "--"
        }
        const hora = Math.floor(min / 60)
        const remainingMin = min % 60
        if (hora === 0) {
            return `${remainingMin}m`
        }
        return `${hora}h ${remainingMin}m`
    }
    function handlePlayEpisode(lang: string) {
        // pt-br ou original
        if (lang === 'original') {
            const episodio = {
                ep: episodeData.data,
                seasonNumber: episodeData.seasonNumber
            }
            if (!episodio.seasonNumber) return console.log("temporada faltando")
            handlePlay(episodio.ep, episodio.seasonNumber)
        } else if (lang === 'Dublado') {
            const episodioDublado = getDubbedEpisode(episodeData.serieTmdbId, episodeData.seasonNumber, episodeData.data.ep, lang)
            if (!episodioDublado) return console.log("sem episodio dublado")
            const episodio = {
                ep: episodioDublado,
                seasonNumber: episodeData.seasonNumber
            }
            if (!episodio.seasonNumber) return console.log("temporada faltando")
            handlePlay(episodio.ep, episodio.seasonNumber)
        }
    }
    function getDubbedEpisode(tmdbID: number, seasonNumber: number | undefined, episodeNumber: number | undefined, lang: string): Episodes | null {

        if (!seasonNumber) return null
        if (!episodeNumber) return null
        const Data = dubbedEpisodes.find(
            (item) => item.tmdbID === tmdbID
        )
        if (!Data) return null;
        const season = Data.season.find((season) => season.s === seasonNumber && season.lang === lang)

        if (!season) return null;
        const episodeData = season.episodes.find(ep => ep.ep === episodeNumber)

        return episodeData || null
    }


    return (
        <div className={styles.episodeContainer} onClick={() => handlePlay(episodeData.data, episodeData.seasonNumber)}>
            <div
                className={styles.episodeImage}
                style={{ backgroundImage: `url(${episodeData.image})` }}
            ><PlayIcon size={35} /></div>
            <div className={styles.epiInfo}>
                <h3>Ep.{episodeData.data.ep}: {episodeData.episode?.name}</h3>
                <p>Duração: {episodeData.episode ? minToHour(episodeData.episode.runtime) : episodeData.data.duration ? episodeData.data.duration : "--"}</p>
                <p className={styles.description} title={episodeData.episode?.overview}>{episodeData.episode?.overview}</p>
            </div>
            {/* temporariamente desativado
                changeLang &&
                <>
                    <div className={styles.closeButton} onClick={handleChangeLanguage}>
                        <X />
                    </div>
                    <ChangeLanguage handlePlay={handlePlayEpisode} />
                </>
            */}
        </div>
    )
}
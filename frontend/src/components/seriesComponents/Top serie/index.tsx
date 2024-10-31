import { series } from '@/js/series'
import { FaCirclePlay } from "react-icons/fa6";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { fetchTMDBSeries } from '@/services/fetchTMDBData';


interface TopSerieProps {
    width?: number
}


export default function TopSerie({ width }: TopSerieProps) {
    //refatorar
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [TMDBPoster, setTMDBPoster] = useState<string | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')
            setTimeout(() => {
                setCardOn(prevCardOn => (prevCardOn + 1) % series.length);
                setFade('fadeIn')
            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        setTMDBBackDrop(null)
        setTMDBPoster(null)
        if (series[cardOn].tmdbID === 0) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        fetchSerieData()
    }, [cardOn])
    async function fetchSerieData() {
        const serie = await fetchTMDBSeries(series[cardOn].tmdbID)
        if (!serie || !serie.backdrop_path || !serie.poster_path) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        const backdropURL = `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
        const posterURL = `https://image.tmdb.org/t/p/original${serie.poster_path}`
        setTMDBBackDrop(backdropURL)
        setTMDBPoster(posterURL)
    }

    function handleEpisodes(title: string) {
        const serie = new URLSearchParams({
            title: `${title}`
        })
        Router.push(`/series/serie?${serie}`)
    }

    function handleWatch() {
        const movie = new URLSearchParams({
            title: `${series[cardOn].title}`,
            subTitle: `${series[cardOn].subtitle}` || "",
            src: `${series[cardOn].season[0].episodes[0].src}`,
            episode: `${series[cardOn].season[0].episodes[0].ep}`,
            season: `${series[cardOn].season[0].s}`
        });
        const play: string = `/watch/serie?${movie}`
        Router.push(play)
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`} style={{
            backgroundImage:
                width && width <= 780 ?
                    `url(${TMDBPoster ? TMDBPoster : series[cardOn].overlay})` :
                    `url(${TMDBBackDrop ? TMDBBackDrop : series[cardOn].background})`
        }}>
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 className={styles.titulo_principal}>{series[cardOn].title.toUpperCase()}</h1>
                    {series[cardOn].subtitle && (
                        <h3 className={styles.subtitulo_principal}>{series[cardOn].subtitle}</h3>
                    )}

                    <div className={styles.description}>
                        <p>{series[cardOn].description}</p>
                    </div>
                    <div className={styles.season}>
                        <p>{series[cardOn].season.length === 1 ? `${series[cardOn].season.length} Temporada` : series[cardOn].season.length >= 2 && `${series[cardOn].season.length} Temporadas`}</p>
                    </div>

                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={(e) => handleWatch()}>
                            <h3>Play</h3>
                            <FaCirclePlay color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={() => handleEpisodes(series[cardOn].title)}>
                            <h3>EPISÓDIOS</h3>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
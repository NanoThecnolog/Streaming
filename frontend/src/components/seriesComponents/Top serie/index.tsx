import { series } from '@/js/series'
import { FaCirclePlay } from "react-icons/fa6";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { fetchTMDBSeries } from '@/services/fetchTMDBData';
import Adult from '@/components/ui/Adult';
import { TMDBSeries } from '@/@types/series';
import { useTMDB } from '@/contexts/TMDBContext';


interface TopSerieProps {
    width?: number
}
interface TMDBImageProps {
    backdrop: string,
    poster: string
}


export default function TopSerie({ width }: TopSerieProps) {
    //refatorar
    const [cardOn, setCardOn] = useState(0)
    const card = series[cardOn]
    const [fade, setFade] = useState('fadeIn')
    const [TMDBImages, setTMDBImages] = useState<TMDBImageProps>()
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries>()

    const { serieData } = useTMDB();


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
        const data = serieData.find(data => data.id === card.tmdbID)
        if (data) {
            const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
            const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
            setTMDBSerie(data)
            setTMDBImages({ backdrop: backdropUrl, poster: posterUrl })
        }
    }, [serieData, cardOn])
    /*useEffect(() => {
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
    }*/

    function handleEpisodes(tmdbId: number) {
        Router.push(`/series/serie/${tmdbId}`)
    }

    function handleWatch() {
        const movie = new URLSearchParams({
            title: `${series[cardOn].title}`,
            subtitle: `${series[cardOn].subtitle}` || "",
            src: `${series[cardOn].season[0].episodes[0].src}`,
            episode: `${series[cardOn].season[0].episodes[0].ep}`,
            season: `${series[cardOn].season[0].s}`
        });
        const play: string = `/watch/serie?${movie}`
        console.log("filme: ", movie)
        Router.push(play)
    }
    const getBackgroundImage = () => {
        //const card = release[cardOn]
        return width && width <= 780
            ? TMDBImages?.poster ?? card.overlay
            : TMDBImages?.backdrop ?? card.background
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`} style={{
            backgroundImage: `url(${getBackgroundImage()})`
        }}>
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 className={styles.titulo_principal}>
                        {card.title.toUpperCase()}</h1>
                    {card.subtitle && (
                        <h3 className={styles.subtitulo_principal}>{card.subtitle}</h3>
                    )}

                    <div className={styles.description}>
                        <p>{card.description}</p>
                    </div>
                    <div className={styles.season}>
                        <p>{card.season.length === 1 ? `${card.season.length} Temporada` : card.season.length >= 2 && `${card.season.length} Temporadas`}</p>
                        <Adult faixa={card.faixa} />
                    </div>

                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={(e) => handleWatch()}>
                            <h3>Play</h3>
                            <FaCirclePlay color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={() => handleEpisodes(card.tmdbID)}>
                            <h3>EPISÓDIOS</h3>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
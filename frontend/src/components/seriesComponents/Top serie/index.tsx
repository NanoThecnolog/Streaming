import { series } from '@/data/series'
import { FaCirclePlay, FaPlay } from "react-icons/fa6";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Adult from '@/components/ui/Adult';
import { useTMDB } from '@/contexts/TMDBContext';
import NewContent from '@/components/ui/NewContent';
import { FaInfoCircle } from 'react-icons/fa';


interface TopSerieProps {
    width?: number
}
interface TMDBImageProps {
    backdrop: string,
    poster: string
}


export default function TopSerie({ width }: TopSerieProps) {
    const [cardOn, setCardOn] = useState(0)
    const card = series[cardOn]
    const [fade, setFade] = useState('fadeIn')
    const [TMDBImages, setTMDBImages] = useState<TMDBImageProps>()

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
            setTMDBImages({ backdrop: backdropUrl, poster: posterUrl })
        }
    }, [serieData, cardOn, card.tmdbID])
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
        Router.push(play)
    }
    const getBackgroundImage = () => {
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
                    <div className={styles.titulo_principal}>
                        <h1>{card.title.toUpperCase()}</h1>
                    </div>

                    {card.subtitle && (
                        <h3 className={styles.subtitulo_principal}>{card.subtitle}</h3>
                    )}
                    <div className={styles.description}>
                        <p>{card.description}</p>
                    </div>
                    <div className={styles.season}>
                        {
                            card.news &&
                            <div className={styles.newContentBox}>
                                <NewContent type={card.news.type} />
                            </div>
                        }
                        <Adult faixa={card.faixa} />
                        <p>{card.season.length === 1 ? `${card.season.length} Temporada` : card.season.length >= 2 && `${card.season.length} Temporadas`}</p>

                    </div>
                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={(e) => handleWatch()}>
                            <FaPlay size={35} />
                            <h3>Assistir</h3>
                        </div>
                        <div className={styles.queue} onClick={() => handleEpisodes(card.tmdbID)}>
                            <FaInfoCircle size={35} />
                            <h3>Mais Informações</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
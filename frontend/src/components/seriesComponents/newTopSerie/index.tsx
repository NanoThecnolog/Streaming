//import { series } from '@/data/series'
import { FaPlay } from "react-icons/fa6";
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Adult from '@/components/ui/Adult';
import { useTMDB } from '@/contexts/TMDBContext';
import NewContent from '@/components/ui/NewContent';
import { FaInfoCircle, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useFlix } from "@/contexts/FlixContext";
import { mongoService } from "@/classes/MongoContent";
import { debug } from "@/classes/DebugLogger";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import { flixFetcher } from "@/classes/Flixclass";
import { tmdb } from "@/classes/TMDB";


interface TopSerieProps {
    width: number,
    card: SeriesProps
}
interface TMDBImageProps {
    backdrop: string | null,
    poster: string | null
}


export default function NewTopSerie({ width, card }: TopSerieProps) {
    //const [cardOn, setCardOn] = useState(0)
    const router = useRouter()
    const { series, setSeries } = useFlix()
    //const card = series.sort((a, b) => b.index - a.index)[cardOn]
    //const [fade, setFade] = useState('fadeIn')
    const [TMDBImages, setTMDBImages] = useState<TMDBImageProps>({
        backdrop: null,
        poster: null
    })
    const { serieData } = useTMDB();
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries | null>(null)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0)



    useEffect(() => {
        async function getSeriesMongoData() {
            const mongoSeries = await mongoService.fetchSerieData()
            setSeries(mongoSeries)
        }
        if (series.length === 0) getSeriesMongoData()
    }, [series])

    useEffect(() => {
        const getImages = async () => {
            const data = serieData.find(data => data.id === card.tmdbID)
            if (data) {
                setTMDBSerie(data)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${data.poster_path}` })
            } else {
                const serie = await tmdb.fetchSeriesDetails(card.tmdbID)
                setTMDBSerie(serie)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${serie?.poster_path}` })
            }
        }
        getImages()
    }, [serieData, card])

    const getBackgroundImage = () => {
        if (card) {
            return width && width <= 780
                ? TMDBImages?.poster ?? '/fundo-alto.jpg'
                : TMDBImages?.backdrop ?? '/fundo-largo.jpg'
        }
    }
    function handleEpisodes(tmdbId: number) {
        Router.push(`/series/serie/${tmdbId}`)
    }

    function handleWatch() {
        const movie = new URLSearchParams({
            title: `${card.title}`,
            subtitle: `${card.subtitle}` || "",
            src: `${card.season[0].episodes[0].src}`,
            episode: `${card.season[0].episodes[0].ep}`,
            season: `${card.season[0].s}`
        });
        const play: string = `/watch/serie?${movie}`
        Router.push(play)
    }

    useEffect(() => {
        async function handleTrailer() {
            const timer = setTimeout(() => {
                setShowVideo(true)
            }, 3000)
            return () => clearInterval(timer)
        }
        if (width > 915) handleTrailer()
    }, [card, width])

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)

        if (videoRef.current) {
            const video = videoRef.current
            video.muted = false
            video.volume = newVolume
        }
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
    }
    const toggleMute = () => {
        const video = videoRef.current
        if (video) {
            if (isMuted) {
                if (volume <= 0.2) {
                    if (video.muted) {
                        video.muted = false
                    }
                    video.volume = 0.5
                    setVolume(0.5)
                } else {
                    video.volume = volume
                }
            } else {
                video.volume = 0;

            }
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className={styles.topContainer} id="inicio">
            <div className={styles.gradient}></div>
            <div className={`${styles.bannerImage} ${styles.fadeIn} ${width > 915 && showVideo ? styles.hidden : ''}`}>
                <img src={`${getBackgroundImage()}`} alt="banner" />
            </div>
            <div className={styles.overlay}>
                <div className={styles.leftSide}>
                    <h1 className={styles.tituloPrincipal}>
                        {card.title.toUpperCase()}
                    </h1>
                    {card.subtitle && (
                        <h3 className={styles.subtituloPrincipal}>{card.subtitle}</h3>
                    )}
                    <div className={styles.season}>
                        {
                            card.news &&
                            <div className={styles.newContentBox}>
                                <NewContent type={card.news} />
                            </div>
                        }
                        <Adult faixa={card.faixa} />
                        <p>{card.season.length === 1 ? `${card.season.length} Temporada` : card.season.length >= 2 && `${card.season.length} Temporadas`}</p>
                    </div>
                    <div className={styles.gen}>
                        <p>
                            {TMDBSerie ? TMDBSerie.genres.map(genre => genre.name === "Action & Adventure"
                                ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                    ? "Ficção Científica e Fantasia" : genre.name === "Thriller"
                                        ? "Suspense"
                                        : genre.name).join(', ')
                                : card.genero.join(', ')}
                        </p>
                    </div>
                    <div className={styles.description}>
                        <p>{card.description}</p>
                    </div>
                    <div className={styles.buttonSection}>
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
            {
                width > 915 &&
                <div className={`${styles.volumeControl} ${!showVideo ? styles.hidden : ''}`}>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolume}
                        className={styles.volumeSlider}
                        aria-orientation='vertical'
                    />
                    <button onClick={toggleMute} className={styles.muteButton}>
                        {isMuted || volume === 0 ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                    </button>
                </div>
            }
            {
                width > 915 &&
                <video
                    ref={videoRef}
                    src={`https://api.flixnext.com.br/content/trailer/${card.tmdbID}`}
                    controls={false}
                    autoPlay
                    muted
                    playsInline
                    className={`${styles.bannerVideo} ${showVideo ? styles.visible : ''}`}
                    onEnded={() => setShowVideo(false)}
                />
            }
        </div>
    )
}
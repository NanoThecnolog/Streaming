import { FaPlay } from "react-icons/fa6";
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
import Adult from '@/components/ui/Adult';
import { useTMDB } from '@/contexts/TMDBContext';
import NewContent from '@/components/ui/NewContent';
import { FaInfoCircle, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useFlix } from "@/contexts/FlixContext";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import { tmdb } from "@/classes/TMDB";
import { useRouter } from "next/navigation";


interface TopSerieProps {
    width: number,
    id: number
    isActive?: boolean
}
interface TMDBImageProps {
    backdrop: string | null,
    poster: string | null,
}


export default function NewTopSerie({ width, id, isActive = false }: TopSerieProps) {
    const router = useRouter()
    const { serieData } = useTMDB();
    const { series } = useFlix()
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries | null>(null)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0)
    const [card, setCard] = useState<SeriesProps | null>(null)
    const [videoOn, setVideoOn] = useState(false)

    const [TMDBImages, setTMDBImages] = useState<TMDBImageProps>({
        backdrop: null,
        poster: null
    })

    const handleTrailer = async () => {
        const timer = setTimeout(() => {
            setShowVideo(true)
        }, 3000)
        return () => clearInterval(timer)
    }

    const animateInfo = async () => {
        const interval = setTimeout(() => {
            setVideoOn(true)
        }, 3000)
        return () => clearInterval(interval)
    }

    useEffect(() => {
        setVideoOn(false)
        setShowVideo(false)
    }, [isActive])

    useEffect(() => {
        const card = series.find((card) => card.tmdbID === id)
        if (!card) return
        setCard(card)
        //debug.log("series card", card)
    }, [series, id])

    /*useEffect(() => {
        if (width > 915) handleTrailer()
    }, [card, width])*/

    useEffect(() => {
        if (!videoRef.current) return
        const video = videoRef.current

        if (isActive) {
            if (width > 915) {
                handleTrailer()
                video.play().catch(() => null)
                animateInfo()
            }

        } else {
            setShowVideo(false)
            setVideoOn(false)
            video.pause()
            video.currentTime = 0
        }
    }, [videoRef, width, isActive, card])

    useEffect(() => {
        const getImages = async () => {
            if (!card) return
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
    const handleEpisodes = (tmdbId: number) => {
        router.push(`/series/serie/${tmdbId}`)
    }

    const handleWatch = () => {
        const movie = new URLSearchParams({
            title: `${card?.title}`,
            subtitle: `${card?.subtitle}` || "",
            src: `${card?.season[0].episodes[0].src}`,
            episode: `${card?.season[0].episodes[0].ep}`,
            season: `${card?.season[0].s}`
        });
        const play: string = `/watch/serie?${movie}`
        router.push(play)
    }



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

    if (!card) return

    return (
        <div className={styles.topContainer} id="inicio">
            <div className={styles.gradient}></div>
            <div className={`${styles.bannerImage} ${styles.fadeIn} ${width > 915 && showVideo ? styles.hidden : ''}`}>
                <img src={`${getBackgroundImage()}`} alt="banner" />
            </div>
            <div className={styles.overlay}>
                <div className={`${styles.leftSide} ${videoOn ? styles.playing : ''}`}>
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
                            <FaPlay />
                            <h3>Assistir</h3>
                        </div>
                        <div className={styles.queue} onClick={() => handleEpisodes(card.tmdbID)}>
                            <FaInfoCircle />
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
                    onEnded={() => { setShowVideo(false), setVideoOn(false) }}
                    onPlay={() => animateInfo()}
                />
            }
        </div>
    )
}
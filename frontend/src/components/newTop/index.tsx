import styles from './styles.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaInfoCircle, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import Adult from '../ui/Adult';
import { useTMDB } from '@/contexts/TMDBContext';
import { useFlix } from '@/contexts/FlixContext';
import { mongoService } from '@/classes/MongoContent';
import { flixFetcher } from '@/classes/Flixclass';
import { tmdb } from '@/classes/TMDB';
import { debug } from '@/classes/DebugLogger';
import { Seasons, SeriesProps, TMDBSeries } from '@/@types/series';

type ContentType = 'movie' | 'tv'

interface BaseType {
    type: ContentType
    title: string
    subtitle: string
    description: string
    genero: string[]
    faixa: string
    overlay: string
    background: string
}
interface MovieCard extends BaseType {
    type: 'movie'
    tmdbId: number
    src: string
}
interface TVCard extends BaseType {
    type: 'tv'
    tmdbID: number
    season: Seasons[]
}
type TopCard = MovieCard | TVCard

interface TopProps {
    width: number
    id: number
    type: ContentType
    isActive?: boolean
    onVideoEnded?: () => void
    disableVideoOnFirst?: boolean
}

export default function NewTop({ width, id, isActive = false, onVideoEnded, disableVideoOnFirst, type }: TopProps) {
    const router = useRouter()
    //const { movies, setMovies } = useFlix()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0)
    const { allData, serieData } = useTMDB()
    const { movies, series } = useFlix()
    const [TMDB, setTMDB] = useState<MovieTMDB | TMDBSeries | null>(null)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    //const [card, setCard] = useState<CardsProps | null>(null)
    const [videoOn, setVideoOn] = useState(false)

    const [images, setImages] = useState<{ backdrop: string | null; poster: string | null }>({
        backdrop: null,
        poster: null
    })

    const card = useMemo<TopCard | null>(() => {
        if (type === 'movie') {
            const movie = movies.find(m => m.tmdbId === id)
            return movie ? { ...movie, type: 'movie' } : null
        }
        const serie = series.find(s => s.tmdbID === id)
        return serie ? { ...serie, type: 'tv' } : null
    }, [type, id, movies, series])

    useEffect(() => {
        setVideoOn(false)
        setShowVideo(false)
    }, [isActive])

    useEffect(() => {
        if (!videoRef.current) return
        const video = videoRef.current

        if (isActive && !disableVideoOnFirst) {
            if (width > 915) {
                const interval = setTimeout(() => {
                    setVideoOn(true)
                    setShowVideo(true)
                    video.play().catch(() => null)
                }, 3000)
                return () => clearInterval(interval)
            }
        } else {
            setShowVideo(false)
            setVideoOn(false)
            video.pause()
            video.currentTime = 0
        }

    }, [isActive, width, card, disableVideoOnFirst])



    /*useEffect(() => {
        const card = movies.find((card) => card.tmdbId === id)
        if (!card) return debug.error("card do movie nao encontrado. componente newTop")
        setCard(card)
        //debug.log("movie card", card)
    }, [movies, id])*/

    /*useEffect(() => {
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
            video.pause()
            video.currentTime = 0
        }

    }, [videoRef, width, isActive, card])*/

    useEffect(() => {
        if (!card) return

        const load = async () => {
            if (type === 'movie') {
                const cached = allData.find(d => d.id === id)
                const data = cached ?? await tmdb.fetchMovieDetails(id)
                setTMDB(data)
                setImages({
                    backdrop: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
                    poster: `https://image.tmdb.org/t/p/original${data?.poster_path}`
                })
            } else {
                const cached = serieData.find(d => d.id === id)
                const data = cached ?? await tmdb.fetchSeriesDetails(id)
                setTMDB(data)
                setImages({
                    backdrop: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
                    poster: `https://image.tmdb.org/t/p/original${data?.poster_path}`
                })
            }
        }

        load()
    }, [type, card])

    /*useEffect(() => {
        const getImages = async () => {
            if (!card) return
            const data = allData.find(data => data.id === card.tmdbId)
            if (data) {
                setTMDBMovie(data)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${data.poster_path}` })
            } else {
                const movie = await tmdb.fetchMovieDetails(card.tmdbId)
                setTMDBMovie(movie)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${movie?.poster_path}` })
            }
        }
        getImages()
    }, [allData, card])*/

    const getBackgroundImage = () => {
        if (card) {
            return width && width <= 780
                ? images.poster ?? card.overlay
                : images.backdrop ?? card.background
        }
    }

    const handleMoreInfo = () => {
        debug.log("clique recebido")
        if (!card) return
        //if (width >= 768) return
        router.push(type === 'movie'
            ? `/movie/${id}`
            : `/series/serie/${id}`
        )
    }

    /*const handleMoreInfo = () => {
        router.push(`/movie/${card?.tmdbId}`)
    }*/
    const handleWatch = () => {
        if (!card) return

        if (type === 'movie') {
            if (card.type === 'movie')
                router.push(`/watch/${card.tmdbId}`)
            return
        } else {
            if (card.type === 'tv') {
                const episode = card.season[0].episodes[0]
                const params = new URLSearchParams({
                    title: card.title,
                    subtitle: card.subtitle,
                    src: episode.src,
                    episode: String(episode.ep),
                    season: String(card.season[0].s)
                })
                router.push(`/watch/serie?${params}`)
            }
        }
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
    /*const handleClick = () => {
        if (width >= 768) return
        router.push(`/movie/${card?.tmdbId}`)
    }*/

    if (!card) return

    return (
        <>
            <div className={styles.topContainer} id="inicio" onClick={() => { width <= 780 && handleMoreInfo() }}>
                <div className={styles.gradient}></div>
                <div className={`${styles.bannerImage} ${styles.fadeIn} ${width > 915 && showVideo ? styles.hidden : ''}`}>
                    <img src={`${getBackgroundImage()}`} alt="banner" />
                </div>
                <div className={styles.overlay}>
                    <div className={`${styles.leftSide} ${videoOn ? styles.playing : ''}`}>
                        <h1 className={styles.tituloPrincipal}>
                            {card.title ?? card.title}
                        </h1>
                        {card.subtitle && (
                            <h3 className={styles.subTituloPrincipal}>{card.subtitle}</h3>
                        )}
                        <div className={styles.gen}>
                            <p>
                                {TMDB ? TMDB.genres.map(genre => genre.name === "Action & Adventure"
                                    ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                        ? "Ficção Científica e Fantasia" : genre.name === "Thriller"
                                            ? "Suspense"
                                            : genre.name).join(', ')
                                    : card.genero.join(', ')}
                            </p>
                            <Adult faixa={card.faixa} />
                        </div>
                        {type === 'tv' &&
                            <div className={styles.season}>
                                {
                                    card.type === 'tv' &&
                                    <p>
                                        {card.season.length === 1
                                            ? `${card.season.length} Temporada`
                                            : card.season.length >= 2 && `${card.season.length} Temporadas`}
                                    </p>
                                }
                            </div>

                        }
                        <div className={styles.description}>
                            <p>{card.description}</p>
                        </div>
                        <div className={styles.buttonSection}>
                            <div className={styles.watch} onClick={handleWatch}>
                                <FaPlay />
                                <h3>Assistir</h3>
                            </div>
                            <div className={styles.queue} onClick={handleMoreInfo}>
                                <FaInfoCircle />
                                <h3>Mais Informações</h3>
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
                </div>
                {
                    width > 915 && <video
                        ref={videoRef}
                        src={`https://api.flixnext.com.br/content/trailer/${id}`}
                        controls={false}
                        autoPlay
                        muted
                        playsInline
                        className={`${styles.bannerVideo} ${showVideo ? styles.visible : ''}`}
                        onEnded={() => {
                            setShowVideo(false),
                                setVideoOn(false),
                                onVideoEnded?.()
                        }}
                        disablePictureInPicture
                    //onPlay={() => animateInfo()}
                    />
                }
            </div>
        </>
    )
}
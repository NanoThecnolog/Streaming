//import { cards } from '@/data/cards'
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { UserProps } from '@/@types/user';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { getUserCookieData } from '@/services/cookieClient';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import Adult from '../ui/Adult';
import { TMDBProvider, useTMDB } from '@/contexts/TMDBContext';
import { fetchTMDBBackDrop, fetchTMDBMovie, fetchTMDBPoster } from '@/services/fetchTMDBData';
import { useFlix } from '@/contexts/FlixContext';
import { mongoService } from '@/classes/MongoContent';
import { debug } from '@/classes/DebugLogger';
import { tmdb } from '@/classes/TMDB';
import { VideoProps } from '@/@types/trailer';
import ReactPlayer from 'react-player'

interface TopProps {
    width?: number
    card: CardsProps
}

export default function NewTop({ width, card }: TopProps) {
    const router = useRouter()
    const { movies, setMovies } = useFlix()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [TMDBImages, setTMDBImages] = useState<{ backdrop: string | null; poster: string | null }>({
        backdrop: null,
        poster: null
    })
    const { allData } = useTMDB()
    const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>(null)
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const [soundEnable, setSoundEnable] = useState(false)

    useEffect(() => {
        async function getMoviesMongoData() {
            const mongoMovies = await mongoService.fetchMovieData()
            setMovies(mongoMovies)
        }
        if (movies.length === 0) getMoviesMongoData()
    }, [movies])
    useEffect(() => {
        const getImages = async () => {
            const data = allData.find(data => data.id === card.tmdbId)
            if (data) {
                setTMDBMovie(data)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${data.poster_path}` })
            } else {
                const movie = await fetchTMDBMovie(card.tmdbId)
                setTMDBMovie(movie)
                setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${movie?.poster_path}` })
            }
        }
        getImages()
    }, [allData, card])

    const getBackgroundImage = () => {
        if (card) {
            return width && width <= 780
                ? TMDBImages.poster ?? card.overlay
                : TMDBImages.backdrop ?? card.background
        }
    }

    function handleMoreInfo() {
        router.push(`/movie/${card.tmdbId}`)
    }
    function handleWatch() {
        const play: string = `/watch/${card.tmdbId}`
        router.push(play)
    }


    useEffect(() => {
        async function handleTrailer() {
            const timer = setTimeout(() => {
                setShowVideo(true)
            }, 3000)
            return () => clearInterval(timer)
        }
        handleTrailer()
    }, [card])

    const soundGain = () => {
        if (videoRef.current) {
            const video = videoRef.current
            video.muted = false
            video.volume = 0

            let currentVolume = 0
            const interval = setInterval(() => {
                if (currentVolume < 1) {
                    currentVolume += 0.05
                    video.volume = Math.min(currentVolume, 1)
                } else {
                    clearInterval(interval)
                    setSoundEnable(true)
                }
            }, 100)
        }
    }

    useEffect(() => {
        if (showVideo && buttonRef.current) {
            const button = buttonRef.current
            const volumeTimer = setTimeout(() => {
                button.click()
            }, 1000)
            return () => clearTimeout(volumeTimer)
        }
    }, [showVideo])



    return (
        <>
            <div
                className={styles.topContainer}
                //style={{ backgroundImage: `url(${getBackgroundImage()})` }}
                id="inicio"
            >
                <div className={`${styles.bannerImage} ${showVideo ? styles.hidden : ''}`}>
                    <img src={`${getBackgroundImage()}`} alt="banner" />
                    <div className={styles.overlay}>
                        <div className={styles.leftSide}>
                            <h1 className={styles.tituloPrincipal}>
                                {card.title ?? card.title}
                            </h1>
                            {card.subtitle && (
                                <h3 className={styles.subTituloPrincipal}>{card.subtitle}</h3>
                            )}
                            <div className={styles.gen}>
                                <p>
                                    {TMDBMovie ? TMDBMovie.genres.map(genre => genre.name === "Action & Adventure"
                                        ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                            ? "Ficção Científica e Fantasia" : genre.name === "Thriller"
                                                ? "Suspense"
                                                : genre.name).join(', ')
                                        : card.genero.join(', ')}
                                </p>
                                <Adult faixa={card.faixa} />
                            </div>
                            <div className={styles.description}>
                                <p>{card.description}</p>
                            </div>
                            <div className={styles.buttonSection}>
                                <div className={styles.watch} onClick={handleWatch}>
                                    <FaPlay size={35} />
                                    <h3>Assistir</h3>
                                </div>
                                <div className={styles.queue} onClick={handleMoreInfo}>
                                    <FaInfoCircle size={25} />
                                    <h3>Mais Informações</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <video
                    ref={videoRef}
                    src={'/videos/trailer/trailer.mkv'}
                    controls
                    autoPlay
                    muted={!soundEnable}
                    playsInline
                    className={`${styles.bannerVideo} ${showVideo ? styles.visible : ''}`}
                    onEnded={() => setShowVideo(false)}
                />
                <button
                    onClick={soundGain}
                    ref={buttonRef}
                ></button>
            </div>
        </>

    )
}
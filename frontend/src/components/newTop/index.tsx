import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaInfoCircle, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import Adult from '../ui/Adult';
import { useTMDB } from '@/contexts/TMDBContext';
import { fetchTMDBMovie } from '@/services/fetchTMDBData';
import { useFlix } from '@/contexts/FlixContext';
import { mongoService } from '@/classes/MongoContent';

interface TopProps {
    width: number
    card: CardsProps
}

export default function NewTop({ width, card }: TopProps) {
    const router = useRouter()
    const { movies, setMovies } = useFlix()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0)



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
        <>
            <div className={styles.topContainer} id="inicio">
                <div className={styles.gradient}></div>
                <div className={`${styles.bannerImage} ${styles.fadeIn} ${width > 915 && showVideo ? styles.hidden : ''}`}>
                    <img src={`${getBackgroundImage()}`} alt="banner" />
                </div>
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
                    {
                        width > 915 && <div className={`${styles.volumeControl} ${!showVideo ? styles.hidden : ''}`}>
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
                        src={`https://srv770983.hstgr.cloud/content/trailer/${card.tmdbId}`}
                        controls={false}
                        autoPlay
                        muted
                        playsInline
                        className={`${styles.bannerVideo} ${showVideo ? styles.visible : ''}`}
                        onEnded={() => setShowVideo(false)}
                    />
                }
            </div>
        </>
    )
}
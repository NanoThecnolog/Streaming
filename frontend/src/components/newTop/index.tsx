import {
    ChangeEvent,
    MouseEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useRouter } from 'next/router'
import {
    FaInfoCircle,
    FaPlay,
    FaVolumeMute,
    FaVolumeUp,
} from 'react-icons/fa'

import { MovieTMDB } from '@/@types/Cards'
import { Seasons, TMDBSeries } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { tmdb } from '@/classes/TMDB'
import { useFlix } from '@/contexts/FlixContext'
import { useTMDB } from '@/contexts/TMDBContext'

import Adult from '../ui/Adult'

import styles from './styles.module.scss'

type ContentType = 'movie' | 'tv'

interface BaseCard {
    type: ContentType
    title: string
    subtitle: string
    description: string
    genero: string[]
    faixa: string
    overlay: string
    background: string
}

interface MovieCard extends BaseCard {
    type: 'movie'
    tmdbId: number
    src: string
}

interface TVCard extends BaseCard {
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

interface ContentImages {
    backdrop: string | null
    poster: string | null
}

const DESKTOP_BREAKPOINT = 915
const MOBILE_BREAKPOINT = 780

const NewTop = ({
    width,
    id,
    type,
    isActive = false,
    onVideoEnded,
    disableVideoOnFirst = false,
}: TopProps) => {
    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const { allData, serieData } = useTMDB()
    const { movies, series } = useFlix()

    const [tmdbData, setTmdbData] = useState<
        MovieTMDB | TMDBSeries | null
    >(null)

    const [images, setImages] = useState<ContentImages>({
        backdrop: null,
        poster: null,
    })

    const [showVideo, setShowVideo] = useState(false)
    const [videoFailed, setVideoFailed] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0.5)

    const isMobile = width <= MOBILE_BREAKPOINT
    const isDesktop = width > DESKTOP_BREAKPOINT

    const card = useMemo<TopCard | null>(() => {
        if (type === 'movie') {
            const movie = movies.find((item) => item.tmdbId === id)

            return movie
                ? {
                    ...movie,
                    type: 'movie',
                }
                : null
        }

        const serie = series.find((item) => item.tmdbID === id)

        return serie
            ? {
                ...serie,
                type: 'tv',
            }
            : null
    }, [id, movies, series, type])

    const backgroundImage = useMemo(() => {
        if (!card) return ''

        if (isMobile) {
            return images.poster || card.overlay || card.background
        }

        return images.backdrop || card.background || card.overlay
    }, [card, images, isMobile])

    const genres = useMemo(() => {
        const translations: Record<string, string> = {
            'Action & Adventure': 'Ação e Aventura',
            'Sci-Fi & Fantasy': 'Ficção Científica e Fantasia',
            Thriller: 'Suspense',
        }

        if (tmdbData?.genres?.length) {
            return tmdbData.genres
                .map((genre) => translations[genre.name] ?? genre.name)
                .join(' • ')
        }

        return card?.genero.join(' • ') ?? ''
    }, [card, tmdbData])

    const seasonsLabel = useMemo(() => {
        if (!card || card.type !== 'tv') return null

        const amount = card.season.length

        return `${amount} ${amount === 1 ? 'temporada' : 'temporadas'}`
    }, [card])

    const stopVideo = (reset = true) => {
        const video = videoRef.current

        setShowVideo(false)

        if (!video) return

        video.pause()

        if (reset) {
            video.currentTime = 0
        }
    }

    const playVideo = async () => {
        const video = videoRef.current

        if (!video || videoFailed) return

        video.muted = isMuted
        video.volume = isMuted ? 0 : volume

        try {
            await video.play()
            setShowVideo(true)
        } catch (error) {
            debug.log('Não foi possível reproduzir o trailer:', error)
            setShowVideo(false)
        }
    }

    useEffect(() => {
        setVideoFailed(false)
        setShowVideo(false)
    }, [id])

    useEffect(() => {
        if (!isActive || disableVideoOnFirst || videoFailed) {
            stopVideo()

            return
        }

        const delay = isDesktop ? 3000 : 1200

        const timeout = window.setTimeout(() => {
            playVideo()
        }, delay)

        return () => {
            window.clearTimeout(timeout)
            stopVideo()
        }
    }, [
        disableVideoOnFirst,
        id,
        isActive,
        isDesktop,
        videoFailed,
    ])

    useEffect(() => {
        if (!card) return

        let isMounted = true

        const createTmdbImage = (
            path: string | null | undefined,
        ): string | null => {
            if (!path) return null

            return `https://image.tmdb.org/t/p/original${path}`
        }

        const loadTmdbData = async () => {
            try {
                if (type === 'movie') {
                    const cachedData = allData.find(
                        (item) => item.id === id,
                    )

                    const data =
                        cachedData ??
                        await tmdb.fetchMovieDetails(id)

                    if (!isMounted || !data) return

                    setTmdbData(data)
                    setImages({
                        backdrop: createTmdbImage(data.backdrop_path),
                        poster: createTmdbImage(data.poster_path),
                    })

                    return
                }

                const cachedData = serieData.find(
                    (item) => item.id === id,
                )

                const data =
                    cachedData ??
                    await tmdb.fetchSeriesDetails(id)

                if (!isMounted || !data) return

                setTmdbData(data)
                setImages({
                    backdrop: createTmdbImage(data.backdrop_path),
                    poster: createTmdbImage(data.poster_path),
                })
            } catch (error) {
                debug.log('Erro ao carregar dados do destaque:', error)
            }
        }

        loadTmdbData()

        return () => {
            isMounted = false
        }
    }, [allData, card, id, serieData, type])

    const handleMoreInfo = () => {
        if (!card) return

        router.push(
            type === 'movie'
                ? `/movie/${id}`
                : `/series/serie/${id}`,
        )
    }

    const handleWatch = () => {
        if (!card) return

        if (card.type === 'movie') {
            router.push(`/watch/${card.tmdbId}`)

            return
        }

        const firstSeason = card.season[0]
        const firstEpisode = firstSeason?.episodes[0]

        if (!firstSeason || !firstEpisode) return

        const params = new URLSearchParams({
            title: card.title,
            subtitle: card.subtitle ?? '',
            src: firstEpisode.src,
            episode: String(firstEpisode.ep),
            season: String(firstSeason.s),
            tmdbID: String(card.tmdbID),
        })

        router.push(`/watch/serie?${params.toString()}`)
    }

    const handleActionClick = (
        event: MouseEvent<HTMLButtonElement>,
        action: () => void,
    ) => {
        event.stopPropagation()
        action()
    }

    const handleVolume = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const nextVolume = Number(event.target.value)
        const video = videoRef.current

        setVolume(nextVolume)
        setIsMuted(nextVolume === 0)

        if (!video) return

        video.volume = nextVolume
        video.muted = nextVolume === 0
    }

    const toggleMute = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation()

        const video = videoRef.current
        const nextMutedState = !isMuted

        setIsMuted(nextMutedState)

        if (!video) return

        video.muted = nextMutedState
        video.volume = nextMutedState ? 0 : volume
    }

    const handleVideoEnded = () => {
        stopVideo(false)
        onVideoEnded?.()
    }

    const handleVideoError = () => {
        setVideoFailed(true)
        stopVideo()
    }

    if (!card) return null

    return (
        <article
            id={`top-${type}-${id}`}
            className={styles.topContainer}
            aria-label={`Destaque: ${card.title}`}
            onClick={() => {
                if (isMobile) {
                    handleMoreInfo()
                }
            }}
        >
            <div
                className={`${styles.bannerImage} ${showVideo ? styles.hidden : ''
                    }`}
                aria-hidden="true"
            >
                <img
                    src={backgroundImage}
                    alt=""
                    loading={isActive ? 'eager' : 'lazy'}
                />
            </div>

            <video
                ref={videoRef}
                className={`${styles.bannerVideo} ${showVideo ? styles.visible : ''
                    }`}
                src={`https://api.flixnext.com.br/content/trailer/${id}`}
                poster={backgroundImage}
                preload={isActive ? 'metadata' : 'none'}
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden="true"
                onEnded={handleVideoEnded}
                onError={handleVideoError}
            />

            <div
                className={styles.imageShade}
                aria-hidden="true"
            />

            <div
                className={styles.bottomGradient}
                aria-hidden="true"
            />

            <div className={styles.content}>
                <div
                    className={`${styles.information} ${showVideo ? styles.playing : ''
                        }`}
                >
                    <span className={styles.featuredLabel}>
                        Destaque FlixNext
                    </span>

                    <h2 className={styles.title}>
                        {card.title}
                    </h2>

                    {card.subtitle && (
                        <p className={styles.subtitle}>
                            {card.subtitle}
                        </p>
                    )}

                    <div className={styles.metadata}>
                        {seasonsLabel && (
                            <span>{seasonsLabel}</span>
                        )}

                        {genres && (
                            <span className={styles.genres}>
                                {genres}
                            </span>
                        )}

                        <Adult faixa={card.faixa} />
                    </div>

                    <p className={styles.description}>
                        {card.description}
                    </p>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.watchButton}
                            onClick={(event) => {
                                handleActionClick(event, handleWatch)
                            }}
                        >
                            <FaPlay aria-hidden="true" />
                            Assistir
                        </button>

                        <button
                            type="button"
                            className={styles.infoButton}
                            onClick={(event) => {
                                handleActionClick(
                                    event,
                                    handleMoreInfo,
                                )
                            }}
                        >
                            <FaInfoCircle aria-hidden="true" />
                            Mais informações
                        </button>
                    </div>
                </div>

                {showVideo && (
                    <div
                        className={styles.volumeControl}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <label
                            className={styles.visuallyHidden}
                            htmlFor={`volume-${type}-${id}`}
                        >
                            Volume do trailer
                        </label>

                        <input
                            id={`volume-${type}-${id}`}
                            className={styles.volumeSlider}
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolume}
                        />

                        <button
                            type="button"
                            className={styles.muteButton}
                            aria-label={
                                isMuted
                                    ? 'Ativar som do trailer'
                                    : 'Silenciar trailer'
                            }
                            onClick={toggleMute}
                        >
                            {isMuted ? (
                                <FaVolumeMute aria-hidden="true" />
                            ) : (
                                <FaVolumeUp aria-hidden="true" />
                            )}
                        </button>
                    </div>
                )}
            </div>
        </article>
    )
}

export default NewTop








/*import styles from './styles.module.scss'
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
}*/
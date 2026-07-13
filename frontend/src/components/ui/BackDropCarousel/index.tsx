import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrackingParsed } from '@/@types/watchedResponse'
import { calculateVideoProgress, uniqueKey } from '@/utils/UtilitiesFunctions'
import { useTMDB } from '@/contexts/TMDBContext'
import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series'
import Link from 'next/link'
import { backdropBreakPoints } from '@/utils/Variaveis'
import { useFlix } from '@/contexts/FlixContext'
import { debug } from '@/classes/DebugLogger'
import { tmdb } from '@/classes/TMDB'
import { ProgressResponse } from '@/@types/watchedProgress'

interface BaseProps {
    title: string
    //cardPerContainer: number
}

interface WatchedRes {
    count: number,
    result: TrackingParsed[]
}
type MapTrackingProps = {
    name: string;
    id: string;
    type: "movie";
    season?: undefined;
    episode?: undefined;
} | {
    name: string;
    id: string;
    season?: number | undefined;
    episode?: number | undefined;
    type: "tv";
}



interface CarouselCard {
    card: MovieTMDB | TMDBSeries
    tracking: MapTrackingProps
    progress: number | null
    percentage: number
}




export default function BackDropCarousel({ title /*cardPerContainer*/ }: BaseProps) {
    //const [cards, setCards] = useState<(MovieTMDB | TMDBSeries | undefined)[]>([])
    const { allData, serieData } = useTMDB()
    const { user } = useFlix()
    const [cardPerContainer, setCardPerContainer] = useState(0)
    const [trackingList, setTrackingList] = useState<MapTrackingProps[]>([])

    const [baseCards, setBaseCards] = useState<CarouselCard[]>([])
    const [cards, setCards] = useState<CarouselCard[]>([])

    const typeGuard = (card: MovieTMDB | TMDBSeries): card is TMDBSeries => {
        return 'seasons' in card
    }

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            const { cards } = backdropBreakPoints.find(b => windowWidth < b.width) || { cards: 5 }
            setCardPerContainer(cards)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!user) {
            setTrackingList([])
            return
        }

        const controller = new AbortController()

        const fetchWatched = async () => {
            try {
                const { data } = await axios.get<WatchedRes>('/api/user/watched', {
                    signal: controller.signal
                })
                const parsedTracking: MapTrackingProps[] = data.result.map(item => {
                    if (item.type === 'movie') {
                        return {
                            name: item.name,
                            id: item.tmdbID,
                            type: 'movie'
                        }
                    }

                    return {
                        name: item.name,
                        id: item.tmdbID,
                        season: item.season,
                        episode: item.episode,
                        type: 'tv'
                    }
                })
                setTrackingList(parsedTracking)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    debug.error('Erro ao buscar histórico assistido', err)
                }
            }
        }

        /*const fetchProgress = async (
            tracking: MapTrackingProps
        ): Promise<number | null> => {
            try {
                const { data } = await axios.get<ProgressResponse>(
                    '/api/watched/progress',
                    {
                        params: {
                            tmdbID: tracking.id,
                        },
                        signal: controller.signal
                    }
                )
                debug.log("resultado do tracking de progresso", data.result)

                const progressEntry = data.result?.find(item => {
                    if (item.tmdbID !== Number(tracking.id) || item.mediaType !== tracking.type) return false
                    if (tracking.type === 'movie') return true

                    return (
                        item.season === tracking.season &&
                        item.episode === tracking.episode
                    )

                })

                debug.log(
                    'Progresso correspondente ao tracking',
                    progressEntry
                )

                return progressEntry?.progress ?? null
            } catch (err) {
                if (axios.isCancel(err))
                    throw err

                debug.error(
                    `Erro ao buscar progresso do conteúdo ${tracking.id}`,
                    err
                )

                return null
            }
        }

        const fetchWatched = async () => {
            try {
                const { data } = await axios.get<WatchedRes>(
                    '/api/user/watched',
                    {
                        signal: controller.signal
                    }
                )

                const trackingList: MapTrackingProps[] = data.result.map(item => {
                    if (item.type === 'movie') {
                        return {
                            name: item.name,
                            id: item.tmdbID,
                            type: 'movie'
                        }
                    }

                    return {
                        name: item.name,
                        id: item.tmdbID,
                        season: item.season,
                        episode: item.episode,
                        type: 'tv'
                    }
                })

                const movieMap = new Map(
                    allData.map(movie => [movie.id, movie])
                )

                const serieMap = new Map(
                    serieData.map(serie => [serie.id, serie])
                )

                const availableCards = trackingList
                    .map(tracking => {
                        const card = tracking.type === 'movie'
                            ? movieMap.get(Number(tracking.id))
                            : serieMap.get(Number(tracking.id))

                        if (!card)
                            return null

                        return {
                            card,
                            tracking
                        }
                    })
                    .filter(
                        (
                            item
                        ): item is {
                            card: MovieTMDB | TMDBSeries
                            tracking: MapTrackingProps
                        } => item !== null
                    )
                    .slice(0, 12)

                const getRuntime = async (item: {
                    card: MovieTMDB | TMDBSeries
                    tracking: MapTrackingProps
                }): Promise<number | null> => {
                    if (
                        item.tracking.type === 'tv' &&
                        item.tracking.season !== undefined &&
                        item.tracking.episode !== undefined
                    ) {
                        const episodes = await tmdb.fetchEpisodeData(
                            item.card.id,
                            item.tracking.season
                        )

                        const episode = episodes?.find(
                            episode =>
                                episode.episode_number === item.tracking.episode
                        )

                        return episode?.runtime ?? null
                    }

                    if ('runtime' in item.card)
                        return item.card.runtime ?? null

                    return null
                }

                const cardsWithProgress = await Promise.all(
                    availableCards.map(async item => {
                        const progress = await fetchProgress(item.tracking)
                        const runtime = await getRuntime(item)

                        return {
                            ...item,
                            progress,
                            percentage: runtime
                                ? calculateVideoProgress(progress ?? 0, runtime)
                                : 25
                        }
                    })
                )

                if (controller.signal.aborted)
                    return

                debug.log("cards com progresso", cardsWithProgress)

                setCards(cardsWithProgress)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    debug.error(
                        'Erro ao buscar filmes e séries vistos',
                        err
                    )
                }
            }
        }*/

        void fetchWatched()

        return () => {
            controller.abort()
        }
    }, [user])

    useEffect(() => {
        if (trackingList.length === 0) {
            setBaseCards([])
            setCards([])
            return
        }
        const movieMap = new Map(
            allData.map(movie => [movie.id, movie])
        )

        const serieMap = new Map(
            serieData.map(serie => [serie.id, serie])
        )

        const availableCards: CarouselCard[] = trackingList
            .map((tracking): CarouselCard | null => {
                const card = tracking.type === 'movie'
                    ? movieMap.get(Number(tracking.id))
                    : serieMap.get(Number(tracking.id))

                if (!card) return null

                return {
                    card,
                    tracking,
                    progress: null,
                    percentage: 0
                }
            })
            .filter((item): item is CarouselCard => item !== null)
            .slice(0, 12)

        setBaseCards(availableCards)
        setCards(availableCards)
    }, [trackingList, allData, serieData])


    useEffect(() => {
        if (baseCards.length === 0) return

        const controller = new AbortController()

        const progressRequestCache = new Map<
            string,
            Promise<ProgressResponse>
        >()

        const episodeRequestCache = new Map<
            string,
            ReturnType<typeof tmdb.fetchEpisodeData>
        >()

        const fetchProgress = async (
            tracking: MapTrackingProps
        ): Promise<number | null> => {
            try {
                const { data } = await axios.get<ProgressResponse>(
                    '/api/watched/progress',
                    {
                        params: {
                            tmdbID: tracking.id
                        },
                        signal: controller.signal
                    }
                )

                const progressEntry = data.result?.find(item => {
                    if (
                        item.tmdbID !== Number(tracking.id) ||
                        item.mediaType !== tracking.type
                    ) {
                        return false
                    }

                    if (tracking.type === 'movie') {
                        return true
                    }

                    return (
                        item.season === tracking.season &&
                        item.episode === tracking.episode
                    )
                })

                return progressEntry?.progress ?? null
            } catch (error) {
                if (!axios.isCancel(error)) {
                    debug.error(
                        `Erro ao buscar progresso de ${tracking.id}`,
                        error
                    )
                }

                return null
            }
        }

        const getRuntime = async (
            item: CarouselCard
        ): Promise<number | null> => {
            if (item.tracking.type === 'movie') {
                return 'runtime' in item.card
                    ? item.card.runtime ?? null
                    : null
            }

            if (
                item.tracking.season === undefined ||
                item.tracking.episode === undefined
            ) {
                return null
            }

            const episodes = await tmdb.fetchEpisodeData(
                item.card.id,
                item.tracking.season
            )

            const episode = episodes?.find(
                episode =>
                    episode.episode_number === item.tracking.episode
            )

            return episode?.runtime ?? null
        }

        const loadProgress = async () => {
            const results = await Promise.allSettled(
                baseCards.map(async item => {
                    const [progress, runtime] = await Promise.all([
                        fetchProgress(item.tracking),
                        getRuntime(item)
                    ])

                    return {
                        ...item,
                        progress,
                        percentage: runtime
                            ? calculateVideoProgress(progress ?? 0, runtime)
                            : 0
                    }
                })
            )

            if (controller.signal.aborted) return

            const updatedCards = results.map((result, index) => {
                if (result.status === 'fulfilled') {
                    return result.value
                }

                return baseCards[index]
            })

            setCards(updatedCards)
        }

        void loadProgress()

        return () => controller.abort()
    }, [baseCards])


    if (!cards || cards.length === 0) return null

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.contentTitle}>{title.toUpperCase()}</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={8}
                slidesPerView={cardPerContainer}
                loop={false}
                className={styles.carousel}
            >
                {cards.map(({ card, tracking, progress, percentage }) => {
                    if (!card) return
                    if (typeGuard(card)) {
                        return <SwiperSlide key={`tv-${card.id}`} className={styles.slide}>

                            <div className={styles.cardWrapper}>
                                <Link
                                    href={`/series/serie/${card.id}`}
                                    className={styles.link}
                                >
                                    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
                                    <div className={styles.info}>
                                        <div className={styles.textContent}>
                                            <h3 className={styles.title}>
                                                {card.name}
                                            </h3>
                                            <p className={styles.metadata}>
                                                <span>Temporada {tracking.season}</span>
                                                <span className={styles.separator}>•</span>
                                                <span>Episódio {tracking.episode}</span>
                                            </p>
                                        </div>
                                        {/*<h3 className={styles.title}>{card.name}</h3>
                                        <div className={styles.season}>
                                            <p>Temporada {tracking.season} - Episódio {tracking.episode}</p>
                                        </div>*/}

                                    </div>
                                    <div className={styles.progress}>
                                        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={`movie-${card.id}`} className={styles.slide}>

                            <div className={styles.cardWrapper}>
                                <Link
                                    href={`/movie/${card.id}`}
                                    className={styles.link}
                                >
                                    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.title} />

                                    <div className={styles.info}>
                                        <div className={styles.textContent}>
                                            <h3 className={styles.title}>
                                                {card.title}
                                            </h3>

                                            <p className={styles.metadata}>
                                                <span>Filme</span>

                                                {
                                                    percentage > 4 &&
                                                    <>
                                                        <span className={styles.separator}>•</span>
                                                        <span>{percentage}% assistido</span>
                                                    </>
                                                }
                                            </p>
                                        </div>

                                        {
                                            //<h3 className={styles.title}>{card.title}</h3>
                                        }
                                    </div>
                                    <div className={styles.progress} style={{ width: `${percentage > 4 ? 100 : 0}%` }}>
                                        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
                                    </div>
                                </Link>

                            </div>
                        </SwiperSlide>
                    }
                })}
            </Swiper>
        </div>
    )
}
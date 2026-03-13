import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TrackingParsed } from '@/@types/watchedResponse'
import { uniqueKey } from '@/utils/UtilitiesFunctions'
import { useTMDB } from '@/contexts/TMDBContext'
import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series'
import Link from 'next/link'
import { backdropBreakPoints } from '@/utils/Variaveis'

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
    season: number | undefined;
    episode: number | undefined;
    type: "tv";
}


export default function BackDropCarousel({ title /*cardPerContainer*/ }: BaseProps) {
    const [cards, setCards] = useState<(MovieTMDB | TMDBSeries | undefined)[]>([])
    const { allData, serieData } = useTMDB()
    const [cardPerContainer, setCardPerContainer] = useState(0)
    const [tracking, setTracking] = useState<MapTrackingProps[]>([])

    //agora só preciso estilizar o card e ajustar breakpoints e responsividade

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
        const teste = async () => {
            const response = await axios.get<WatchedRes>('/api/user/watched')
            const data = response.data
            //console.log("resultado da req", data)
            const idMap: MapTrackingProps[] = data.result.map(item => {
                if (item.type === 'movie')
                    return {
                        name: item.name,
                        id: item.tmdbID,
                        type: item.type
                    }

                return {
                    name: item.name,
                    id: item.tmdbID,
                    season: item.season,
                    episode: item.episode,
                    type: item.type
                }
            })
            setTracking(idMap)
            //console.log("ids mapeados", idMap)
            const tmdbObjects = idMap.map(i => {
                if (i.type === 'movie') return allData.find(data => Number(i.id) === data.id)
                return serieData.find(data => Number(i.id) === data.id)
            }).slice(0, 7)
            console.log("dados do TMDB", tmdbObjects)
            setCards(tmdbObjects)
        }
        teste()
    }, [allData, serieData])

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
                {cards.map((card, index) => {
                    if (!card) return
                    if (typeGuard(card)) {
                        return <SwiperSlide key={index} className={styles.slide}>


                            <div className={styles.cardWrapper}>
                                <Link
                                    href={`/series/serie/${card.id}`}
                                    className={styles.link}
                                >
                                    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
                                    <div className={styles.info}>
                                        <h3 className={styles.title}>{card.name}</h3>
                                        {
                                            tracking.map(item => Number(item.id) === card.id ?
                                                <p className={styles.season} key={item.id}>
                                                    Temporada {item.season}
                                                    Episódio {item.episode}
                                                </p>
                                                : null)
                                        }
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={index} className={styles.slide}>

                            <div className={styles.cardWrapper}>
                                <Link
                                    href={`/movie/${card.id}`}
                                    className={styles.link}
                                >
                                    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.title} />

                                    <div className={styles.info}>
                                        <h3 className={styles.title}>{card.title}</h3>
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
import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import SEO from '@/components/SEO';
import { useFlix } from '@/contexts/FlixContext';
import { parseCookies } from 'nookies';
import { WatchLaterContext } from '@/@types/contexts/flixContext';
import { CardsProps } from '@/@types/Cards';
import { SeriesProps } from '@/@types/series';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { mongoService } from '@/classes/MongoContent';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { debug } from '@/classes/DebugLogger';

interface ListsProps {
    movies: CardsProps[]
    series: SeriesProps[]
}

export default function WatchLater() {
    const { 'flix-watch': watchCookies } = parseCookies()
    const [watchListIds, setWatchListIds] = useState<WatchLaterContext[]>()
    const [list, setList] = useState<ListsProps | null>(null)
    const { movies, series, setMovies, setSeries } = useFlix()
    const [cardPerContainer, setCardPerContainer] = useState(10)

    useEffect(() => {
        async function getMongoData() {
            const [movies, series] = await Promise.all([
                mongoService.fetchMovieData(),
                mongoService.fetchSerieData()
            ])
            setMovies(movies)
            setSeries(series)
        }
        if (movies.length === 0 || series.length === 0) getMongoData()
    }, [movies, series])


    useEffect(() => {
        if (watchCookies) setWatchListIds(JSON.parse(watchCookies))
    }, [watchCookies])

    useEffect(() => {
        if (!watchListIds) return
        //debug.log('watchListIds no useEffect', watchListIds)
        if (list && list.movies.length > 0 && list.series.length > 0) return
        const tmdbidSet = [...new Set(watchListIds.map(item => item.tmdbid))]
        //debug.log("set", tmdbidSet)

        const filteredList = <T extends Record<string, any>>(arr: T[], key: keyof T) => {
            return arr.filter(item => tmdbidSet.some(set => set === item[key]))
        }

        const movie = filteredList(movies, "tmdbId")
        const serie = filteredList(series, "tmdbID")
        setList({
            movies: movie,
            series: serie
        })

    }, [watchListIds])
    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            const breakpoints = [
                { width: 560, cards: 2 },
                { width: 780, cards: 3 },
                { width: 915, cards: 4 },
                { width: 1160, cards: 5 },
                { width: 1500, cards: 6 },
                { width: 1855, cards: 7 },
                { width: Infinity, cards: 8 },
            ]
            const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 5 }
            setCardPerContainer(cards)
            //debug.log(cards)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <>
            <SEO title='Minha Lista - FlixNext' description='A lista dos filmes para assistir mais tarde' />
            <Header />
            <main className={styles.mainContainer}>
                <article className={styles.articleContainer}>
                    <div>
                        <h1>Minha Lista</h1>
                    </div>
                    <div className={styles.listContainer}>
                        <h2>Filmes</h2>
                        <div className={styles.cardsContainer}>
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={cardPerContainer}
                                loop={true}
                                //onSwiper={handleSwiper}
                                className={styles.carousel}
                            >
                                {
                                    list?.movies.map(item =>
                                        <SwiperSlide key={item.tmdbId}>
                                            <Card card={item} key={item.tmdbId} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                        <h2>Séries</h2>
                        <div className={styles.cardsContainer}>
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={cardPerContainer}
                                loop={true}
                                //onSwiper={handleSwiper}
                                className={styles.carousel}
                            >
                                {
                                    list?.series.map(item =>
                                        <SwiperSlide key={item.tmdbID} className={styles.item}>
                                            <Card card={item} key={item.tmdbID} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    )
}
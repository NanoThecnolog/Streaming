import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from 'react';
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

    const [watchListIds, setWatchListIds] = useState<WatchLaterContext[]>([])
    //const [list, setList] = useState<ListsProps | null>(null)
    const { movies, series, setMovies, setSeries } = useFlix()
    const [cardPerContainer, setCardPerContainer] = useState(10)

    useEffect(() => {
        const getMongoData = async () => {
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

    const watchLaterList = useMemo(() => {
        if (!watchListIds.length) {
            return { movies: [], series: [] }
        }
        const tmdbIdSet = new Set(watchListIds?.map(i => i.tmdbid))

        return {
            movies: movies.filter(m => tmdbIdSet.has(m.tmdbId)),
            series: series.filter(s => tmdbIdSet.has(s.tmdbID))
        }
    }, [watchListIds, movies, series])

    /*useEffect(() => {
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

    }, [watchListIds])*/

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
            <SEO title='Minha Lista - FlixNext' description='Filmes e séries para assistir mais tarde' />
            <Header />
            <main className={styles.mainContainer}>
                <article className={styles.articleContainer}>
                    <h1>Minha Lista</h1>

                    <section className={styles.listContainer}>
                        <h2>Filmes</h2>

                        <div className={styles.cardsContainer}>
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={cardPerContainer}
                                loop={watchLaterList.movies.length > cardPerContainer}
                                className={styles.carousel}
                            >
                                {watchLaterList.movies.map(movie => (
                                    <SwiperSlide key={movie.tmdbId}>
                                        <Card card={movie} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <h2>Séries</h2>

                        <div className={styles.cardsContainer}>
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={cardPerContainer}
                                loop={watchLaterList.series.length > cardPerContainer}
                                className={styles.carousel}
                            >
                                {watchLaterList.series.map(serie => (
                                    <SwiperSlide key={serie.tmdbID}>
                                        <Card card={serie} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    )
}
import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/SEO';
import { useFlix } from '@/contexts/FlixContext';
import { parseCookies } from 'nookies';
import { WatchLaterContext } from '@/@types/contexts/flixContext';
//import { cards } from '@/data/cards';
//import { series } from '@/data/series';
import { CardsProps } from '@/@types/Cards';
import { SeriesProps } from '@/@types/series';
import Card from '@/components/Card';
import CardSerie from "@/components/seriesComponents/Card";
import Footer from '@/components/Footer';
import { mongoService } from '@/classes/MongoContent';

interface ListsProps {
    movies: CardsProps[]
    series: SeriesProps[]
}

export default function WatchLater() {
    const { 'flix-watch': watchCookies } = parseCookies()
    const [watchListIds, setWatchListIds] = useState<WatchLaterContext[]>()
    const [list, setList] = useState<ListsProps>()
    const { movies, series, setMovies, setSeries } = useFlix()

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

        const filteredList = <T extends Record<string, any>>(arr: T[], key: keyof T) => {
            return arr.filter(item => watchListIds.some(w => w.id === item[key]))
        }

        const movie = filteredList(movies, "tmdbId")
        const serie = filteredList(series, "tmdbID")
        setList({
            movies: movie,
            series: serie
        })

    }, [watchListIds])
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
                            {
                                list?.movies.map(item => <Card card={item} key={item.tmdbId} />)
                            }
                        </div>
                        <h2>Séries</h2>
                        <div className={styles.cardsContainer}>
                            {
                                list?.series.map(item => <CardSerie card={item} key={item.tmdbID} />)
                            }
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    )
}
//import { cards } from '@/data/cards'
//import { series } from '@/data/series'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import { useEffect } from 'react'
import { useFlix } from '@/contexts/FlixContext'
import { mongoService } from '@/classes/MongoContent'

export default function Catalogo() {
    const router = useRouter()
    const { movies, series, setMovies, setSeries } = useFlix()
    useEffect(() => {
        async function fetchMongoDB() {
            const [mongoMovies, mongoSeries] = await Promise.all([
                mongoService.fetchMovieData(),
                mongoService.fetchSerieData()
            ])
            setMovies(mongoMovies)
            setSeries(mongoSeries)
        }
        if (movies.length === 0 || series.length === 0) fetchMongoDB()
    }, [])
    return (
        <>
            <SEO title='Catálogo | FlixNext' description='Catálogo com mais de 200 títulos para todos os gostos. Veja os conteúdos disponíveis na plataforma' />
            <Header />
            <main className={styles.container}>
                <div>
                    <h1>Filmes - {movies.length}</h1>
                    <div className={styles.contentContainer}>
                        {movies.length > 0 &&
                            [...movies].sort((a, b) => a.title.localeCompare(b.title)).map(card => (
                                <div key={card.tmdbId} onClick={() => router.push(`/movie/${card.tmdbId}`)}>
                                    <h4>{card.title} {card.subtitle && ` - ${card.subtitle}`}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1>Séries - {series.length}</h1>
                    <div className={styles.contentContainer}>
                        {series.length > 0 &&
                            [...series].sort((a, b) => a.title.localeCompare(b.title)).map(serie => (
                                <div key={serie.tmdbID} onClick={() => router.push(`/series/serie/${serie.tmdbID}`)}>
                                    <h4>{serie.title} {serie.subtitle && `- ${serie.subtitle}`}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
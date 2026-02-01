import { CardsProps, MovieTMDB } from '@/@types/Cards'
import BaseCarousel from '../ui/BaseCarousel'
import { useEffect, useState } from 'react'
import { useTMDB } from '@/contexts/TMDBContext'
import { useFlix } from '@/contexts/FlixContext'

interface TopPopularProps {
    cardPerContainer: number
}

export default function TopPopularMovies({ cardPerContainer }: TopPopularProps) {
    const { allData } = useTMDB()
    const { movies } = useFlix()
    const [trendMovies, setTrendMovies] = useState<CardsProps[]>([])

    useEffect(() => {
        if (trendMovies.length === 0) {
            const mapMoviesDB = new Map<number, CardsProps>()
            const sorted = [...allData].sort((a, b) => b.popularity - a.popularity)

            for (const card of sorted) {
                const movie = movies.find(m => m.tmdbId === card.id)
                if (movie && !mapMoviesDB.has(movie.tmdbId)) {
                    mapMoviesDB.set(movie.tmdbId, movie)
                }
                if (mapMoviesDB.size === 10) break
            }
            setTrendMovies(Array.from(mapMoviesDB.values()))
        }

    }, [movies, allData])

    if (!allData || allData.length === 0) return null

    return (
        <>
            {
                trendMovies.length > 0 && <BaseCarousel title='TOP10 Filmes para assistir' cardPerContainer={cardPerContainer} cards={trendMovies} />
            }
        </>
    )
}
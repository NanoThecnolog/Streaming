import { CardsProps, MovieTMDB } from '@/@types/Cards'
import BaseCarousel from '../ui/BaseCarousel'
import { useEffect, useState } from 'react'

interface TopPopularProps {
    cardPerContainer: number
    cards: MovieTMDB[],
    moviesDB: CardsProps[]
}

export default function TopPopularMovies({ cardPerContainer, cards, moviesDB }: TopPopularProps) {
    const [movies, setMovies] = useState<CardsProps[]>([])

    useEffect(() => {
        if (movies.length === 0) {
            const mapMoviesDB = new Map<number, CardsProps>()
            const sorted = [...cards].sort((a, b) => b.popularity - a.popularity)

            for (const card of sorted) {
                const movie = moviesDB.find(m => m.tmdbId === card.id)
                if (movie && !mapMoviesDB.has(movie.tmdbId)) {
                    mapMoviesDB.set(movie.tmdbId, movie)
                }
                if (mapMoviesDB.size === 10) break
            }
            setMovies(Array.from(mapMoviesDB.values()))
        }

    }, [cards, moviesDB])

    if (!cards || cards.length === 0) return null


    return (
        <>
            {
                movies.length > 0 && <BaseCarousel title='TOP10 Filmes para assistir' cardPerContainer={cardPerContainer} cards={movies} />
            }
        </>
    )
}
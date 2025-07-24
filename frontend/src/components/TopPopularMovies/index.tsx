import { CardsProps, MovieTMDB } from '@/@types/Cards'
import BaseCarousel from '../ui/BaseCarousel'
import { debug } from '@/classes/DebugLogger'
import { useEffect, useState } from 'react'

interface TopPopularProps {
    cardPerContainer: number
    cards: MovieTMDB[],
    moviesDB: CardsProps[]
}

export default function TopPopularMovies({ cardPerContainer, cards, moviesDB }: TopPopularProps) {
    const [movies, setMovies] = useState<CardsProps[]>([])


    useEffect(() => {
        const mapMoviesDB = new Map(moviesDB.map(item => [item.tmdbId, item]))
        const cardsPerPopularity = cards.sort((a, b) => b.popularity - a.popularity)
        const carouselMovies: CardsProps[] = cardsPerPopularity
            .map(card => mapMoviesDB.get(card.id))
            .filter((item): item is CardsProps => item !== undefined)
            .slice(0, 10)

        setMovies(carouselMovies)
    }, [cards, moviesDB])

    if (movies.length === 0) return


    return (
        <>
            {
                movies.length > 0 && <BaseCarousel title='TOP10 Filmes para assistir' cardPerContainer={cardPerContainer} cards={movies} />
            }
        </>
    )
}
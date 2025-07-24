import { CardsProps, MovieTMDB } from '@/@types/Cards'
import BaseCarousel from '../ui/BaseCarousel'
import { debug } from '@/classes/DebugLogger'

interface TopPopularProps {
    cardPerContainer: number
    cards: MovieTMDB[],
    moviesDB: CardsProps[]
}

export default function TopPopularMovies({ cardPerContainer, cards, moviesDB }: TopPopularProps) {
    const mapMoviesDB = new Map(moviesDB.map(item => [item.tmdbId, item]))
    const cardsPerPopularity = cards.sort((a, b) => b.popularity - a.popularity)
    const carouselMovies: CardsProps[] = cardsPerPopularity
        .map(card => mapMoviesDB.get(card.id))
        .filter((item): item is CardsProps => item !== undefined)
        .slice(0, 10)

    return (
        <>
            <BaseCarousel title='TOP10 Filmes para assistir' cardPerContainer={cardPerContainer} cards={carouselMovies} />
        </>
    )
}
import { useEffect, useState } from 'react'
import CommonCarousel from '../ui/CommonCarousel'
import { CardsProps } from '@/@types/Cards'
import { useFlix } from '@/contexts/FlixContext'
import { SeriesProps } from '@/@types/series'

interface ComponentProps {
    cardPerContainer: number
    type: 'movie' | 'tv'
}
export default function LastContentAdded({ cardPerContainer, type }: ComponentProps) {
    const { movies, series } = useFlix()
    const [cards, setCards] = useState<CardsProps[] | SeriesProps[]>([])

    const lastMovies = () => {
        const ultimosFilmes = type === 'movie' ? movies.sort((a, b) => b.index - a.index).slice(0, 20) : series.sort((a, b) => b.index - a.index).slice(0, 20)
        setCards(ultimosFilmes)
    }

    useEffect(() => {
        lastMovies()
    }, [movies])

    return (
        <CommonCarousel
            cardPerContainer={cardPerContainer}
            title={type === 'movie' ? 'Últimos filmes adicionados' : 'Últimas Séries adicionadas'}
            cards={cards} />
    )
}
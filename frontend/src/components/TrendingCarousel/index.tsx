import { useTMDB } from '@/contexts/TMDBContext'
import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { useEffect, useState } from 'react'
import CommonCarousel from '../ui/CommonCarousel'

interface TrendingProps {
    cardPerContainer: number
}

export default function TrendingCarousel({ cardPerContainer }: TrendingProps) {
    const { allData, serieData } = useTMDB()
    const { movies, series } = useFlix()
    const [cards, setCards] = useState<(CardsProps | SeriesProps)[]>([])

    const mostPopular = (minPopularity: number) => {
        if (!allData.length || !serieData.length || !movies.length) return

        const moviesFiltered = allData
            .filter(item => item.popularity >= minPopularity)
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(item => movies.find(m => m.tmdbId === item.id))
            .filter(Boolean) as CardsProps[]

        const seriesFiltered = serieData
            .filter(item => item.popularity >= minPopularity)
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(item => series.find(s => s.tmdbID === item.id))
            .filter(Boolean) as SeriesProps[]

        const result: (CardsProps | SeriesProps)[] = []

        let i = 0
        while (i < moviesFiltered.length || i < seriesFiltered.length) {
            if (moviesFiltered[i]) result.push(moviesFiltered[i])
            if (seriesFiltered[i]) result.push(seriesFiltered[i])
            i++
        }
        setCards(result.slice(0, 20))
    }
    useEffect(() => {
        mostPopular(40)
    }, [allData, serieData, movies])

    if (!cards || cards.length === 0) return

    return (
        <>
            <CommonCarousel title='Tendências e Populares' cardPerContainer={cardPerContainer} cards={cards} />
        </>
    )
}
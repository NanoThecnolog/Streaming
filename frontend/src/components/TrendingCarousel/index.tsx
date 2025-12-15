import { useTMDB } from '@/contexts/TMDBContext'
import BaseCarousel from '../ui/BaseCarousel'
import styles from './styles.module.scss'
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

        /*const map = new Map<number, CardsProps | SeriesProps>()

        const sorted = [...allData, ...serieData].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))

        for (const card of sorted) {
            const movie = movies.find(m => m.tmdbId === card.id)
            if (movie && !map.has(movie.tmdbId)) {
                map.set(movie.tmdbId, movie)
            }
            if (map.size === 20) break
        }*/
        setCards(result.slice(0, 20))
    }
    useEffect(() => {
        mostPopular(40)
    }, [allData, serieData, movies])
    return (
        <>
            <CommonCarousel title='Tendências e Populares' cardPerContainer={cardPerContainer} cards={cards} />
        </>
    )
}
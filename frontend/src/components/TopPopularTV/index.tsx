import { useTMDB } from '@/contexts/TMDBContext'
import BaseCarousel from '../ui/BaseCarousel'
//import { debug } from '@/classes/DebugLogger'
import { SeriesProps, TMDBSeries } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { useEffect, useState } from 'react'

interface TopPopularProps {
    cardPerContainer: number
}

export default function TopPopularTVShows({ cardPerContainer }: TopPopularProps) {
    const { serieData } = useTMDB()
    const { series } = useFlix()
    const [trendSeries, setTrendSeries] = useState<SeriesProps[]>([])

    useEffect(() => {
        if (trendSeries.length === 0) {
            const mapSeriesDB = new Map(series.map(item => [item.tmdbID, item]))
            const cardsPerPopularity = [...serieData].sort((a, b) => b.popularity - a.popularity)

            const trend = cardsPerPopularity
                .map(card => mapSeriesDB.get(card.id))
                .filter((item): item is SeriesProps => item !== undefined)
                .slice(0, 10)
            const carousel = trend
                .map(serie => serie)
                .filter((item): item is SeriesProps => item !== undefined)
            setTrendSeries(carousel)
        }
    }, [])

    if (trendSeries.length === 0) return null
    return (
        <>
            <BaseCarousel title='TOP10 Series para assistir' cardPerContainer={cardPerContainer} cards={trendSeries} />
        </>
    )
}
import { useTMDB } from '@/contexts/TMDBContext'
import BaseCarousel from '../ui/BaseCarousel'
//import { debug } from '@/classes/DebugLogger'
import { SeriesProps, TMDBSeries } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { useEffect, useState } from 'react'
import { debug } from '@/classes/DebugLogger'

interface TopPopularProps {
    cardPerContainer: number
}

export default function TopPopularTVShows({ cardPerContainer }: TopPopularProps) {
    const { serieData } = useTMDB()
    const { series } = useFlix()
    const [trendSeries, setTrendSeries] = useState<SeriesProps[]>([])

    useEffect(() => {
        debug.log("trendSeries no inicio do useEffect", trendSeries)
        if (trendSeries.length > 0) return

        debug.log("començando useEffect")

        const mapSeriesDB = new Map(series.map(serie => [serie.tmdbID, serie]))
        debug.log("map construído", mapSeriesDB)
        const trend: SeriesProps[] = []

        debug.log("serieData antes de ordenar por popularidade", serieData)
        const cardsPerPopularity = [...serieData].sort((a, b) => b.popularity - a.popularity)

        debug.log("cards sorted", cardsPerPopularity)

        for (const card of cardsPerPopularity) {
            debug.log("card no for", card)
            const serie = mapSeriesDB.get(card.id)

            if (!serie) continue

            debug.log("serie encontrada no map", serie)

            trend.push(serie)

            debug.log("trend depois do push", trend)

            if (trend.length === 10) break
        }
        debug.log("fim do for, setando trendSeries com trend final", trend)

        setTrendSeries(trend)

        /*const trend = cardsPerPopularity
            .map(card => mapSeriesDB.get(card.id))
            .filter((item): item is SeriesProps => item !== undefined)
            .slice(0, 10)
        const carousel = trend
            .map(serie => serie)
            .filter((item): item is SeriesProps => item !== undefined)
        setTrendSeries(carousel)*/
    }, [series, serieData, trendSeries.length])

    if (!trendSeries || trendSeries.length === 0) return null
    return (
        <>
            <BaseCarousel title='TOP10 Series para assistir' cardPerContainer={cardPerContainer} cards={trendSeries} />
        </>
    )
}
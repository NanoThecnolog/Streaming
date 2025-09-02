import BaseCarousel from '../ui/BaseCarousel'
//import { debug } from '@/classes/DebugLogger'
import { SeriesProps, TMDBSeries } from '@/@types/series'

interface TopPopularProps {
    cardPerContainer: number
    cards: TMDBSeries[],
    seriesDB: SeriesProps[]
}

export default function TopPopularTVShows({ cardPerContainer, cards, seriesDB }: TopPopularProps) {
    const mapSeriesDB = new Map(seriesDB.map(item => [item.tmdbID, item]))
    const cardsPerPopularity = cards.sort((a, b) => b.popularity - a.popularity)
    const series: SeriesProps[] = cardsPerPopularity
        .map(card => mapSeriesDB.get(card.id))
        .filter((item): item is SeriesProps => item !== undefined)
        .slice(0, 10)
    //const novaSerie = seriesDB.find(serie => serie.tmdbID === 259909)
    const carouselSeries = series
        .map(serie => serie)
        .filter((item): item is SeriesProps => item !== undefined)
    //console.log(carouselSeries, cardPerContainer)
    return (
        <>
            <BaseCarousel title='TOP10 Series para assistir' cardPerContainer={cardPerContainer} cards={carouselSeries} />
        </>
    )
}
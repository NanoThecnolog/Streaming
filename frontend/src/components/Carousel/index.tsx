import { Swiper, SwiperSlide } from 'swiper/react'
import { CardsProps } from '@/@types/Cards'
import Card from '../Card'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
//import { cards } from '@/data/cards';
import { shuffle } from '@/utils/UtilitiesFunctions'
//import { series } from '@/data/series';
import { SeriesProps } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { getTitle } from '@/utils/RenderingTitlesSections'
import SectionHeader from '../ui/SectionHeader'

interface CarouselProps {
  //cards: CardsProps[],
  section: string
  cardPerContainer: number
  type: 'movie' | 'tv' | 'all'
}

export default function Carousel({ type, section, cardPerContainer }: CarouselProps) {
  const [filter, setFilter] = useState<(CardsProps | SeriesProps)[]>([])
  const { movies, series } = useFlix()

  useEffect(() => {
    const matchesSection = (card: CardsProps | SeriesProps) => {
      return card.genero.some(
        (genre) => genre.toLocaleLowerCase('pt-BR') === section.toLocaleLowerCase('pt-BR'),
      )
    }
    const availableCards: Array<CardsProps | SeriesProps> =
      type === 'movie' ? movies : type === 'tv' ? series : [...movies, ...series]

    setFilter(shuffle(availableCards.filter(matchesSection)))
  }, [type, section, movies, series])

  if (filter.length === 0) return null

  return (
    <div className={styles.carouselContainer}>
      <SectionHeader title={getTitle(section, type)} />
      <Swiper
        spaceBetween={10}
        slidesPerView={cardPerContainer}
        loop={filter.length > Math.ceil(cardPerContainer)}
        className={styles.carousel}
      >
        {filter.map((card, index) => {
          if ('season' in card) {
            return (
              <SwiperSlide key={`series-${card.tmdbID}`}>
                <Card card={card} />
              </SwiperSlide>
            )
          } else {
            return (
              <SwiperSlide key={`movie-${card.tmdbId}-${index}`}>
                <Card card={card} />
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </div>
  )
}

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { CardsProps } from '@/@types/Cards'
import Card from '../Card'
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from 'react'
import { shuffle } from '@/utils/UtilitiesFunctions'
import { SeriesProps } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { getTitle } from '@/utils/RenderingTitlesSections'
import SectionHeader from '../ui/SectionHeader'

interface CarouselProps {
  section: string
  cardPerContainer: number
  type: 'movie' | 'tv' | 'all'
}

export default function Carousel({ type, section, cardPerContainer }: CarouselProps) {
  const [renderLimit, setRenderLimit] = useState(cardPerContainer * 2)
  const { movies, series } = useFlix()

  const filteredCards = useMemo<(CardsProps | SeriesProps)[]>(() => {
    const matchesSection = (card: CardsProps | SeriesProps) => {
      return card.genero.some(
        (genre) => genre.toLocaleLowerCase('pt-BR') === section.toLocaleLowerCase('pt-BR'),
      )
    }
    const availableCards: Array<CardsProps | SeriesProps> =
      type === 'movie' ? movies : type === 'tv' ? series : [...movies, ...series]

    return shuffle(availableCards.filter(matchesSection))
  }, [type, section, movies, series])

  useEffect(() => {
    setRenderLimit(cardPerContainer * 2)
  }, [filteredCards, cardPerContainer])

  if (filteredCards.length === 0) return null

  const visibleCards = filteredCards.slice(0, renderLimit)

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.activeIndex >= renderLimit - cardPerContainer * 2) {
      setRenderLimit((current) =>
        Math.min(current + cardPerContainer * 2, filteredCards.length),
      )
    }
  }

  return (
    <div className={styles.carouselContainer}>
      <SectionHeader title={getTitle(section, type)} />
      <Swiper
        spaceBetween={10}
        slidesPerView={cardPerContainer}
        loop={false}
        className={styles.carousel}
        onSlideChange={handleSlideChange}
      >
        {visibleCards.map((card, index) => {
          if ('season' in card) {
            return (
              <SwiperSlide key={`series-${card.tmdbID}`}>
                <Card card={card} priority={index < cardPerContainer} />
              </SwiperSlide>
            )
          } else {
            return (
              <SwiperSlide key={`movie-${card.tmdbId}-${index}`}>
                <Card card={card} priority={index < cardPerContainer} />
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </div>
  )
}

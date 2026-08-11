import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Card from '@/components/Card'
import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import { uniqueKey } from '@/utils/UtilitiesFunctions'
import SectionHeader from '../SectionHeader'

interface BaseProps {
  title: string
  cardPerContainer: number
  cards: (CardsProps | SeriesProps)[]
}

export default function CommonCarousel({ title, cardPerContainer, cards }: BaseProps) {
  const uniqueCards = Array.from(
    new Map(cards.map((card) => ['season' in card ? card.tmdbID : card.tmdbId, card])).values(),
  )

  return (
    <div className={styles.carouselContainer}>
      <SectionHeader title={title} />
      <Swiper
        spaceBetween={10}
        slidesPerView={cardPerContainer}
        loop={uniqueCards.length > Math.ceil(cardPerContainer)}
        className={styles.carousel}
      >
        {uniqueCards.map((card) => {
          if ('season' in card) {
            return (
              <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                <Card card={card} />
              </SwiperSlide>
            )
          } else {
            return (
              <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                <Card card={card} />
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </div>
  )
}

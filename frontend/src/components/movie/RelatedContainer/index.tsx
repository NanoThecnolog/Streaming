import { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import Card from '@/components/Card'

import 'swiper/css'

import styles from './styles.module.scss'

interface RelatedProps {
  cards: Array<CardsProps | SeriesProps>
}

const isSeries = (card: CardsProps | SeriesProps): card is SeriesProps => {
  return 'season' in card
}

const getCardKey = (card: CardsProps | SeriesProps): string => {
  return isSeries(card) ? `series-${card.tmdbID}` : `movie-${card.tmdbId}`
}

export default function RelatedCardsContainer({ cards }: RelatedProps) {
  const titleId = useId()

  if (cards.length === 0) return null

  const enableLoop = cards.length > 7

  return (
    <section className={styles.container} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Você também vai gostar
        </h2>
      </header>

      <div className={styles.cardContainer}>
        <Swiper
          className={styles.slider}
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={10}
          grabCursor
          watchOverflow
          centerInsufficientSlides
          loop={enableLoop}
          breakpoints={{
            780: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            915: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
            1160: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
            1500: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
            1855: {
              slidesPerView: 7,
              spaceBetween: 18,
            },
          }}
          aria-label="Conteúdos relacionados"
        >
          {cards.map((card) => (
            <SwiperSlide key={getCardKey(card)} className={styles.cardSlide}>
              <Card card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Card from '@/components/Card'
import { Navigation } from 'swiper/modules'
import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import Link from 'next/link'
//import { debug } from '@/classes/DebugLogger'
import { uniqueKey } from '@/utils/UtilitiesFunctions'


interface BaseProps {
    title: string,
    cardPerContainer: number,
    cards: (CardsProps | SeriesProps)[]

}

export default function CommonCarousel({ title, cardPerContainer, cards }: BaseProps) {

    const uniqueCards = Array.from(new Map(
        cards.map(card => [('season' in card ? card.tmdbID : card.tmdbId), card])
    ).values())

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.contentTitle}>{title.toUpperCase()}</h2>

            {
                //debug.log('cards', cards.map(c => 'season' in c ? c.tmdbID : c.tmdbId))
            }
            <Swiper
                //ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={cardPerContainer}
                loop={true}
                className={styles.carousel}
            >
                {uniqueCards.map((card, index) => {
                    if ('season' in card) {
                        return <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                            <Card card={card} />
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                            <Card card={card} />
                        </SwiperSlide>
                    }
                })}
            </Swiper>
        </div>
    )
}
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

export default function BaseCarousel({ title, cardPerContainer, cards }: BaseProps) {

    const uniqueCards = Array.from(new Map(
        cards.map(card => [('season' in card ? card.tmdbID : card.tmdbId), card])
    ).values())

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.contentTitle}>{title.toUpperCase()}</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={cardPerContainer - (cardPerContainer === 8 ? 1 : 0)}
                loop={false}
                className={styles.carousel}
            >
                {uniqueCards.map((card, index) => {
                    if ('season' in card) {
                        return <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                            <Link href={`/series/serie/${card.tmdbID}`}><p className={styles.index}>{index === 9 ? (
                                <>
                                    <span className={styles.tenOne}>1</span>
                                    <span className={styles.tenZero}>0</span>
                                </>
                            ) : index + 1}</p></Link>
                            <div className={styles.cardWrapper}>
                                <Card card={card} />
                            </div>
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={uniqueKey(card)} className={styles.slide}>
                            <Link href={`/movie/${card.tmdbId}`}><p className={styles.index}>{index === 9 ? (
                                <>
                                    <span className={styles.tenOne}>1</span>
                                    <span className={styles.tenZero}>0</span>
                                </>
                            ) : index + 1}</p></Link>
                            <div className={styles.cardWrapper}>
                                <Card card={card} />
                            </div>
                        </SwiperSlide>
                    }
                })}
            </Swiper>
        </div>
    )
}
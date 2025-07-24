import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Card from '@/components/Card'
import { Navigation } from 'swiper/modules'
import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import Link from 'next/link'


interface BaseProps {
    title: string,
    cardPerContainer: number,
    cards: CardsProps[] | SeriesProps[]

}

export default function BaseCarousel({ title, cardPerContainer, cards }: BaseProps) {
    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.contentTitle}>{title.toUpperCase()}</h2>
            <Swiper
                //ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={cardPerContainer}
                loop={false}
                className={styles.carousel}
            >
                {cards.map((card, index) => {
                    if ('season' in card) {
                        return <SwiperSlide key={card.tmdbID} className={styles.slide}>
                            <Link href={`/series/serie/${card.tmdbID}`}><p>{index + 1}</p></Link>
                            <Card card={card} />
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={`${card.tmdbId}+${index}`} className={styles.slide}>
                            <Link href={`/movie/${card.tmdbId}`}><p>{index + 1}</p></Link>
                            <Card card={card} />
                        </SwiperSlide>
                    }
                })}
            </Swiper>
        </div>
    )
}
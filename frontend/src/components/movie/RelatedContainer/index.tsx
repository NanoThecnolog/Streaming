import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import 'swiper/css';

interface RelatedProps {
    cards: CardsProps[] | SeriesProps[]
}

export default function RelatedCardsContainer({ cards }: RelatedProps) {
    const [cardPerContainer, setCardPerContainer] = useState(5)

    //debug.log(cards)

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            const breakpoints = [
                { width: 560, cards: 2 },
                { width: 780, cards: 3 },
                { width: 915, cards: 4 },
                { width: 1160, cards: 5 },
                { width: 1500, cards: 6 },
                { width: 1855, cards: 7 },
                { width: Infinity, cards: 8 },
            ]
            const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 5 }
            setCardPerContainer(cards)
            //debug.log(cards)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <h2>Você também vai gostar</h2>
            <div className={styles.cardContainer}>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={cardPerContainer}
                    loop={true}
                    className={styles.slide}
                >
                    {cards.map((card) => {
                        if ('season' in card) {
                            return <SwiperSlide key={card.tmdbID}>
                                <Card card={card} />
                            </SwiperSlide>
                        } else {
                            return <SwiperSlide key={card.tmdbId}>
                                <Card card={card} />
                            </SwiperSlide>
                        }

                    })}
                </Swiper>
            </div>
        </>
    )
}
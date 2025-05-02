import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import 'swiper/css';
import debounce from 'lodash.debounce'

interface RelatedProps {
    cards: CardsProps[] | SeriesProps[]
}

export default function RelatedCardsContainer({ cards }: RelatedProps) {
    const [cardPerContainer, setCardPerContainer] = useState(2)


    debug.log("Cards relacionados: ", cards)
    debug.log("quantidade de Card por slide: ", cardPerContainer)



    useEffect(() => {
        //debug.log("Largura do window", window.innerWidth)
        const handleResize = debounce(() => {
            debug.log("Largura do window", window.innerWidth)
            const windowWidth = window.innerWidth;
            const breakpoints = [
                { width: 560, cards: 2 },
                { width: 780, cards: 2 },
                { width: 915, cards: 3 },
                { width: 1160, cards: 4 },
                { width: 1500, cards: 5 },
                { width: 1855, cards: 6 },
                { width: Infinity, cards: 7 },
            ]
            const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 2 }
            setCardPerContainer(cards)
            //debug.log(cards)
        }, 1000)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className={styles.container}>
            <h2>Você também vai gostar</h2>
            <div className={styles.cardContainer}>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={cardPerContainer || 2}
                    loop={true}
                    className={styles.slide}
                >
                    {cards.map((card) => {
                        debug.log('card', card)
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
        </div>
    )
}
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import NewTop from '../newTop'
import { useState } from 'react'
import NewTopSerie from '../seriesComponents/newTopSerie'
import type { Swiper as SwiperType } from 'swiper'

interface HeroProps {
    width: number
}
type IDProps = {
    id: number,
    type: "movie" | "tv"
}

export default function HeroSection({ width }: HeroProps) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const ids: IDProps[] = [
        {
            id: 106379, //fallout
            type: 'tv'
        },
        {
            id: 1168190, // dupla perigosa
            type: 'movie'
        },
        {
            id: 224372, //cavaleiro dos 7 reinos
            type: 'tv'
        },
        {
            id: 1306368, //dinheiro suspeito
            type: 'movie'
        },
        {
            id: 66732,
            type: 'tv'
        },
        {
            id: 798645,
            type: 'movie'
        },
        {
            id: 103540,
            type: 'tv'
        },
        {
            id: 425274,
            type: 'movie'
        },
    ]

    const handleVideoEnded = () => {
        if (!swiperInstance) return

        setTimeout(() => {
            const isLastSlide = activeIndex === ids.length - 1

            if (isLastSlide) swiperInstance.slideToLoop(0)
            else swiperInstance.slideNext()
        }, 3000)
    }


    return (
        <section className={styles.container}>
            <Swiper
                speed={1500}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                loop
                slidesPerView={1}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className={styles.carousel}
            >
                {
                    ids.map((item, index) => (
                        <SwiperSlide key={index}>
                            <NewTop
                                width={width}
                                id={item.id}
                                isActive={activeIndex === index}
                                onVideoEnded={handleVideoEnded}
                                disableVideoOnFirst={/*activeIndex === ids.length - 1 */false}
                                type={item.type}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}
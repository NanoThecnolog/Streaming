import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import NewTop from '../newTop'
import { useEffect, useRef, useState } from 'react'
import { useFlix } from '@/contexts/FlixContext'
import { CardsProps } from '@/@types/Cards'
import NewTopSerie from '../seriesComponents/newTopSerie'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'

interface HeroProps {
    width: number
}
type IDProps = {
    id: number,
    type: "movie" | "tv"
}

export default function HeroSection({ width }: HeroProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const ids: IDProps[] = [
        {
            id: 617126,
            type: "movie"
        },
        {
            id: 157239,
            type: "tv"
        },
        {
            id: 604079,
            type: "movie"
        },
        {
            id: 822119,
            type: "movie"
        }
    ]
    return (
        <section className={styles.container}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                loop
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className={styles.carousel}
            >
                {
                    ids.map((item, index) => {
                        if (item.type === "movie") return (
                            <SwiperSlide key={index}>
                                <NewTop width={width} id={item.id} isActive={activeIndex === index} />
                            </SwiperSlide>
                        )
                        if (item.type === "tv") return (
                            <SwiperSlide key={index}>
                                <NewTopSerie width={width} id={item.id} isActive={activeIndex === index} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    )
}
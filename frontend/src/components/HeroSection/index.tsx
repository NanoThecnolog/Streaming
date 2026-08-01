import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import NewTop from '../newTop'

import styles from './styles.module.scss'

interface HeroProps {
    width: number
}

type ContentType = 'movie' | 'tv'

interface HeroItem {
    id: number
    type: ContentType
}

const MOBILE_BREAKPOINT = 780

const HeroSection = ({ width }: HeroProps) => {
    const [swiperInstance, setSwiperInstance] =
        useState<SwiperType | null>(null)

    const [activeIndex, setActiveIndex] = useState(0)

    const isMobile = width <= MOBILE_BREAKPOINT

    const ids: HeroItem[] = [
        {
            id: 1083381,
            type: 'movie',
        },
        {
            id: 94997,
            type: 'tv',
        },
        {
            id: 1339713,
            type: 'movie',
        },
        {
            id: 82452,
            type: 'tv',
        },
        {
            id: 931285,
            type: 'movie',
        },
        {
            id: 278178,
            type: 'tv',
        },
        {
            id: 1301421,
            type: 'movie',
        },
        {
            id: 273240,
            type: 'tv',
        },
        {
            id: 1439930,
            type: 'movie',
        },
        {
            id: 124364,
            type: 'tv',
        },
    ]

    const handleVideoEnded = () => {
        if (!swiperInstance) return

        window.setTimeout(() => {
            const isLastSlide = activeIndex === ids.length - 1

            if (isLastSlide) {
                swiperInstance.slideToLoop(0)

                return
            }

            swiperInstance.slideNext()
        }, 3000)
    }

    return (
        <section
            className={styles.container}
            aria-label="Conteúdos em destaque"
        >
            <Swiper
                className={styles.carousel}
                modules={[Navigation, Pagination]}
                speed={1500}
                slidesPerView={1}
                loop
                navigation={!isMobile}
                pagination={
                    isMobile
                        ? false
                        : {
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet',
                            bulletActiveClass:
                                'swiper-pagination-bullet-active',
                        }
                }
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex)
                }}
            >
                {ids.map((item, index) => (
                    <SwiperSlide
                        key={`${item.type}-${item.id}`}
                        className={styles.slide}
                    >
                        <NewTop
                            width={width}
                            id={item.id}
                            type={item.type}
                            isActive={activeIndex === index}
                            onVideoEnded={handleVideoEnded}
                            disableVideoOnFirst={false}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default HeroSection
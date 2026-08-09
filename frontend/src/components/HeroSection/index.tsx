import { ChangeEvent, useEffect, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import NewTop from '../newTop'

import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { HeroItem, trailerIds } from '@/utils/trailers'

interface HeroProps {
  width: number
  page?: 'movie' | 'tv'
}

const MOBILE_BREAKPOINT = 780

const HeroSection = ({ width, page }: HeroProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const isMobile = width <= MOBILE_BREAKPOINT

  const [trailersToShow, setTrailersToShow] = useState<HeroItem[]>([])

  useEffect(() => {
    if (page) {
      const trailerByType = trailerIds.filter((trailer) => trailer.type === page)
      setTrailersToShow(trailerByType)
    } else {
      setTrailersToShow(trailerIds)
    }
  }, [trailerIds])

  const handleVideoEnded = () => {
    if (!swiperInstance) return

    window.setTimeout(() => {
      const isLastSlide = activeIndex === trailersToShow.length - 1

      if (isLastSlide) {
        swiperInstance.slideToLoop(0)

        return
      }

      swiperInstance.slideNext()
    }, 3000)
  }

  return (
    <section className={styles.container} aria-label="Conteúdos em destaque">
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
                bulletActiveClass: 'swiper-pagination-bullet-active',
              }
        }
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
      >
        {trailersToShow.map((item, index) => (
          <SwiperSlide key={`${item.type}-${item.id}`} className={styles.slide}>
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

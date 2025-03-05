import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CardsProps } from '@/@types/Cards';
import { Navigation } from "swiper/modules";
import Card from '../Card';
import styles from './styles.module.scss'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { cards } from '@/data/cards';
import { shuffle } from '@/utils/UtilitiesFunctions';
import { series } from '@/data/series';
import { SeriesProps } from '@/@types/series';
import { filterCards } from '@/utils/CardsManipulation';

interface CarouselProps {
    //cards: CardsProps[],
    section: string,
    cardPerContainer: number
    type: 'movie' | 'tv'
}

export default function Carousel({ type, section, cardPerContainer }: CarouselProps) {
    const [filter, setFilter] = useState<(CardsProps | SeriesProps)[]>([])

    const swiperRef = useRef<any>(null)
    const prevRef = useRef<any>(null)
    const nextRef = useRef<any>(null)

    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    const handleSwiper = (swiper: any) => {
        setSwiperInstance(swiper);
    };

    useEffect(() => {
        //const filtered = filterCards(type === 'movie' ? cards as CardsProps[] : series as SeriesProps[], section)
        const filter = type === 'movie' ? cards.filter(card => card.genero.some(gen => gen.toLowerCase() === section?.toLowerCase())) : series.filter(card => card.genero.some(gen => gen.toLowerCase() === section?.toLowerCase()))
        let shuffled: CardsProps[] | SeriesProps[];
        if (type === 'movie') shuffled = shuffle(filter as CardsProps[])
        else shuffled = shuffle(filter as SeriesProps[])
        setFilter(shuffled)
    }, [section])

    useEffect(() => {
        if (swiperInstance && swiperRef.current && swiperRef.current.swiper && prevRef.current && nextRef.current) {
            swiperRef.current.swiper.params.navigation = {
                nextEl: nextRef.current,
                prevEl: prevRef.current,
            };
            swiperRef.current.swiper.navigation.update();
        }
    }, [swiperRef])

    return (
        <div className={styles['carousel-container']}>
            <h2 className={styles.content_title}>{section.toUpperCase()}</h2>
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={cardPerContainer}
                navigation={{
                    nextEl: `.next-${section.replace(/\s+/g, '-')}`,
                    prevEl: `.before-${section.replace(/\s+/g, '-')}`
                }}
                loop={false}
                onSwiper={handleSwiper}
            >
                {filter.map((card) => {
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
            <button ref={prevRef} className={`${styles['swiper-button-prev']} before-${section.replace(/\s+/g, '-')}`}><MdNavigateBefore size={40} /></button>
            <button ref={nextRef} className={`${styles['swiper-button-next']} next-${section.replace(/\s+/g, '-')}`}><MdNavigateNext size={40} /></button>
        </div>
    );
};

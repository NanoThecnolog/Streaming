import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CardsProps } from '@/@types/Cards';
import { Navigation } from "swiper/modules";
import Card from '../Card';
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
//import { cards } from '@/data/cards';
import { shuffle } from '@/utils/UtilitiesFunctions';
//import { series } from '@/data/series';
import { SeriesProps } from '@/@types/series';
import { useFlix } from '@/contexts/FlixContext';
import { getTitle } from '@/utils/RenderingTitlesSections';

interface CarouselProps {
    //cards: CardsProps[],
    section: string,
    cardPerContainer: number
    type: 'movie' | 'tv' | 'all'
}

export default function Carousel({ type, section, cardPerContainer }: CarouselProps) {
    const [filter, setFilter] = useState<(CardsProps | SeriesProps)[]>([])
    const { movies, series } = useFlix()

    const swiperRef = useRef<any>(null)
    const prevRef = useRef<any>(null)
    const nextRef = useRef<any>(null)

    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    const handleSwiper = (swiper: any) => {
        setSwiperInstance(swiper);
    };

    useEffect(() => {
        const matchesSection = (card: CardsProps | SeriesProps) => {
            return card.genero.some(genre => (
                genre.toLocaleLowerCase('pt-BR') === section.toLocaleLowerCase('pt-BR')
            ))
        }
        const availableCards: Array<CardsProps | SeriesProps> = type === 'movie'
            ? movies
            : type === 'tv'
                ? series
                : [...movies, ...series]

        setFilter(shuffle(availableCards.filter(matchesSection)))
    }, [type, section, movies, series])

    useEffect(() => {
        if (swiperInstance && swiperRef.current && swiperRef.current.swiper && prevRef.current && nextRef.current) {
            swiperRef.current.swiper.params.navigation = {
                nextEl: nextRef.current,
                prevEl: prevRef.current,
            };
            swiperRef.current.swiper.navigation.update();
        }
    }, [swiperRef, swiperInstance])

    if (filter.length === 0) return null

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.contentTitle}>{getTitle(section, type).toUpperCase()}</h2>
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={cardPerContainer}
                loop={true}
                onSwiper={handleSwiper}
                className={styles.carousel}
            >
                {filter.map((card, index) => {
                    if ('season' in card) {
                        return <SwiperSlide key={`series-${card.tmdbID}`}>
                            <Card card={card} />
                        </SwiperSlide>
                    } else {
                        return <SwiperSlide key={`movie-${card.tmdbId}-${index}`}>
                            <Card card={card} />
                        </SwiperSlide>
                    }
                })}
            </Swiper>
        </div>
    );
};

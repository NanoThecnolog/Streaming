import Link from 'next/link'
import styles from './styles.module.scss'
import Spinner from '@/components/ui/Loading/spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { swiperBreakpoints } from '@/utils/Variaveis'
import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series'

interface CarouselProps {
    movies: MovieTMDB[]
    series: TMDBSeries[]
}

export default function Carousel({ movies, series }: CarouselProps) {
    return (
        <section className={styles.contentPromoContainer}>
            <div className={styles.textContent}>
                <h2>Conteúdo exclusivo</h2>
                <h4>Na FlixNext você encontra filmes e séries que não acha em nenhum outro lugar</h4>
            </div>
            {movies.length > 0 && series.length > 0 ?
                <>
                    <div className={styles.cardContainer}>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            spaceBetween={10}
                            loop={true}
                            breakpoints={swiperBreakpoints}
                        >
                            {movies.slice(0, 20).map(movie => {
                                const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                return (
                                    <SwiperSlide key={movie.id}>
                                        <div className={styles.card}>
                                            <img src={url} alt={movie.title} />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                    </div>
                    <div className={styles.cardContainer}>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            spaceBetween={10}
                            loop={true}
                            breakpoints={swiperBreakpoints}
                        >
                            {series.slice(0, 20).map(serie => {
                                const url = `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                                return (
                                    <SwiperSlide key={serie.id}>
                                        <div className={styles.card}>
                                            <img src={url} alt={serie.name} />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </>
                : <div className={styles.loader}>
                    <Spinner />
                </div>
            }
            <div className={styles.buttonActionContainer}>
                <Link href="/planos/#escolher">
                    <button>
                        Escolher plano
                    </button>
                </Link>
            </div>
        </section>
    )
}
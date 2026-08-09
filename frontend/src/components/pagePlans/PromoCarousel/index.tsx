import Link from 'next/link'
import { FiArrowRight, FiFilm, FiTv } from 'react-icons/fi'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series'
import Spinner from '@/components/ui/Loading/spinner'

import styles from './styles.module.scss'

interface CarouselProps {
  movies: MovieTMDB[]
  series: TMDBSeries[]
}

const carouselBreakpoints = {
  0: {
    slidesPerView: 2.15,
    spaceBetween: 9,
  },
  420: {
    slidesPerView: 2.7,
    spaceBetween: 10,
  },
  560: {
    slidesPerView: 3.4,
    spaceBetween: 11,
  },
  768: {
    slidesPerView: 4.3,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 5.4,
    spaceBetween: 13,
  },
  1280: {
    slidesPerView: 6.3,
    spaceBetween: 14,
  },
  1600: {
    slidesPerView: 7.2,
    spaceBetween: 15,
  },
}

const Carousel = ({ movies = [], series = [] }: CarouselProps) => {
  const availableMovies = movies.filter((movie) => Boolean(movie.poster_path)).slice(0, 20)

  const availableSeries = series.filter((serie) => Boolean(serie.poster_path)).slice(0, 20)

  const hasContent = availableMovies.length > 0 || availableSeries.length > 0

  const getPosterUrl = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`
  }

  return (
    <section className={styles.catalogSection} aria-labelledby="catalog-title">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <header className={styles.header}>
        <span className={styles.eyebrow}>Explore o catálogo</span>

        <h2 id="catalog-title">
          Histórias para todos os momentos.
          <span> Sempre algo novo para assistir.</span>
        </h2>

        <p>Descubra filmes e séries selecionados entre os conteúdos disponíveis na FlixNext.</p>
      </header>

      {hasContent ? (
        <div className={styles.rails}>
          {availableMovies.length > 0 && (
            <article className={styles.rail} aria-labelledby="movies-title">
              <div className={styles.railHeader}>
                <div>
                  <span className={styles.railIcon}>
                    <FiFilm aria-hidden="true" />
                  </span>

                  <div>
                    <span>Seleção FlixNext</span>
                    <h3 id="movies-title">Filmes em destaque</h3>
                  </div>
                </div>

                {/*<span className={styles.contentCount}>
                                    {availableMovies.length} títulos
                                </span>*/}
              </div>

              <Swiper
                className={styles.swiper}
                modules={[Navigation, Autoplay]}
                //navigation
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={availableMovies.length > 7}
                watchOverflow
                breakpoints={carouselBreakpoints}
              >
                {availableMovies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <article className={styles.card}>
                      <div className={styles.poster}>
                        <img
                          src={getPosterUrl(movie.poster_path)}
                          alt={`Pôster de ${movie.title}`}
                          loading="lazy"
                        />

                        <div className={styles.posterOverlay} aria-hidden="true" />
                      </div>

                      <span title={movie.title}>{movie.title}</span>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </article>
          )}

          {availableSeries.length > 0 && (
            <article className={styles.rail} aria-labelledby="series-title">
              <div className={styles.railHeader}>
                <div>
                  <span className={styles.railIcon}>
                    <FiTv aria-hidden="true" />
                  </span>

                  <div>
                    <span>Para maratonar</span>
                    <h3 id="series-title">Séries em destaque</h3>
                  </div>
                </div>

                {/*<span className={styles.contentCount}>
                                    {availableSeries.length} títulos
                                </span>*/}
              </div>

              <Swiper
                className={styles.swiper}
                modules={[Navigation, Autoplay]}
                //navigation
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  reverseDirection: true,
                }}
                loop={availableSeries.length > 7}
                watchOverflow
                breakpoints={carouselBreakpoints}
              >
                {availableSeries.map((serie) => (
                  <SwiperSlide key={serie.id}>
                    <article className={styles.card}>
                      <div className={styles.poster}>
                        <img
                          src={getPosterUrl(serie.poster_path)}
                          alt={`Pôster de ${serie.name}`}
                          loading="lazy"
                        />

                        <div className={styles.posterOverlay} aria-hidden="true" />
                      </div>

                      <span title={serie.name}>{serie.name}</span>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </article>
          )}
        </div>
      ) : (
        <div className={styles.loader} role="status" aria-label="Carregando catálogo">
          <Spinner />
          <span>Preparando o catálogo...</span>
        </div>
      )}

      <div className={styles.footer}>
        <p>Filmes, séries e novidades adicionados regularmente.</p>

        <Link href="/planos/#escolher" className={styles.action}>
          Escolher um plano
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default Carousel

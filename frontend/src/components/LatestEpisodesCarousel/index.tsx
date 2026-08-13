import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import SectionHeader from '@/components/ui/SectionHeader'
import NewContent from '@/components/ui/NewContent'
import { useTMDB } from '@/contexts/TMDBContext'
import { getLatestEpisodeDateKey, useLatestEpisodes } from '@/hooks/useLatestEpisodes'

import styles from './styles.module.scss'

interface LatestEpisodesCarouselProps {
  featured?: boolean
  limit?: number
}

const formatEpisodeLabel = (episodeNumbers: number[]) => {
  const episodes = [...episodeNumbers].sort((a, b) => a - b)
  return episodes.length === 1 ? `Episódio ${episodes[0]}` : `Episódios ${episodes.join(', ')}`
}

const formatRelativeDate = (value: string) => {
  const date = new Date(value)
  const elapsedDays = Math.max(0, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)))

  if (elapsedDays === 0) return 'Adicionado hoje'
  if (elapsedDays === 1) return 'Adicionado ontem'
  if (elapsedDays < 7) return `Adicionado há ${elapsedDays} dias`

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

export default function LatestEpisodesCarousel({
  featured = false,
  limit = 8,
}: LatestEpisodesCarouselProps) {
  const { serieData } = useTMDB()
  const { groups, isLoading } = useLatestEpisodes(24, limit)
  const seriesById = useMemo(
    () => new Map(serieData.map((serie) => [serie.id, serie])),
    [serieData],
  )
  const availableGroups = groups.filter((group) => seriesById.has(group.tmdbID))

  if (!isLoading && availableGroups.length === 0) return null

  return (
    <section
      className={`${styles.container} ${featured ? styles.featured : ''}`}
      aria-labelledby="latest-episodes-title"
    >
      <SectionHeader
        headingId="latest-episodes-title"
        eyebrow="Atualizações de Séries"
        title={featured ? 'Séries atualizadas recentemente' : 'Novos episódios disponíveis'}
        actionHref="/status"
        actionLabel="Ver todas as novidades"
      />

      {isLoading ? (
        <div className={styles.skeletonList} aria-label="Carregando episódios recentes">
          {Array.from({ length: featured ? 4 : 6 }).map((_, index) => (
            <div className={styles.skeleton} key={index} />
          ))}
        </div>
      ) : (
        <Swiper
          className={styles.carousel}
          spaceBetween={12}
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 1.7 },
            700: { slidesPerView: 2.5 },
            1000: { slidesPerView: featured ? 3.4 : 4.2 },
            1400: { slidesPerView: featured ? 4.25 : 5.2 },
          }}
        >
          {availableGroups.map((group) => {
            const serie = seriesById.get(group.tmdbID)!
            const season = serie.seasons?.find(
              ({ season_number }) => season_number === group.seasonNumber,
            )
            const imagePath =
              season?.poster_path ||
              (featured
                ? serie.backdrop_path || serie.poster_path
                : serie.poster_path || serie.backdrop_path)
            const imageAlt = season?.poster_path
              ? `Pôster da temporada ${group.seasonNumber} de ${serie.name}`
              : `Capa de ${serie.name}`

            return (
              <SwiperSlide key={`${group.tmdbID}-${group.seasonNumber}-${getLatestEpisodeDateKey(group.addedAt)}`}>
                <Link className={styles.card} href={`/series/serie/${group.tmdbID}`}>
                  <div className={styles.poster}>
                    {imagePath ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 480px) 80vw, (max-width: 1000px) 40vw, 22vw"
                      />
                    ) : (
                      <span className={styles.imageFallback} aria-hidden="true">
                        FX
                      </span>
                    )}
                    <div className={styles.badge}>
                      <NewContent type="episode" />
                    </div>
                    <div className={styles.overlay}>
                      <time dateTime={group.addedAt}>{formatRelativeDate(group.addedAt)}</time>
                      <h3>{serie.name}</h3>
                      <p>
                        T{group.seasonNumber} · {formatEpisodeLabel(group.episodeNumbers)}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </section>
  )
}

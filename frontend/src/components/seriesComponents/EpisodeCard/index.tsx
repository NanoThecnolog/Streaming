import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react'

import { Episodes, TMDBEpisodes } from '@/@types/series'
import { EpisodeProgressProps } from '@/@types/watchedProgress'
import { minToHour } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

interface EpisodeProps {
  episodeData: {
    serieTmdbId: number
    seasonNumber?: number
    image: string
    episode?: TMDBEpisodes
    data: Episodes
    progress: EpisodeProgressProps | null
  }
  handlePlay: (episode: Episodes, startTime?: number, season?: number) => void
  priority?: boolean
}

const normalizePercentage = (percentage?: number): number => {
  if (typeof percentage !== 'number' || !Number.isFinite(percentage)) {
    return 0
  }

  return Math.min(Math.max(percentage, 0), 100)
}

const getEpisodeDuration = (episode?: TMDBEpisodes, internalDuration?: string): string => {
  if (
    typeof episode?.runtime === 'number' &&
    Number.isFinite(episode.runtime) &&
    episode.runtime > 0
  ) {
    return minToHour(episode.runtime)
  }

  const duration = internalDuration?.trim()

  return duration || 'Duração não informada'
}

export default function EpisodeCard({ episodeData, handlePlay, priority = false }: EpisodeProps) {
  const [imageError, setImageError] = useState(false)
  const [usingDirectSource, setUsingDirectSource] = useState(false)

  const { data, episode, progress, seasonNumber } = episodeData

  useEffect(() => {
    setImageError(false)
    setUsingDirectSource(false)
  }, [episodeData.image])

  const episodeName = episode?.name?.trim() || `Episódio ${data.ep}`

  const overview = episode?.overview?.trim()

  const isFinale = episode?.episode_type?.toLocaleLowerCase('en-US') === 'finale'

  const isComplete = Boolean(progress?.complete)

  const progressPercentage = isComplete ? 100 : normalizePercentage(progress?.percentage)

  const startTime = isComplete ? 0 : (progress?.progress ?? 0)

  const duration = getEpisodeDuration(episode, data.duration)

  const imageSource = imageError ? '/logo.png' : episodeData.image

  const handleImageError = () => {
    if (!usingDirectSource && !imageError) {
      setUsingDirectSource(true)
      return
    }

    setImageError(true)
  }

  const actionLabel = isComplete
    ? 'Assistir novamente'
    : progressPercentage > 0
      ? 'Continuar assistindo'
      : 'Assistir episódio'

  const handleEpisodePlay = () => {
    handlePlay(data, startTime, seasonNumber)
  }

  return (
    <article className={styles.episodeContainer}>
      <div className={styles.episodeImage}>
        <Image
          fill
          quality={65}
          sizes="
                        (max-width: 570px) calc(100vw - 2rem),
                        (max-width: 915px) 46vw,
                        340px
                    "
          src={imageSource}
          alt=""
          className={styles.image}
          unoptimized={usingDirectSource}
          priority={priority}
          onError={handleImageError}
        />

        <div className={styles.imageOverlay} aria-hidden="true" />

        <span className={styles.playIndicator} aria-hidden="true">
          <PlayIcon />
        </span>

        {isFinale && <span className={styles.typeContainer}>Final da temporada</span>}

        {progress && (
          <div
            className={styles.progress}
            role="progressbar"
            aria-label={`${Math.round(progressPercentage)}% assistido`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPercentage)}
          >
            <div
              className={styles.progressFill}
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        )}
      </div>

      <div className={styles.episodeInfo}>
        <h3 className={styles.episodeTitle}>
          <span className={styles.episodeNumber}>Episódio {data.ep}</span>

          <span className={styles.episodeName}>{episodeName}</span>
        </h3>

        <div className={styles.metadata}>
          <span>{duration}</span>

          {isComplete && <span className={styles.completed}>Assistido</span>}
        </div>

        {overview && <p className={styles.description}>{overview}</p>}
      </div>

      <button
        type="button"
        className={styles.cardAction}
        onClick={handleEpisodePlay}
        aria-label={`${actionLabel}: episódio ${data.ep}, ${episodeName}`}
        title={`${actionLabel}: ${episodeName}`}
      />
    </article>
  )
}

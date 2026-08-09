import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineMovie } from 'react-icons/md'

import { TrailerProps, VideoProps } from '@/@types/trailer'

import styles from './styles.module.scss'

interface TrailerButtonProps {
  trailer: TrailerProps
}

const getPublishedTimestamp = (video: VideoProps): number => {
  const timestamp = Date.parse(video.published_at)

  return Number.isNaN(timestamp) ? 0 : timestamp
}

const getMostRecentTrailer = (videos: VideoProps[]): VideoProps | null => {
  return videos
    .filter(
      (video) => video.type?.toLocaleLowerCase('pt-BR') === 'trailer' && Boolean(video.key?.trim()),
    )
    .reduce<VideoProps | null>((mostRecent, current) => {
      if (!mostRecent) return current

      return getPublishedTimestamp(current) > getPublishedTimestamp(mostRecent)
        ? current
        : mostRecent
    }, null)
}

export default function TrailerButton({ trailer }: TrailerButtonProps) {
  const selectedTrailer = getMostRecentTrailer(trailer.results ?? [])

  if (!selectedTrailer) return null

  const trailerUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(selectedTrailer.key)}`

  return (
    <a
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.buttonTrailer}
      title="Abrir trailer no YouTube"
      aria-label="Assistir ao trailer no YouTube; abre em uma nova aba"
    >
      <MdOutlineMovie className={styles.movieIcon} aria-hidden="true" />

      <span>Trailer</span>

      <FiExternalLink className={styles.externalIcon} aria-hidden="true" />
    </a>
  )
}

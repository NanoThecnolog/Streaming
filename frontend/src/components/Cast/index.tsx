import { useState } from 'react'
import Image from 'next/image'
import { FaCircleUser } from 'react-icons/fa6'

import { CastingProps } from '@/@types/movie/cast'

import styles from './styles.module.scss'

interface CastComponentProps {
  actor: CastingProps
}

export default function Cast({ actor }: CastComponentProps) {
  const [imageError, setImageError] = useState(false)

  const character = actor.roles?.[0]?.character?.trim() ?? actor.character?.trim()

  const episodeCount = actor.total_episode_count ?? 0

  const hasProfileImage = Boolean(actor.profile_path) && !imageError

  const profileImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w342${actor.profile_path}`
    : null

  return (
    <article className={styles.castCard}>
      <div className={styles.castImage}>
        {hasProfileImage && profileImage ? (
          <Image
            fill
            quality={65}
            sizes="
                            (max-width: 570px) 46vw,
                            (max-width: 915px) 25vw,
                            150px
                        "
            src={profileImage}
            alt={`Foto de ${actor.name}`}
            className={styles.profileImage}
            placeholder="blur"
            blurDataURL="/blurImage.png"
            onError={() => setImageError(true)}
          />
        ) : (
          <FaCircleUser className={styles.placeholderIcon} aria-hidden="true" />
        )}
      </div>

      <div className={styles.castInfo}>
        <h3 className={styles.name}>{actor.name}</h3>

        {character && <p className={styles.character}>{character}</p>}

        {episodeCount > 0 && (
          <p className={styles.episodes}>
            {episodeCount} {episodeCount === 1 ? 'episódio' : 'episódios'}
          </p>
        )}
      </div>
    </article>
  )
}

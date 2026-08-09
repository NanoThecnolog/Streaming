import { useId } from 'react'

import { CastingProps } from '@/@types/movie/cast'
import Cast from '@/components/Cast'

import styles from './styles.module.scss'

interface CastContainerProps {
  cast: CastingProps[]
  limit?: number
}

export default function CastContainer({ cast, limit = 20 }: CastContainerProps) {
  const titleId = useId()

  if (cast.length === 0) return null

  const visibleCast = cast.slice(0, limit)

  return (
    <section className={styles.cast} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Elenco
        </h2>
      </header>

      <div className={styles.castContainer}>
        {visibleCast.map((actor) => (
          <Cast key={actor.id} actor={actor} />
        ))}
      </div>
    </section>
  )
}

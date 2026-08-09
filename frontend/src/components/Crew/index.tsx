import { CrewProps } from '@/@types/movie/crew'
import { translate } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

interface CrewComponentProps {
  crew: CrewProps
}

const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toLocaleUpperCase('pt-BR')
}

export default function Crew({ crew }: CrewComponentProps) {
  const name = crew.name?.trim()

  if (!name) return null

  const translatedJob = crew.job ? translate(crew.job) || crew.job : null

  return (
    <article className={styles.crewMember}>
      <div className={styles.initials} aria-hidden="true">
        {getInitials(name)}
      </div>

      <div className={styles.crewInfo}>
        <h4 className={styles.name} title={name}>
          {name}
        </h4>

        {translatedJob && (
          <p className={styles.job} title={translatedJob}>
            {translatedJob}
          </p>
        )}
      </div>
    </article>
  )
}

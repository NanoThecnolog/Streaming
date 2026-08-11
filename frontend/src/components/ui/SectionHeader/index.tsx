import Link from 'next/link'

import styles from './styles.module.scss'

interface SectionHeaderProps {
  title: string
  eyebrow?: string
  actionHref?: string
  actionLabel?: string
  headingId?: string
}

export default function SectionHeader({
  title,
  eyebrow,
  actionHref,
  actionLabel,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className={styles.heading}>
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2 id={headingId}>{title}</h2>
      </div>

      {actionHref && actionLabel && <Link href={actionHref}>{actionLabel}</Link>}
    </div>
  )
}

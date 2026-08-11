import styles from './styles.module.scss'

interface NewContentProps {
  type: 'season' | 'episode' | 'news'
}

export default function NewContent({ type }: NewContentProps) {
  const labels: Record<NewContentProps['type'], string> = {
    season: 'Nova temporada',
    news: 'Nova série',
    episode: 'Novos episódios',
  }

  return <span className={styles.container}>{labels[type]}</span>
}

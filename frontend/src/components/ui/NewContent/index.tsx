import { Heading3 } from 'lucide-react'
import styles from './styles.module.scss'

interface NewContentProps {
    type: 'season' | 'episode' | 'news'
}

export default function NewContent({ type }: NewContentProps) {
    return (
        <div className={styles.container}>
            <h3>{type === 'season' ? 'Nova temporada' : type === 'news' ? 'Novidade' : 'Novos Episódios'}</h3>
        </div>
    )
}
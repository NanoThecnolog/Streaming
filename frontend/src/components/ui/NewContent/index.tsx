import { Heading3 } from 'lucide-react'
import styles from './styles.module.scss'

interface NewContentProps {
    type: 'season' | 'episode'
}

export default function NewContent({ type }: NewContentProps) {
    return (
        <div className={styles.container}>
            {type === 'season' ? <h3>Nova temporada</h3> : <h3>Novos Episódios</h3>}
        </div>
    )
}
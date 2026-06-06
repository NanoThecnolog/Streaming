import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { TbPlayerTrackNextFilled } from 'react-icons/tb'

interface NextProps {
    nextEP: (e: boolean) => void
    hasNextEP: boolean
}
export interface NextEpisodeProps {
    season: number,
    episode: number,
    src: string,
}

export default function NextEpisode({ nextEP, hasNextEP }: NextProps) {

    return (
        <div className={styles.container}>
            <button
                className={styles.next}
                onClick={() => nextEP(false)}
                disabled={!hasNextEP}
                type='button'
            >
                <TbPlayerTrackNextFilled size={25} />
                Próximo Episódio
            </button>
        </div>
    )
}
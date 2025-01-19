import { MdOutlineMovie } from 'react-icons/md'
import styles from './styles.module.scss'
import { TrailerProps } from '@/@types/trailer'

interface TrailerButtonProps {
    trailer: TrailerProps
}

export default function TrailerButton({ trailer }: TrailerButtonProps) {
    return (
        <div className={styles.buttonTrailer}>
            <a href={`https://www.youtube.com/watch?v=${trailer.results[0].key}`} target='_blank' rel='noopener noreferrer'>
                <button type='button'>
                    <p><MdOutlineMovie size={25} /></p>
                    <p>Trailer</p>
                </button>
            </a>
        </div>
    )
}
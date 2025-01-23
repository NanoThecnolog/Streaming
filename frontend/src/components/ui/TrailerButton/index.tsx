import { MdOutlineMovie } from 'react-icons/md'
import styles from './styles.module.scss'
import { TrailerProps } from '@/@types/trailer'

interface TrailerButtonProps {
    trailer: TrailerProps
}

export default function TrailerButton({ trailer }: TrailerButtonProps) {

    const urlTrailer = trailer.results
        .filter(t => t.official && t.type.toLowerCase() === 'trailer').reduce((mostRecent, current) => {
            return new Date(current.published_at) > new Date(mostRecent.published_at) ? current : mostRecent;
        })
    console.log(urlTrailer)
    return (
        <>
            {urlTrailer &&
                <div className={styles.buttonTrailer}>
                    <a href={`https://www.youtube.com/watch?v=${urlTrailer.key}`} target='_blank' rel='noopener noreferrer'>
                        <button type='button'>
                            <p><MdOutlineMovie size={25} /></p>
                            <p>Trailer</p>
                        </button>
                    </a>
                </div>
            }
        </>

    )
}
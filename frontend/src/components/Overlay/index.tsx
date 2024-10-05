import styles from './styles.module.scss';
import Link from 'next/link';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';


interface OverlayProps {
    title: string,
    subtitle?: string,
    src: string,
    duration: string,
    genero: string[]

    modalVisible: () => void;
}

export default function Overlay({ title, subtitle, src, duration, genero, modalVisible }: OverlayProps) {

    const movie = new URLSearchParams({
        title: `${title}`,
        subTitle: `${subtitle}` || "",
        src: `${src}`
    });
    const playLink: string = `/watch?${movie}`

    function handleFavorite() {
        toast.warning("A função de adicionar filme aos favoritos está temporariamente desabilitada.")
    }
    function handleWatchLater() {
        toast.warning("A função de adicionar filme a assistir mais tarde está temporariamente desabilitada.")
    }

    return (
        <>
            <h3>{title.toUpperCase()}</h3>
            {subtitle && (
                <h4>{subtitle}</h4>
            )}
            <p>{duration} - {genero.join(', ')}</p>

            <div className={styles.button_container}>
                <div className={styles.watch}>
                    <Link href={`${playLink}`}>
                        <button type='button'>
                            <FaPlay size={15} />
                        </button>
                    </Link>

                </div>
                <div className={styles.queue} onClick={handleWatchLater}>
                    <FaRegClock size={20} />
                </div>
                <div className={`${styles.star} ${styles.queue}`} onClick={handleFavorite}>
                    <FaStar size={20} />
                </div>
                <div className={`${styles.star} ${styles.queue}`} onClick={() => modalVisible()}>
                    <FaInfoCircle size={20} />
                </div>
            </div>
        </>
    )
}
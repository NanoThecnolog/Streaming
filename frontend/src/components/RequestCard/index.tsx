import { RequestCardProps } from '@/@types/RequestCard';
import styles from './styles.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Loading/spinner';
interface RequestCard {
    card: RequestCardProps;
    handleClick: (tmdbId: number) => void,
    loading: boolean
}
export default function RequestCard({ card, handleClick, loading }: RequestCard) {
    const [poster, setPoster] = useState<string | null>(null)
    useEffect(() => {
        if (card.poster_path) {
            const urlPoster = `https://image.tmdb.org/t/p/original${card.poster_path}`
            setPoster(urlPoster)
        }
    }, [card])

    return (
        <>{
            poster &&
            <div className={styles.card}>
                <Image
                    src={poster}
                    alt={card.title ?? 'poster image'}
                    fill
                    placeholder="blur"
                    blurDataURL="/blurImage.png"
                    quality={35}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                />
                <div className={`${styles.buttonContainer} ${loading && styles.loading}`}>
                    <div>
                        {
                            loading ? <Spinner /> : <button onClick={() => handleClick(card.id)}>Solicitar</button>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
}
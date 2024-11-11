import { ResultsProps } from '@/@types/collection'
import styles from './styles.module.scss'
import Image from 'next/image';

interface CardProps {
    card: ResultsProps;
}

export default function CardCollection({ card }: CardProps) {
    const poster = `https://image.tmdb.org/t/p/original/${card.poster_path}`


    return (
        <div className={styles.collectionContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={poster}
                    fill
                    placeholder='blur'
                    blurDataURL='/blurImage.png'
                    quality={35}
                    priority
                    sizes="100%"
                    alt={card.name}
                />
            </div>
        </div>
    )
}
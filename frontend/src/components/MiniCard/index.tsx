import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useTMDB } from '@/contexts/TMDBContext';
import { useEffect, useState } from 'react';
import { tmdb } from '@/classes/TMDB';

interface MiniProps {
    card: CardsProps
}
interface TMDBImagesProps {
    backdrop: string
}

export default function MiniCard({ card }: MiniProps) {
    const router = useRouter();
    const { allData, cachedImages, setCachedImage } = useTMDB()
    const [TMDBImages, setTMDBImages] = useState<TMDBImagesProps>()

    useEffect(() => {
        async function getImage() {
            if (cachedImages[card.tmdbId]) {
                setTMDBImages({ backdrop: cachedImages[card.tmdbId] })
            } else {
                const data = allData.find(data => data.id === card.tmdbId)
                const url = data ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}` : await tmdb.fetchMovieBackDrop(card.tmdbId)

                if (url) {
                    setTMDBImages({ backdrop: url })
                    setCachedImage(card.tmdbId, url)
                }
            }
        }
        getImage()
    }, [card, allData, cachedImages, setCachedImage])

    function handleClick() {
        router.push(`/movie/${card.tmdbId}`)
    }
    return (
        <div className={styles.container}>
            <Image
                src={TMDBImages ? TMDBImages.backdrop : card.background}
                alt={card.title}
                fill
                placeholder="blur"
                blurDataURL="/blurImage.png"
                quality={90}
                priority
                className={styles.backgroundImage}
                sizes="100%"
                onClick={() => handleClick()}
            />
        </div>
    )
}
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import { SeriesProps } from "@/@types/series";
import { fetchTMDBSeries } from '@/services/fetchTMDBData';
import { useRouter } from 'next/router';
import { useTMDB } from '@/contexts/TMDBContext';
import NewContent from '@/components/ui/NewContent';

interface CardProps {
    card: SeriesProps;
}
interface TMDBImageProps {
    poster: string
}
export default function Card({ card }: CardProps) {
    const router = useRouter()
    const [TMDBImage, setTMDBImage] = useState<TMDBImageProps>()
    const { serieData, cachedImages, setCachedImage } = useTMDB()

    useEffect(() => {
        async function getImage() {
            try {
                if (cachedImages[card.tmdbID]) {
                    setTMDBImage({ poster: cachedImages[card.tmdbID] })
                } else {
                    const data = serieData.find(data => data.id === card.tmdbID)
                    if (data) {
                        const url = `https://image.tmdb.org/t/p/original${data.poster_path}`;
                        setTMDBImage({ poster: url })
                        setCachedImage(card.tmdbID, url)
                    } else {
                        const url = await fetchTMDBSeries(card.tmdbID)
                        if (url) {
                            const posterImage = `https://image.tmdb.org/t/p/original${url.poster_path}`
                            setTMDBImage({ poster: posterImage })
                            setCachedImage(card.tmdbID, posterImage)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getImage()
    }, [card, serieData, cachedImages, setCachedImage])

    /**useEffect(() => {
        async function getImage() {
            const data = serieData.find(data => data.id === card.tmdbID)
            if (data) {
                const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
                setTMDBImage({ poster: posterUrl })
            } else {
                try {
                    const serie = await fetchTMDBSeries(card.tmdbID)
                    if (!serie) return
                    const posterUrl = `https://image.tmdb.org/t/p/original${serie.poster_path}`
                    setTMDBImage({ poster: posterUrl })
                } catch (err) {
                    console.log("Erro na busca da série: ", err)
                }
            }
        }
        getImage()
    }, [card, serieData])*/

    function handleClick() {
        router.push(`/series/serie/${card.tmdbID}`)
    }
    return (
        <>
            <div key={card.tmdbID} className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={TMDBImage ? TMDBImage.poster : card.overlay}
                    alt={card.title}
                    fill
                    placeholder="blur"
                    blurDataURL="/blurImage.png"
                    quality={35}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                    onClick={() => handleClick()}
                />
                {card.news &&
                    <div className={styles.newContentBox}>
                        <NewContent type={card.news.type} />
                    </div>
                }
            </div>
        </>
    )
}


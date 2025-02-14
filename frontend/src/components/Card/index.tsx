import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTMDBPoster } from "@/services/fetchTMDBData";
import { useRouter } from "next/router";
import { useTMDB } from "@/contexts/TMDBContext";

interface CardProps {
    card: CardsProps;
}
interface TMDBImagesProps {
    poster: string
}

export default function Card({ card }: CardProps) {
    const router = useRouter();
    const { allData } = useTMDB()
    const [TMDBImages, setTMDBImages] = useState<TMDBImagesProps>()
    //const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>(null)

    useEffect(() => {
        async function getImage() {

            /*if (cachedImages[card.tmdbId]) {
                setTMDBImages({ poster: cachedImages[card.tmdbId] })
            } else {*/
            const data = allData.find(data => data.id === card.tmdbId)
            const url = data ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : await fetchTMDBPoster(card.tmdbId)

            if (url) {
                setTMDBImages({ poster: url })
                //setCachedImage(card.tmdbId, url)
            }

        }
        getImage()
    }, [card, allData])

    function handleClick() {
        router.push(`/movie/${card.tmdbId}`)
    }

    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={TMDBImages ? TMDBImages.poster : card.overlay}
                    alt={card.title}
                    fill
                    placeholder="blur"
                    blurDataURL="/blurImage.png"
                    quality={85}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                    onClick={() => handleClick()}
                />
            </div>
        </>
    )
}
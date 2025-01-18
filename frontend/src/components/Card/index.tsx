import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import { updateUserCookie } from "@/services/cookieClient";
import { fetchTMDBMovie, fetchTMDBPoster } from "@/services/fetchTMDBData";
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
    const [movie, setMovie] = useState<MovieTMDB>()
    const { allData } = useTMDB()
    const [TMDBImages, setTMDBImages] = useState<TMDBImagesProps>()
    //const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>(null)


    useEffect(() => {
        async function getImage() {
            const data = allData.find(data => data.id === card.tmdbId)
            if (data) {
                const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
                setTMDBImages({ poster: posterUrl })
            } else {
                const posterUrl = await fetchTMDBPoster(card.tmdbId)
                if (!posterUrl) return
                setTMDBImages({ poster: posterUrl })
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
                    quality={35}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                    onClick={() => handleClick()}
                />
            </div>
        </>
    )
}


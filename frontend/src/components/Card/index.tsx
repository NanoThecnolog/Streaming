import { CardsProps } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTMDB } from "@/contexts/TMDBContext";
import { SeriesProps } from "@/@types/series";
import { debug } from "@/classes/DebugLogger";
import { tmdb } from "@/classes/TMDB";

interface CardProps {
    card: CardsProps | SeriesProps;
}
interface TMDBImagesProps {
    poster: string
}

export default function Card({ card }: CardProps) {
    const router = useRouter();
    const { allData, serieData } = useTMDB()
    const [TMDBImages, setTMDBImages] = useState<TMDBImagesProps>()
    debug.log("Imagens no card: ", TMDBImages)

    useEffect(() => {
        async function getImage() {
            if ('season' in card) {
                const data = serieData.find(data => data.id === card.tmdbID)
                //debug.log('serie no card: ', data)
                const url = data ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : await tmdb.fetchSeriesDetails(card.tmdbID)

                if (url) {
                    if (typeof url === 'string') setTMDBImages({ poster: url })
                    else if ('poster_path' in url) {
                        const posterUrl = `https://image.tmdb.org/t/p/w500${url.poster_path}`
                        setTMDBImages({ poster: posterUrl })
                    }
                }
            } else {
                const data = allData.find(data => data.id === card.tmdbId)
                //debug.log('movie no card: ', data)
                const url = data ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : await tmdb.fetchMoviePoster(card.tmdbId)

                if (url) setTMDBImages({ poster: url })
                else { debug.error('url não definida') }
            }


        }
        getImage()
    }, [card, allData])

    function handleClick() {
        if ('season' in card) {
            router.push(`/series/serie/${card.tmdbID}`)
        } else {
            router.push(`/movie/${card.tmdbId}`)
        }
    }

    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <img
                    src={TMDBImages ? TMDBImages.poster : card.overlay}
                    alt={card.title}
                    className={styles.backgroundImage}
                    onClick={() => handleClick()}
                />
            </div>
        </>
    )
}
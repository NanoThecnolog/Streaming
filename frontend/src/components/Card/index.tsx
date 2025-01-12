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
    const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>(null)


    useEffect(() => {
        const data = allData.find(data => data.id === card.tmdbId)
        if (data) {

            const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
            setTMDBMovie(data)
            setTMDBImages({ poster: posterUrl })
        }
        //handleMovieData()
    }, [card])

    /*async function handleMovieData() {
        if (card.tmdbId === 0 || !card.tmdbId) return console.error("TMDBID inválido.", card.tmdbId)
        try {
            const movieData = await fetchTMDBMovie(card.tmdbId)
            if (movieData) {
                setState(prev => ({ ...prev, vote_average: movieData.vote_average }))
                setState(prev => ({ ...prev, adult: movieData.adult }))
                setState(prev => ({ ...prev, runtime: movieData.runtime }))
                setState(prev => ({ ...prev, genres: movieData.genres }))
                setMovie(movieData)
            }
            await handlePosterImage()
        } catch (err: any) {
            console.log("Erro ao buscar dados do filme", err?.response?.data?.error)
            return null
        }
    }
    async function handlePosterImage() {
        if (card.tmdbId === 0) return

        if (movie) {
            const imageURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`
            setState(prev => ({ ...prev, TMDBImage: imageURL }))

        } else {
            const imageURL = await fetchTMDBPoster(card.tmdbId)
            if (!imageURL) {
                console.log("Erro ao buscar TMDBPoster")
            } else {
                setState(prev => ({ ...prev, TMDBImage: imageURL }))
            }
        }
    }*/

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


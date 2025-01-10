import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import CardInfoModal from "../modals/CardInfos";
import Overlay from "../Overlay";
import { updateUserCookie } from "@/services/cookieClient";
import { fetchTMDBMovie, fetchTMDBPoster } from "@/services/fetchTMDBData";
import { useRouter } from "next/router";

interface CardProps {
    card: CardsProps;
}
type StateProps = {
    modalVisible: boolean,
    TMDBImage: string | null,
    vote_average: number,
    adult: boolean,
    runtime: number,
    genres:
    {
        id: number,
        name: string
    }[]

}

export default function Card({ card }: CardProps) {
    const router = useRouter();
    const [state, setState] = useState<StateProps>({
        modalVisible: false,
        TMDBImage: null,
        vote_average: 0,
        adult: false,
        runtime: 0,
        genres: [
            {
                id: 0,
                name: ""
            }
        ]
    })
    const { modalVisible, TMDBImage } = state

    useEffect(() => {
        const fetchUserData = async () => {
            await updateUserCookie()
        }
        fetchUserData()
    }, [modalVisible])


    useEffect(() => {
        setState(prev => ({ ...prev, TMDBImage: null }))
        handlePosterImage();
        handleMovieData()
    }, [card])

    async function handleMovieData() {
        if (card.tmdbId === 0 || !card.tmdbId) return console.error("TMDBID inválido.", card.tmdbId)
        try {
            const movieData = await fetchTMDBMovie(card.tmdbId)
            if (movieData) {
                setState(prev => ({ ...prev, vote_average: movieData.vote_average }))
                setState(prev => ({ ...prev, adult: movieData.adult }))
                setState(prev => ({ ...prev, runtime: movieData.runtime }))
                setState(prev => ({ ...prev, genres: movieData.genres }))
            }
        } catch (err: any) {
            console.log("Erro ao buscar dados do filme", err?.response?.data?.error)
            return null
        }
    }

    async function handlePosterImage() {
        if (card.tmdbId === 0) return
        const imageURL = await fetchTMDBPoster(card.tmdbId)
        if (!imageURL) {
            console.log("Erro ao buscar TMDBPoster")
        } else {
            setState(prev => ({ ...prev, TMDBImage: imageURL }))
        }
    }
    function handleClick() {
        router.push(`/movie/${card.tmdbId}`)
    }
    async function handleModalClose() {
        setState(prev => ({ ...prev, modalVisible: false }))
    }
    function modalVisibility() {
        setState(prev => ({ ...prev, modalVisible: true }))
    }

    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={TMDBImage ? TMDBImage : card.overlay}
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


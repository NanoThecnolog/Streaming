import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import CardInfoModal from "../modals/CardInfos";
import Overlay from "../Overlay";
import { updateUserCookie } from "@/services/cookieClient";
import { fetchTMDBMovie, fetchTMDBPoster } from "@/services/fetchTMDBData";

interface CardProps {
    card: CardsProps;
}
type StateProps = {
    modalVisible: boolean,
    TMDBImage: string | null,
    vote_average: number,
}

export default function Card({ card }: CardProps) {
    const [state, setState] = useState<StateProps>({
        modalVisible: false,
        TMDBImage: null,
        vote_average: 0
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
    }, [card, modalVisible])

    async function handleMovieData() {
        if (card.tmdbId === 0 || !card.tmdbId) return console.error("TMDBID inválido.", card.tmdbId)
        try {
            const movieData = await fetchTMDBMovie(card.tmdbId)
            if (movieData) {
                setState(prev => ({ ...prev, vote_average: movieData.vote_average }))
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
        setState(prev => ({ ...prev, modalVisible: !prev.modalVisible }))
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
                <div className={styles.overlay}>
                    <Overlay
                        tmdbId={card.tmdbId}
                        title={card.title}
                        subtitle={card.subtitle}
                        src={card.src}
                        duration={card.duration}
                        genero={card.genero}
                        vote_average={state.vote_average}
                        modalVisible={modalVisibility}
                        isVisible={modalVisible}
                    />
                </div>
            </div>
            {modalVisible &&
                <div className={styles.modalInfo}>
                    <CardInfoModal
                        card={card}
                        average={state.vote_average}
                        handleModalClose={handleModalClose}
                    />
                </div>
            }
        </>
    )
}


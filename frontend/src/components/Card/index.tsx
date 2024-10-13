import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import CardInfoModal from "../modals/CardInfos";
import Overlay from "../Overlay";
import { fetchTMDBPoster } from "@/services/fetchTMDBPoster";

interface CardProps {
    card: CardsProps;
}

export default function Card({ card }: CardProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [movieData, setMovieData] = useState<MovieTMDB>()
    const [TMDBImage, setTMDBImage] = useState<string | null>(null)

    useEffect(() => {
        handlePosterImage();
    }, [])

    async function handlePosterImage() {
        if (card.tmdbId === 0) return
        const imageURL = await fetchTMDBPoster(card.tmdbId)
        if (!imageURL) {
            console.log("Erro em movieData")
        } else {
            setTMDBImage(imageURL)
            console.log(imageURL)
        }
    }
    function handleClick() {
        setModalVisible(!modalVisible)
    }
    function handleModalClose() {
        setModalVisible(false)
    }
    function modalVisibility() {
        setModalVisible(true)
    }

    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={movieData ? movieData.poster_path : card.overlay}
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
                        title={card.title}
                        subtitle={card.subtitle}
                        src={card.src}
                        duration={card.duration}
                        genero={card.genero}
                        modalVisible={modalVisibility}
                    />
                </div>
            </div>
            {modalVisible &&
                <div className={styles.modalInfo}>
                    <CardInfoModal
                        card={card}
                        handleModalClose={handleModalClose}
                    />
                </div>
            }
        </>
    )
}


import { CardsProps, MovieTMDB } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import CardInfoModal from "../modals/CardInfos";
import Overlay from "../Overlay";
import { fetchTMDBPoster } from "@/services/fetchTMDBPoster";
import { setCookieClient } from "@/services/cookieClient";

interface CardProps {
    card: CardsProps;
}

export default function Card({ card }: CardProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [TMDBImage, setTMDBImage] = useState<string | null>(null)

    useEffect(() => {
        setCookieClient();
    }, [modalVisible])


    useEffect(() => {
        setTMDBImage(null);
        handlePosterImage();
    }, [card])

    async function handlePosterImage() {
        if (card.tmdbId === 0) return
        const imageURL = await fetchTMDBPoster(card.tmdbId)
        if (!imageURL) {
            console.log("Erro ao buscar TMDBPoster")
        } else {
            setTMDBImage(imageURL)
        }
    }
    function handleClick() {
        setModalVisible(!modalVisible)
    }
    async function handleModalClose() {
        setModalVisible(false)
    }
    function modalVisibility() {
        setModalVisible(true)
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
                        title={card.title}
                        subtitle={card.subtitle}
                        src={card.src}
                        duration={card.duration}
                        genero={card.genero}
                        modalVisible={modalVisibility}
                        isVisible={modalVisible}
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


import { cards } from "@/js/cards";
import { CardsProps } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import CardInfoSerieModal from "../CardInfos";

import { toast } from "react-toastify";
import { SeriesProps } from "@/@types/series";


interface CardProps {
    card: SeriesProps;
    section?: string;
    modalWatchLater?: (title: string, subTitle?: string) => void;
}



export default function Card({ card, section, modalWatchLater }: CardProps) {

    function handleClick() {
        setModalVisible(!modalVisible)
    }
    function handleModalClose() {
        console.log("Click")
        setModalVisible(false)
    }

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    //const [sessão, setSessão] = useState<string | undefined>(section)

    //ajustar os parametros passados pra pagina watch
    //criar uma pagina watch para series
    const movie = new URLSearchParams({
        title: `${card.title}`,
        subTitle: `${card.subtitle}` || "",
        src: `${card.season[0].episodes[0].src}`,
        episode: `${card.season[0].episodes[0].ep}`,
        season: `${card.season[0].s}`
    });
    function handleWatchLater() {
        toast.warning("A função de adicionar filme a assistir mais tarde está temporariamente desabilitada.")
    }
    function handleFavorite() {
        toast.warning("A função de adicionar filme aos favoritos está temporariamente desabilitada.")
    }

    const play: string = `/watch/serie?${movie}`
    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={card.overlay}
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
                    <h3>{card.title.toUpperCase()}</h3>
                    {card.subtitle && (
                        <h4>{card.subtitle}</h4>
                    )}
                    <p>
                        {card.season.length > 1
                            ? `${card.season.length} temporadas`
                            : card.season.length === 1
                            && `${card.season.length} temporada`} - {card.genero.join(', ')}
                    </p>

                    <div className={styles.button_container}>
                        <div className={styles.watch}>
                            <Link href={`${play}`}>
                                <button>
                                    <FaPlay size={15} />
                                </button>
                            </Link>
                        </div>
                        <div className={styles.queue} onClick={handleWatchLater}>
                            <FaRegClock size={20} />
                        </div>
                        <div className={`${styles.star} ${styles.queue}`} onClick={handleFavorite}>
                            <FaStar size={20} />
                        </div>
                        <div className={`${styles.star} ${styles.queue}`} onClick={() => setModalVisible(true)}>
                            <FaInfoCircle size={20} />
                        </div>
                    </div>
                </div>

            </div>

            {modalVisible &&
                <div className={styles.modalInfo}>
                    {

                        <CardInfoSerieModal
                            card={card}
                            handleModalClose={handleModalClose}
                        />

                    }
                </div>
            }
        </>
    )
}


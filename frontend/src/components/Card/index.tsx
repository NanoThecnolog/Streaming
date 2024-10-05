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
import CardInfoModal from "../modals/CardInfos";
import { toast } from "react-toastify";
import Overlay from "../Overlay";
import { Play } from "lucide-react";


interface CardProps {
    card: CardsProps;


}



export default function Card({ card }: CardProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    function handleClick() {
        setModalVisible(!modalVisible)
    }
    function handleModalClose() {
        console.log("Click")
        setModalVisible(false)
    }
    function modalVisibility() {
        setModalVisible(true)
    }

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


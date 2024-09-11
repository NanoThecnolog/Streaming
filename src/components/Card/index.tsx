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


interface CardProps {
    card: CardsProps;
    section: string;
    modalWatchLater: (title: string, subTitle?: string) => void;
}



export default function Card({ card, section, modalWatchLater }: CardProps) {

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [sessão, setSessão] = useState<string>(section)
    const movie = new URLSearchParams({
        title: `${card.title}`,
        subTitle: `${card.subtitle}` || "",
        src: `${card.src}`
    });

    const play: string = `/watch?${movie}`
    return (
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
            />
            <div className={styles.overlay}>
                <h3>{card.title.toUpperCase()}</h3>
                {card.subtitle && (
                    <h4>{card.subtitle}</h4>
                )}
                <p>{card.duration} - {card.genero.join(', ')}</p>

                <div className={styles.button_container}>
                    <div className={styles.watch}>
                        <Link href={`${play}`}>
                            <button>
                                <FaPlay size={15} />
                            </button>
                        </Link>

                    </div>
                    <div className={styles.queue}>
                        <FaRegClock size={20} />
                    </div>
                    <div className={`${styles.star} ${styles.queue}`}>
                        <FaStar size={20} />
                    </div>
                    <div className={`${styles.star} ${styles.queue}`} onClick={() => setModalVisible(true)}>
                        <FaInfoCircle size={20} />
                    </div>
                </div>
            </div>

        </div>
    )
}


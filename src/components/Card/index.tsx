import { cards } from "@/js/cards";
import styles from './styles.module.scss'
import { useState } from "react";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

interface CardProps {
    section: string;
    modalWatchLater: (title: string, subTitle?: string) => void;
}



export default function Card({ section, modalWatchLater }: CardProps) {
    const [modalVisible, setModalVisible] = useState(false)
    const [sessão, setSessão] = useState<string>(section)
    return (
        <div>
            {cards.map((card, index) => {
                if (sessão?.toLowerCase() === card.genero[0].toLowerCase()) {
                    const movie = new URLSearchParams({
                        title: `${card.title}`,
                        subTitle: `${card.subtitle}` || "",
                        src: `${card.src}`
                    });

                    const play = `/watch?${movie}`

                    return (
                        <div key={index} className={styles.card} id={card.genero[0].toLowerCase()} style={{ backgroundImage: `url(${card.background})` }}>
                            <div className={styles.overlay}>
                                <h4>{card.title.toUpperCase()}</h4>
                                {card.subtitle && (
                                    <h6>{card.subtitle}</h6>
                                )}
                                <p>{card.duration} - {card.description}</p>

                                <div className={styles.button_container}>
                                    <div className={styles.watch}>
                                        <Link href={`${play}`}><FaCirclePlay size={35} color="#772626" /></Link>

                                    </div>
                                    <div className={styles.queue}>
                                        <FaRegClock size={35} color="#fff" />
                                    </div>
                                    <div className={`${styles.star} ${styles.queue}`}>

                                        <FaStar size={35} color="#fff" />
                                    </div>
                                    <div className={`${styles.star} ${styles.queue}`} onClick={() => setModalVisible(true)}>
                                        <FaInfoCircle size={25} color="#fff" />
                                    </div>
                                </div>
                            </div>
                            {
                                //Modal
                            }
                            {modalVisible && (
                                <div className={styles.movie_desc}>
                                    <div className={styles.modal_content}>
                                        <div className={styles.desc_image} style={{ backgroundImage: `url(${card.background})` }}>
                                            <div>
                                                <div className={styles.close_btn} onClick={() => setModalVisible(false)}>
                                                    <IoCloseCircle size={35} color="#313131" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.desc_top}>
                                            <h1>{card.title}</h1>
                                            {card.subtitle && (
                                                <h3 className={styles.subtitulo}>{card.subtitle}</h3>
                                            )}
                                            <div className={styles.button_selection}>
                                                <div className={styles.watch}>
                                                    <Link href={`${play}`}>
                                                        <h3>Play</h3>
                                                        <FaCirclePlay size={35} color="#772626" />
                                                    </Link>
                                                </div>
                                                <div className={styles.queue} onClick={() => modalWatchLater(card.title, card.subtitle)}>
                                                    <h3>Assistir mais tarde</h3>
                                                    <IoIosAddCircleOutline size={35} color="#fff" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className={styles.gen_mid}>
                                            <p>{card.genero.map((gen, index) => (
                                                <span key={index}>{gen}{index < card.genero.length - 1 && ", "}</span>
                                            ))}
                                            </p>
                                        </div>
                                        <div className={styles.desc_mid}>
                                            <p>{card.description}</p>
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    )

                }
            })}
        </div>
    )
}


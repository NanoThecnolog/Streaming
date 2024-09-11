import { CardsProps } from "@/@types/Cards"
import styles from './styles.module.scss'
import { IoCloseCircle } from "react-icons/io5"
import { FaCirclePlay } from "react-icons/fa6"
import Link from "next/link"
import { IoIosAddCircleOutline } from "react-icons/io"

export default function CardInfoModal(card: CardsProps) {


    function setModalVisible(state: boolean) {

    }
    function modalWatchLater(title: string, subTitle?: string) {

    }

    const movie = new URLSearchParams({
        title: `${card.title}`,
        subTitle: `${card.subtitle}` || "",
        src: `${card.src}`
    });

    const play: string = `/watch?${movie}`

    return (

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

    )
}
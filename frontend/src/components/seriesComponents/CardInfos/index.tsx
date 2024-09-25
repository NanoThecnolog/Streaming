import { CardsProps } from "@/@types/Cards"
import styles from './styles.module.scss'
import { IoCloseCircle } from "react-icons/io5"
import { FaCirclePlay } from "react-icons/fa6"
import { IoIosAddCircleOutline } from "react-icons/io"
import Router from "next/router"
import { CircleX, CircleXIcon, X } from "lucide-react"
import { toast } from "react-toastify"
import { SeriesProps } from "@/@types/series"

interface InfoModalProps {
    card: SeriesProps;
    handleModalClose: () => void
}

export default function CardInfoSerieModal({ card, handleModalClose }: InfoModalProps) {

    function modalWatchLater(title: string, subTitle?: string) {
        toast.warning("A função de adicionar filme a assistir mais tarde está temporariamente desabilitada.")

    }

    function handlePlay() {
        const serie = new URLSearchParams({
            title: `${card.title}`
        })
        Router.push(`/series/serie?${serie}`)
    }

    return (

        <div className={styles.movie_desc}>
            <div className={styles.modal_content}>
                <div className={styles.desc_image} style={{ backgroundImage: `url(${card.background})`, backgroundPosition: 'center' }}>
                    <div className={styles.imageBackground}>
                        <div className={styles.close_btn} onClick={handleModalClose}>
                            <X size={30} />
                        </div>
                    </div>
                </div>
                <div className={styles.desc_top}>
                    <h1 className={styles.titulo}>{card.title} {card.subtitle && (
                        <span className={styles.subtitulo}> - {card.subtitle}</span>
                    )}</h1>

                    <div className={styles.button_container}>
                        <div className={styles.watch} onClick={handlePlay}>
                            <h3>Episódios</h3>
                        </div>
                        <div className={styles.queue} onClick={() => modalWatchLater(card.title, card.subtitle)}>
                            <h3>Assistir mais tarde</h3>
                            <IoIosAddCircleOutline size={35} color="#fff" />
                        </div>

                    </div>
                </div>
                <div className={styles.gen_mid}>
                    <p>&quot;
                        {card.genero.map((gen, index) => (
                            <span key={index}>{gen}{index < card.genero.length - 1 && ", "}</span>
                        ))}
                        &quot;
                    </p>
                    <p>
                        {card.season.length === 1 ? `${card.season.length} temporada` : card.season.length > 1 && `${card.season.length} temporadas`}
                    </p>
                </div>
                <div className={styles.desc_mid}>
                    <p>{card.description}</p>
                </div>
            </div>

        </div>

    )
}
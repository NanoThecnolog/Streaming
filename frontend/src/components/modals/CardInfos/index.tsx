import { CardsProps } from "@/@types/Cards"
import styles from './styles.module.scss'
import { IoCloseCircle } from "react-icons/io5"
import { FaCirclePlay } from "react-icons/fa6"
import { IoIosAddCircleOutline } from "react-icons/io"
import Router from "next/router"
import { CircleX, CircleXIcon, X } from "lucide-react"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { isOnTheList } from "@/services/isOnTheList"
import { UserProps } from "@/@types/user"
import { getCookieClient } from "@/services/cookieClient"
import { addWatchLater } from "@/services/addWatchLater"
import { FaCheck } from "react-icons/fa"
import { fetchTMDBPoster } from "@/services/fetchTMDBPoster"
import { fetchTMDBBackDrop } from "@/services/fetchTMDBBackDrop"

interface InfoModalProps {
    card: CardsProps;
    handleModalClose: () => void
}

export default function CardInfoModal({ card, handleModalClose }: InfoModalProps) {
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<UserProps>()
    const [TMDBImage, setTMDBImage] = useState<string | null>(null)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            //Router.push('/login')
            return
        }
        setUser(user)
    }, [])

    useEffect(() => {
        setTMDBImage(null);
        handlePosterImage();
        onList(card.title, card.subtitle)
    }, [card])

    async function handlePosterImage() {
        if (card.tmdbId === 0) return
        const imageURL = await fetchTMDBBackDrop(card.tmdbId)
        if (!imageURL) {
            console.log("Erro em movieData")
        } else {
            setTMDBImage(imageURL)
            console.log(imageURL)
        }
    }

    async function onList(title: string, subtitle?: string) {
        const onList: Promise<boolean> = isOnTheList(title, subtitle)
        onList.then(result => {
            if (!result) {
                setOnWatchLater(false)
            } else {
                setOnWatchLater(true)
            }
        })
    }



    async function modalWatchLater() {
        try {
            if (isLoading) return
            setIsLoading(true)
            if (!user) return Router.push('/login')
            const addFilme = await addWatchLater(user.id, card.title, card.subtitle);
            await onList(card.title, card.subtitle)
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        } finally {
            setIsLoading(false)
        }
    }


    const movie = new URLSearchParams({
        title: `${card.title}`,
        subTitle: `${card.subtitle}` || "",
        src: `${card.src}`
    });

    const play: string = `/watch?${movie}`

    function handlePlay() {
        Router.push(play)
    }

    return (

        <div className={styles.movie_desc}>
            <div className={styles.modal_content}>
                <div className={styles.desc_image} style={{
                    backgroundImage:
                        TMDBImage ? `url(${TMDBImage})` : `url(${card.background})`, backgroundPosition: 'center'
                }}>
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
                            <h3>Play</h3>
                            <FaCirclePlay size={35} color="#fff" />

                        </div>
                        <div className={styles.queue} onClick={() => modalWatchLater()}>
                            {onWatchLater ?
                                <>
                                    <h3>Adicionado à Lista</h3>
                                    <FaCheck size={20} color="#fff" />
                                </> : <>
                                    <h3>ASSISTIR MAIS TARDE</h3>
                                    <IoIosAddCircleOutline size={35} color="#fff" />
                                </>
                            }
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
                </div>
                <div className={styles.desc_mid}>
                    <p>{card.description}</p>
                </div>
            </div>

        </div>

    )
}
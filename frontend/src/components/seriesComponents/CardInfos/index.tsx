import { CardsProps } from "@/@types/Cards"
import styles from './styles.module.scss'
import { IoCloseCircle } from "react-icons/io5"
import { FaCheck, FaCirclePlay } from "react-icons/fa6"
import { IoIosAddCircleOutline } from "react-icons/io"
import Router from "next/router"
import { CircleX, CircleXIcon, X } from "lucide-react"
import { toast } from "react-toastify"
import { SeriesProps } from "@/@types/series"
import { useEffect, useState } from "react"
import { serieData } from "@/services/fetchSeries"
import { addWatchLater } from "@/services/addWatchLater"
import { isOnTheList } from "@/services/isOnTheList"
import { UserProps } from "@/@types/user"
import { getCookieClient, setCookieClient } from "@/services/cookieClient"

interface InfoModalProps {
    card: SeriesProps;
    handleModalClose: () => void
}

export default function CardInfoSerieModal({ card, handleModalClose }: InfoModalProps) {
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [overview, setOverview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [user, setUser] = useState<UserProps>()

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            return
        }
        setUser(user)
        cookie();
        onList(card.title, card.subtitle)

    }, [])
    async function cookie() {
        setCookieClient()
    }

    useEffect(() => {
        setTMDBBackDrop(null)
        setOverview(null)

        if (card.tmdbID === 0) {
            setTMDBBackDrop(null)
            setOverview(null)
            return
        }
        fetchSerieData()
    }, [card])
    async function fetchSerieData() {
        const serie = await serieData(card.tmdbID)
        if (!serie || !serie.backdrop_path || !serie.overview) {
            setTMDBBackDrop(null)
            setOverview(null)
            return
        }
        const backdropURL = `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
        setTMDBBackDrop(backdropURL)
        setOverview(serie.overview)
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

    async function modalWatchLater(title: string, subTitle?: string) {
        try {
            if (isLoading) return
            setIsLoading(true)
            if (!user) return Router.push('/login')
            await addWatchLater(user.id, card.title, card.subtitle);
            await onList(card.title, card.subtitle)
            await setCookieClient()
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        } finally {
            setIsLoading(false)
        }

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
                <div className={styles.desc_image} style={{ backgroundImage: `url(${TMDBBackDrop ? TMDBBackDrop : card.background})`, backgroundPosition: 'center' }}>
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
                    <p>
                        {card.season.length === 1 ? `${card.season.length} temporada` : card.season.length > 1 && `${card.season.length} temporadas`}
                    </p>
                </div>
                <div className={styles.desc_mid}>
                    <p>{overview ? overview : card.description}</p>
                </div>
            </div>

        </div>

    )
}
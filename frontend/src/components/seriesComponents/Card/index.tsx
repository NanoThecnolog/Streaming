import { cards } from "@/js/cards";
import { CardsProps } from "@/@types/Cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import CardInfoSerieModal from "../CardInfos";

import { toast } from "react-toastify";
import { SeriesProps } from "@/@types/series";
import { UserProps } from "@/@types/user";
import { getCookieClient, setCookieClient } from "@/services/cookieClient";
import { isOnTheList } from "@/services/isOnTheList";
import Router from "next/router";
import { addWatchLater } from "@/services/addWatchLater";
import { serieData } from "@/services/fetchSeries";


interface CardProps {
    card: SeriesProps;
    section?: string;
    modalWatchLater?: (title: string, subTitle?: string) => void;
}



export default function Card({ card, section, modalWatchLater }: CardProps) {
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [user, setUser] = useState<UserProps>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [TMDBPoster, setTMDBPoster] = useState<string | null>(null)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            return
        }
        setUser(user)
        setCookieClient();
    }, [])
    useEffect(() => {
        onList(card.title, card.subtitle)
    }, [card])
    useEffect(() => {
        setTMDBPoster(null)
        if (card.tmdbID === 0) {
            setTMDBPoster(null)
            return
        }
        fetchSerieData()
    }, [card])
    useEffect(() => {
        onList(card.title, card.subtitle)
    }, [modalVisible])
    async function fetchSerieData() {
        const serie = await serieData(card.tmdbID)
        if (!serie || !serie.poster_path) {
            setTMDBPoster(null)
            return
        }
        const posterURL = `https://image.tmdb.org/t/p/original${serie.poster_path}`
        setTMDBPoster(posterURL)
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

    function handleClick() {
        setModalVisible(!modalVisible)
    }
    function handleModalClose() {
        setModalVisible(false)
    }
    const movie = new URLSearchParams({
        title: `${card.title}`,
        subTitle: `${card.subtitle}` || "",
        src: `${card.season[0].episodes[0].src}`,
        episode: `${card.season[0].episodes[0].ep}`,
        season: `${card.season[0].s}`
    });
    async function handleWatchLater() {
        try {
            if (isLoading) return
            setIsLoading(true)
            if (!user) return Router.push('/login')
            await addWatchLater(user.id, card.title, card.subtitle);
            await onList(card.title, card.subtitle)
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        } finally {
            setIsLoading(false)
        }
    }
    function handleFavorite() {
        toast.warning("A função de adicionar filme aos favoritos está temporariamente desabilitada.")
    }

    const play: string = `/watch/serie?${movie}`
    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={TMDBPoster ? TMDBPoster : card.overlay}
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
                            {
                                onWatchLater ?
                                    <IoCheckmarkCircle title='Remover' size={25} className={styles.watchLater} />
                                    : <FaRegClock title='Adicionar' size={20} />
                            }
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


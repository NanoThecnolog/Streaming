import { cards } from '@/js/cards'
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { UserProps } from '@/@types/user';
import { getCookieClient } from '@/services/cookieClient';
import { addWatchLater } from '@/services/addWatchLater';
import { isOnTheList } from '@/services/isOnTheList';
import { FaCheck } from 'react-icons/fa';
import { fetchTMDBBackDrop } from '@/services/fetchTMDBBackDrop';
import { fetchTMDBPoster } from '@/services/fetchTMDBPoster';

interface TopProps {
    width?: number;
}

export default function Top({ width }: TopProps) {
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')
    const [user, setUser] = useState<UserProps | null>(null)
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [TMDBPoster, setTMDBPoster] = useState<string | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')
            setTimeout(() => {
                setCardOn(prevCardOn => (prevCardOn + 1) % cards.length);
                setFade('fadeIn')

            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [cardOn])

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            //Router.push('/login')
            return
        }
        setUser(user)
    }, [])
    useEffect(() => {
        if (!user) return
        onList(cards[cardOn].title, cards[cardOn].subtitle)
    }, [user, cardOn])

    useEffect(() => {
        if (cards[cardOn].tmdbId === 0) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        handleBackDropImage()
        handlePosterImage()
    }, [cardOn])

    async function handleBackDropImage() {
        const imageURL = await fetchTMDBBackDrop(cards[cardOn].tmdbId)
        if (!imageURL) {
            console.log("Erro ao buscar backdrop")
        } else {
            setTMDBBackDrop(imageURL)
            console.log(imageURL)
        }
    }
    async function handlePosterImage() {
        const imageURL = await fetchTMDBPoster(cards[cardOn].tmdbId)
        if (!imageURL) {
            console.log("Erro ao buscar poster")
        } else {
            setTMDBPoster(imageURL)
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
    async function toggleWatchLater(title: string, subtitle?: string) {
        try {
            if (isLoading) return
            setIsLoading(true)
            if (!user) return Router.push('/login')
            const addFilme = await addWatchLater(user.id, title, subtitle);
            await onList(cards[cardOn].title, cards[cardOn].subtitle)
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        } finally {
            setIsLoading(false)
        }
    }
    function handleWatch() {
        const movie = new URLSearchParams({
            title: `${cards[cardOn].title}`,
            subTitle: `${cards[cardOn].subtitle}` || "",
            src: `${cards[cardOn].src}`
        });
        const play: string = `/watch?${movie}`
        Router.push(play)
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`}
            style={{
                backgroundImage:
                    width && width <= 780 ?
                        TMDBPoster ? `url(${TMDBPoster})` : `url(${cards[cardOn].overlay})` :
                        TMDBBackDrop ? `url(${TMDBBackDrop})` : `url(${cards[cardOn].background})`
            }}>
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 className={styles.titulo_principal}>
                        {cards[cardOn].title.toUpperCase()}
                    </h1>
                    {cards[cardOn].subtitle && (
                        <h3 className={styles.subtitulo_principal}>{cards[cardOn].subtitle}</h3>
                    )}
                    <div className={styles.gen}>
                        <p>{cards[cardOn].genero.join(', ')}</p>
                    </div>
                    <div className={styles.description}>
                        <p>{cards[cardOn].description}</p>
                    </div>
                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={(e) => handleWatch()}>
                            <h3>Play</h3>
                            <FaCirclePlay color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={() => toggleWatchLater(cards[cardOn].title, cards[cardOn].subtitle)}>
                            {onWatchLater ?
                                <>
                                    <FaCheck />
                                    <h3>Adicionado à Lista</h3>
                                </> : <>
                                    <h3>ASSISTIR MAIS TARDE</h3>
                                    <IoIosAddCircleOutline />
                                </>
                            }


                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
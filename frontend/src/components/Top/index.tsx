import { cards } from '@/js/cards'
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { api } from '@/services/api';
import { UserProps } from '@/@types/user';
import { getCookieClient } from '@/services/cookieClient';
import { addWatchLater } from '@/services/addWatchLater';
import { isOnTheList } from '@/services/isOnTheList';
import { FaCheck } from 'react-icons/fa';


export default function Top() {
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')
    const [user, setUser] = useState<UserProps | null>(null)
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            Router.push('/login')
            return
        }
        setUser(user)
    }, [])
    useEffect(() => {
        if (!user) return
        onList(cards[cardOn].title, cards[cardOn].subtitle)
    }, [user, cardOn])

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
        <div className={`${styles.top_container} ${styles[fade]}`} style={{ backgroundImage: `url(${cards[cardOn].background})` }}>
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 className={styles.titulo_principal}>
                        {cards[cardOn].title.toUpperCase()}
                    </h1>
                    {cards[cardOn].subtitle && (
                        <h3 className={styles.subtitulo_principal}>{cards[cardOn].subtitle}</h3>
                    )}
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
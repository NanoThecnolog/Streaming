import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { isOnTheList } from '@/services/isOnTheList';
import { getCookieClient, setCookieClient } from '@/services/cookieClient';
import Router from 'next/router';
import { UserProps } from '@/@types/user';
import { addWatchLater } from '@/services/addWatchLater';
import { IoCheckmarkCircle } from 'react-icons/io5';


interface OverlayProps {
    title: string,
    subtitle?: string,
    src: string,
    duration: string,
    genero: string[]
    isVisible: boolean

    modalVisible: () => void;
}

export default function Overlay({ title, subtitle, src, duration, genero, isVisible, modalVisible }: OverlayProps) {
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [user, setUser] = useState<UserProps>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            //Router.push('/login')
            return
        }
        setUser(user)
        setCookieClient()
    }, [])
    useEffect(() => {
        setCookie()
        onList(title, subtitle)
    }, [isVisible])
    async function setCookie() {
        await setCookieClient()
    }

    useEffect(() => {
        onList(title, subtitle)
    }, [title, subtitle])

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
    const movie = new URLSearchParams({
        title: `${title}`,
        subTitle: `${subtitle}` || "",
        src: `${src}`
    });
    const playLink: string = `/watch?${movie}`

    function handleFavorite() {
        toast.warning("A função de adicionar filme aos favoritos está temporariamente desabilitada.")
    }
    async function handleWatchLater() {
        try {
            if (isLoading) return
            setIsLoading(true)
            if (!user) return Router.push('/login')
            await addWatchLater(user.id, title, subtitle);
            await onList(title, subtitle)
            await setCookieClient()
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        } finally {
            setIsLoading(false)
        }
    }
    async function openModalVisible() {
        modalVisible()
        await setCookieClient();
    }

    return (
        <>
            <h3>{title.toUpperCase()}</h3>
            {subtitle && (
                <h4>{subtitle}</h4>
            )}
            <p>{duration} - {genero.join(', ')}</p>
            <div className={styles.button_container}>
                <div className={styles.watch}>
                    <Link href={`${playLink}`}>
                        <button type='button'>
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
                <div className={`${styles.star} ${styles.queue}`} onClick={openModalVisible}>
                    <FaInfoCircle size={20} />
                </div>
            </div>
        </>
    )
}
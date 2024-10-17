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
import Card from '../Card';
import { addFavorite } from '@/services/addFavorite';
import { getFavoriteList } from '@/services/getFavoriteList';
import { ListaFavoritos } from '@/@types/favoritos';
import { Seasons } from '@/@types/series';


interface OverlayProps {
    tmdbId: number
    title: string,
    subtitle?: string,
    src: string,
    season: Seasons[];
    genero: string[]
    isVisible: boolean

    modalVisible: () => void;
}

export default function OverlaySerie({ tmdbId, title, subtitle, src, season, genero, isVisible, modalVisible }: OverlayProps) {
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [user, setUser] = useState<UserProps>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [favoriteList, setFavoriteList] = useState<ListaFavoritos[]>([])

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            //Router.push('/login')
            return
        }
        setUser(user)
        setCookieClient()
        listarFavoritos()
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
        src: `${season[0].episodes[0].src}`,
        episode: `${season[0].episodes[0].ep}`,
        season: `${season[0].s}`
    });
    const playLink: string = `/watch/serie?${movie}`

    function listarFavoritos() {
        const favoritos: ListaFavoritos[] = getFavoriteList();
        setFavoriteList(favoritos)
    }

    async function handleFavorite() {
        if (!user) return
        await addFavorite({ tmdbid: tmdbId, title, subtitle, userId: user.id })
        listarFavoritos()
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
            <div className={styles.title}>
                <h3>{title.toUpperCase()}</h3>
                {subtitle && (
                    <h4>{subtitle}</h4>
                )}
                <p>
                    {season.length > 1
                        ? `${season.length} temporadas`
                        : season.length === 1
                        && `${season.length} temporada`} - {genero.join(', ')}
                </p>
            </div>

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
                <div className={`${styles.queue} ${favoriteList
                    .some((filme) =>
                        filme.title === title
                        && filme.subtitle === subtitle)
                    ? styles.star : ''}`}
                    onClick={handleFavorite}
                >
                    <FaStar size={20} />
                </div>
                <div className={`${styles.queue}`} onClick={openModalVisible}>
                    <FaInfoCircle size={20} />
                </div>
            </div>
        </>
    )
}
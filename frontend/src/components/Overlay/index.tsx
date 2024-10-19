import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { addFavorite } from '@/services/addFavorite';
import { getCookieFavoriteList } from '@/services/getFavoriteList';
import { ListaFavoritos } from '@/@types/favoritos';


interface OverlayProps {
    tmdbId: number
    title: string,
    subtitle?: string,
    src: string,
    duration: string,
    genero: string[]
    isVisible: boolean

    modalVisible: () => void;
}
type StateProps = {
    user: UserProps | undefined,
    favoriteList: ListaFavoritos[],
    onWatchLater: boolean,
    isLoading: boolean
}

export default function Overlay({ tmdbId, title, subtitle, src, duration, genero, isVisible, modalVisible }: OverlayProps) {
    const [state, setState] = useState<StateProps>({
        user: undefined,
        favoriteList: [],
        onWatchLater: false,
        isLoading: false
    })
    const { user, favoriteList, onWatchLater, isLoading } = state

    useEffect(() => {
        setCookieClient()
    }, [])

    useEffect(() => {
        const user = getCookieClient();
        if (!user) return;
        setState(prev => ({ ...prev, user: user }))
        listarFavoritos()
        setCookieClient()
        onList(title, subtitle)
    }, [title, subtitle, isVisible])
    function listarFavoritos() {
        const favoritos: ListaFavoritos[] = getCookieFavoriteList();
        setState(prev => ({ ...prev, favoriteList: favoritos }))
    }
    async function onList(title: string, subtitle?: string) {
        const result: boolean = await isOnTheList(title, subtitle)
        setState(prev => ({ ...prev, onWatchLater: result }))
    }
    const movie = useMemo(() => new URLSearchParams({
        title: `${title}`,
        subTitle: `${subtitle}` || "",
        src: `${src}`
    }), [title, subtitle, src]);

    const playLink = `/watch?${movie}`

    const handleFavorite = useCallback(async () => {
        if (!user) return
        await addFavorite({ tmdbid: tmdbId, title, subtitle, userId: user.id })
        listarFavoritos()
    }, [user, title, subtitle, tmdbId])

    async function handleWatchLater() {
        if (isLoading) return;
        if (!user) return Router.push('/login')
        setState(prev => ({ ...prev, isLoading: true }))
        try {
            await addWatchLater(user.id, title, subtitle);
            await onList(title, subtitle)
            await setCookieClient()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista.";
            return toast.error(errorMessage)
        } finally {
            setState(prev => ({ ...prev, isLoading: false }))
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
                <div className={`${styles.queue} ${favoriteList && favoriteList
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
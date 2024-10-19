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
import { Seasons } from '@/@types/series';


interface OverlayProps {
    tmdbId: number
    title: string,
    subtitle?: string,
    season: Seasons[];
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

export default function OverlaySerie({ tmdbId, title, subtitle, season, genero, isVisible, modalVisible }: OverlayProps) {
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
        setCookieClient()
        listarFavoritos()
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
        src: `${season[0].episodes[0].src}`,
        episode: `${season[0].episodes[0].ep}`,
        season: `${season[0].s}`
    }), [title, subtitle, season])

    const playLink: string = `/watch/serie?${movie}`

    const handleFavorite = useCallback(async () => {
        if (!user) return
        await addFavorite({ tmdbid: tmdbId, title, subtitle, userId: user.id })
        listarFavoritos()
    }, [tmdbId, title, subtitle, user])

    async function handleWatchLater() {
        if (isLoading) return;
        if (!user) return Router.push('/login')
        setState(prev => ({ ...prev, isLoading: true }))
        try {
            await addWatchLater(user.id, title, subtitle);
            await onList(title, subtitle)
            await setCookieClient()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar série à lista"
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
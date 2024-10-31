import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { UserProps } from '@/@types/user';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { ListaFavoritos } from '@/@types/favoritos';
import { Seasons } from '@/@types/series';
import { getUserCookieData, updateUserCookie } from '@/services/cookieClient';
import { getCookie } from 'cookies-next';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { addFavorite, isFavorite } from '@/services/handleFavorite';


interface OverlayProps {
    tmdbId: number
    title: string,
    subtitle: string,
    season: Seasons[];
    genero: string[]
    isVisible: boolean

    modalVisible: () => void;
}
type StateProps = {
    user: UserProps | undefined,
    favoriteList: ListaFavoritos[],
    onWatchLater: boolean,
    isLoading: boolean,
    isMovieFavorite: boolean
}

export default function OverlaySerie({ tmdbId, title, subtitle, season, genero, isVisible, modalVisible }: OverlayProps) {
    //refatorar
    const [state, setState] = useState<StateProps>({
        user: undefined,
        favoriteList: [],
        onWatchLater: false,
        isLoading: false,
        isMovieFavorite: false
    })
    const { user, favoriteList, onWatchLater, isLoading, isMovieFavorite } = state

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setState(prev => ({ ...prev, user: user }))
        }
        const favoriteList = async () => {
            const favoriteCookie = localStorage.getItem('favoriteList')
            if (!favoriteCookie) return
            const favoriteJson: ListaFavoritos[] = JSON.parse(favoriteCookie as string)
            setState(prev => ({ ...prev, favoriteList: favoriteJson }))
        }
        fetchUserData()
        favoriteList()
        onWatchLaterList(title, subtitle)
    }, [title, subtitle, isVisible])

    const onWatchLaterList = useCallback(async (title: string, subtitle?: string) => {
        const result: boolean = await isOnTheList(title, subtitle, tmdbId);
        setState(prev => ({ ...prev, onWatchLater: result }));
    }, []);

    /**
     * Função assíncrona. Adiciona ou remove da lista para assistir mais tarde e atualiza o estado onWatchLater
     * @returns void
     */

    async function handleWatchLater() {
        //toast.warning("A Função Assistir Mais Tarde está temporariamente desativada")
        if (isLoading) return;
        if (!user) return Router.push('/login')
        setState(prev => ({ ...prev, isLoading: true }))
        try {
            await addWatchLater(user.id, title, tmdbId, subtitle);
            await onWatchLaterList(title, subtitle)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar série à lista"
            return toast.error(errorMessage)
        } finally {
            setState(prev => ({ ...prev, isLoading: false }))
        }
    }
    useEffect(() => {
        favoriteMovie()
    }, [favoriteList])

    async function favoriteMovie() {
        const favorite: boolean = await isFavorite(tmdbId)
        setState(prev => ({ ...prev, isMovieFavorite: favorite }))
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
        //toast.warning("A Função favoritos está temporariamente desativada")
        if (!user) return
        await addFavorite(tmdbId, title, subtitle, user.id)
        await favoriteMovie();
    }, [user, title, subtitle, tmdbId])



    async function openModalVisible() {
        modalVisible()
        if (!user) return
        await updateUserCookie();
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
                <div className={`${styles.queue} ${isMovieFavorite ? styles.star : ''}`}
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
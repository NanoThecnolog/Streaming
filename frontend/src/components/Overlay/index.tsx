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
    isLoading: boolean,
    isFavorite: boolean
}

export default function Overlay({ tmdbId, title, subtitle = "", src, duration, genero, isVisible, modalVisible }: OverlayProps) {

    //Refatorar Esse componente
    const [state, setState] = useState<StateProps>({
        user: undefined,
        favoriteList: [],
        onWatchLater: false,
        isLoading: false,
        isFavorite: false
    })
    const { user, favoriteList, onWatchLater, isLoading, isFavorite } = state



    useEffect(() => {

        const user = getCookieClient();
        if (!user) return;
        setCookieClient(user.id)
        setState(prev => ({ ...prev, user: user }))
        setState(prev => ({ ...prev, favoriteList: user.favoritos }))
        listarFavoritos()
        onList(title, subtitle)
    }, [title, subtitle, isVisible])

    useEffect(() => {
        isMovieFavorite()
    }, [favoriteList])

    function isMovieFavorite() {
        const favorite = favoriteList ? favoriteList.some((titulo) => titulo.title === title && titulo.subtitle === subtitle) : false
        setState(prev => ({ ...prev, isFavorite: favorite }))
    }

    const movie = useMemo(() => new URLSearchParams({
        title: `${title}`,
        subTitle: `${subtitle}` || "",
        src: `${src}`
    }), [title, subtitle, src]);

    const playLink = `/watch?${movie}`

    const handleFavorite = useCallback(async () => {
        //toast.warning("A função Favoritos está temporariamente desativada.")

        if (!user) return
        await addFavorite({ tmdbid: tmdbId, title, subtitle, userId: user.id })
        listarFavoritos()
    }, [user, title, subtitle, tmdbId])

    function listarFavoritos() {
        const favoritos: ListaFavoritos[] | null = getCookieFavoriteList();
        if (!favoritos) return
        setState(prev => ({ ...prev, favoriteList: favoritos }))

    }


    const onList = useCallback(async (title: string, subtitle?: string) => {
        const result: boolean = await isOnTheList(title, subtitle);
        //console.log("result na função onList", result)
        setState(prev => ({ ...prev, onWatchLater: result }));
    }, []);

    async function handleWatchLater() {
        //toast.warning("A função assistir mais tarde está temporariamente desativada.")

        if (isLoading) return;
        if (!user) return Router.push('/login')
        setState(prev => ({ ...prev, isLoading: true }))
        try {
            await addWatchLater(user.id, title, subtitle);
            await onList(title, subtitle)
            await setCookieClient(user.id)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista.";
            console.log("Erro na função handleWatchLater do overlay filme", err)
            return toast.error(errorMessage)
        } finally {
            setState(prev => ({ ...prev, isLoading: false }))
        }
    }
    async function openModalVisible() {
        modalVisible()
        if (!user) return
        await setCookieClient(user.id);
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
                    .some((filme) => filme.title === title
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
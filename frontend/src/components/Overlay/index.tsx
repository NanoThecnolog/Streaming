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
import { getUserCookieData, updateUserCookie } from '@/services/cookieClient';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { addFavorite, isFavorite } from '@/services/handleFavorite';
import Stars from '../ui/StarAverage';
import Adult from '../ui/Adult';
import { CardsProps } from '@/@types/Cards';


interface OverlayProps {
    card: CardsProps;
    isVisible: boolean,
    vote_average: number
    adult: boolean

    modalVisible: () => void;
}
type StateProps = {
    user: UserProps | undefined,
    favoriteList: ListaFavoritos[],
    onWatchLater: boolean,
    isLoading: boolean,
    isMovieFavorite: boolean,
}

export default function Overlay({ card, isVisible, vote_average, modalVisible, adult }: OverlayProps) {

    //Refatorar Esse componente
    const [state, setState] = useState<StateProps>({
        user: undefined,
        favoriteList: [],
        onWatchLater: false,
        isLoading: false,
        isMovieFavorite: false
    })
    const { title, subtitle, tmdbId, src, duration, genero, faixa } = card
    const { user, favoriteList, onWatchLater, isLoading, isMovieFavorite } = state




    useEffect(() => {

        const userData = async () => {
            const user = await getUserCookieData();
            if (!user) return;
            setState(prev => ({ ...prev, user: user }))
        }
        const favoriteList = async () => {
            const favoriteCookie = localStorage.getItem('favoriteList')
            if (!favoriteCookie) return
            const favoriteJson: ListaFavoritos[] = JSON.parse(favoriteCookie as string)
            setState(prev => ({ ...prev, favoriteList: favoriteJson }))
        }
        userData()
        favoriteList()
        onWatchLaterList(title, subtitle)
    }, [card, isVisible])

    const onWatchLaterList = useCallback(async (title: string, subtitle?: string) => {
        const result: boolean = await isOnTheList(title, subtitle, tmdbId);
        setState(prev => ({ ...prev, onWatchLater: result }));
    }, []);

    /**
     * Função assíncrona. Adiciona ou remove da lista para assistir mais tarde e atualiza o estado onWatchLater
     * @returns void
     */

    async function handleWatchLater() {
        //toast.warning("A função assistir mais tarde está temporariamente desativada.")

        if (isLoading) return;
        if (!user) return Router.push('/login')
        setState(prev => ({ ...prev, isLoading: true }))
        try {
            await addWatchLater(user.id, card.title, tmdbId, subtitle)
            await onWatchLaterList(title, subtitle)
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || "Erro ao adicionar filme à lista.";
            console.log("Erro na função handleWatchLater do overlay filme", err)
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

    const movieLink = useMemo(() => new URLSearchParams({
        title: `${title}`,
        subTitle: `${subtitle}` || "",
        src: `${src}`
    }), [title, subtitle, src]);

    const playLink = `/watch?${movieLink}`

    const handleFavorite = useCallback(async () => {
        //toast.warning("A função Favoritos está temporariamente desativada.")

        if (!user) return
        await addFavorite(tmdbId, title, subtitle ? subtitle : "", user.id)
        await favoriteMovie();
    }, [user, title, subtitle, tmdbId])

    async function openModalVisible() {
        modalVisible()
        if (!user) return
        await updateUserCookie();
    }


    return (
        <>
            <h3>{title.toUpperCase()}</h3>
            {subtitle && (
                <h4>{subtitle}</h4>
            )}
            <p>{duration} - {genero.join(', ')}</p>
            <div className={styles.tmdbInfo}>
                <Stars average={vote_average} />
                <Adult faixa={faixa} />
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
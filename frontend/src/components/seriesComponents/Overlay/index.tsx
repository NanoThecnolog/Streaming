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
import { Seasons, SeriesProps } from '@/@types/series';
import { getUserCookieData, updateUserCookie } from '@/services/cookieClient';
import { getCookie } from 'cookies-next';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { addFavorite, isFavorite } from '@/services/handleFavorite';
import Stars from '@/components/ui/StarAverage';
import Adult from '@/components/ui/Adult';


interface OverlayProps {
    card: SeriesProps
    isVisible: boolean,
    vote_average: number,
    genres: {
        id: number,
        name: string
    }[] | undefined

    modalVisible: () => void;
}
type StateProps = {
    user: UserProps | undefined,
    favoriteList: ListaFavoritos[],
    onWatchLater: boolean,
    isLoading: boolean,
    isMovieFavorite: boolean
}

export default function OverlaySerie({ card, isVisible, vote_average, modalVisible, genres }: OverlayProps) {
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
        onWatchLaterList(card.title, card.subtitle)
    }, [card, isVisible])

    const onWatchLaterList = useCallback(async (title: string, subtitle?: string) => {
        const result: boolean = await isOnTheList(title, subtitle, card.tmdbID);
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
            await addWatchLater(user.id, card.title, card.tmdbID, card.subtitle);
            await onWatchLaterList(card.title, card.subtitle)
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
        const favorite: boolean = await isFavorite(card.tmdbID)
        setState(prev => ({ ...prev, isMovieFavorite: favorite }))
    }

    const movie = useMemo(() => new URLSearchParams({
        title: `${card.title}`,
        subtitle: `${card.subtitle}` || "",
        src: `${card.season[0].episodes[0].src}`,
        episode: `${card.season[0].episodes[0].ep}`,
        season: `${card.season[0].s}`
    }), [card])


    const playLink: string = `/watch/serie?${movie}`

    const handleFavorite = useCallback(async () => {
        //toast.warning("A Função favoritos está temporariamente desativada")
        if (!user) return
        await addFavorite(card.tmdbID, card.title, card.subtitle, user.id)
        await favoriteMovie();
    }, [user, card])



    async function openModalVisible() {
        modalVisible()
        if (!user) return
        await updateUserCookie();
    }

    return (
        <>
            <div className={styles.title}>
                <h3>{card.title.toUpperCase()}</h3>
                {card.subtitle && (
                    <h4>{card.subtitle}</h4>
                )}
                <p>
                    {card.season.length > 1
                        ? `${card.season.length} temporadas`
                        : card.season.length === 1
                        && `${card.season.length} temporada`} - {genres ? genres.map(genre =>
                            genre.name === "Action & Adventure"
                                ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                    ? "Ficção Científica e Fantasia" : genre.name
                        ).join(', ') : card.genero.join(', ')}
                </p>
            </div>
            <div className={styles.tmdbInfo}>
                <Stars average={vote_average} />
                <Adult faixa={card.faixa} />
            </div>

            <div className={styles.button_container}>
                <div className={styles.watch}>
                    <Link href={`${playLink}`}>
                        <button type='button'>
                            <FaPlay size={25} />
                        </button>
                    </Link>
                </div>
                <div className={styles.queue} onClick={handleWatchLater}>
                    {
                        onWatchLater ?
                            <IoCheckmarkCircle title='Remover' size={25} className={styles.watchLater} />
                            : <FaRegClock title='Adicionar' size={25} />
                    }
                </div>
                <div className={`${styles.queue} ${isMovieFavorite ? styles.star : ''}`}
                    onClick={handleFavorite}
                >
                    <FaStar size={25} />

                </div>
                <div className={`${styles.queue}`} onClick={openModalVisible}>
                    <FaInfoCircle size={25} />
                </div>
            </div>
        </>
    )
}
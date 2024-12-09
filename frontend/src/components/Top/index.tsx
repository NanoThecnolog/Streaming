import { cards } from '@/js/cards'
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss'
import { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { UserProps } from '@/@types/user';
import { FaCheck } from 'react-icons/fa';
import { getUserCookieData } from '@/services/cookieClient';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { fetchTMDBBackDrop, fetchTMDBMovie, fetchTMDBPoster } from '@/services/fetchTMDBData';
import { MovieTMDB } from '@/@types/Cards';
import Adult from '../ui/Adult';

interface TopProps {
    width?: number;
}

export default function Top({ width }: TopProps) {
    //Componente refatorado
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')
    const [user, setUser] = useState<UserProps | null>(null)
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [TMDBImages, setTMDBImages] = useState<{ backdrop: string | null; poster: string | null }>({
        backdrop: null,
        poster: null
    })
    const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>({
        adult: false,
        backdrop_path: "",
        id: 0,
        overview: "",
        popularity: 0,
        poster_path: "",
        release_date: "",
        vote_average: 0
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')
            setTimeout(async () => {
                setCardOn(prevCardOn => (prevCardOn + 1) % cards.length);
                setFade('fadeIn')
            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUser(user)
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        setTMDBImages({ backdrop: null, poster: null })
        const fetchImages = async () => {
            const card = cards[cardOn]
            if (card.tmdbId !== 0) {
                const movie = await fetchTMDBMovie(card.tmdbId)
                if (movie) {
                    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                    const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

                    const loadImage = (url: string) => new Promise<void>((resolve) => {
                        const img = new Image()
                        img.src = url
                        img.onload = () => resolve()
                    })
                    await Promise.all([loadImage(backdropUrl), loadImage(posterUrl)])
                    setTMDBImages({ backdrop: backdropUrl, poster: posterUrl })
                    setFade('fadeIn')
                }

                //setTMDBImages({ backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`, poster: `https://image.tmdb.org/t/p/original${movie.poster_path}` })
            } else {
                setTMDBImages({ backdrop: null, poster: null })
            }
        }
        fetchImages()
    }, [cardOn])

    const checkWatchLaterList = useCallback(async () => {
        if (!user) return
        const card = cards[cardOn]
        const isAdded = await isOnTheList(card.title, card.subtitle, card.tmdbId)
        setOnWatchLater(isAdded)
    }, [user, cardOn])
    useEffect(() => {
        checkWatchLaterList()
    }, [checkWatchLaterList])

    const handleWatchLater = useCallback(
        async () => {
            if (isLoading || !user) return Router.push('/login')
            const card = cards[cardOn]
            setIsLoading(true)
            try {

                await addWatchLater(user.id, card.title, card.tmdbId, card.subtitle)
                await checkWatchLaterList()

            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Erro inesperado ao adicionar filme à lista!"
                toast.error(errorMessage)
            } finally {
                setIsLoading(false)
            }
        },
        [isLoading, user, cardOn, checkWatchLaterList]
    )
    const getBackgroundImage = () => {
        const card = cards[cardOn]
        return width && width <= 980
            ? TMDBImages.poster ?? card.overlay
            : TMDBImages.backdrop ?? card.background
    }
    function handleWatch() {
        const { title, subtitle, src, tmdbId } = cards[cardOn]
        const play: string = `/watch?title=${title}&subTitle=${subtitle}&src=${src}&tmdbId=${tmdbId}`
        Router.push(play)
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`}
            style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
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
                        <Adult faixa={cards[cardOn].faixa} />
                    </div>
                    <div className={styles.description}>
                        <p>{cards[cardOn].description}</p>
                    </div>
                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={handleWatch}>
                            <h3>Play</h3>
                            <FaCirclePlay color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={handleWatchLater}>
                            {onWatchLater ?
                                <>
                                    <h3>ADICIONADO À LISTA!</h3>
                                    <FaCheck />
                                </> :
                                <>
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
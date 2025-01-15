import styles from './styles.module.scss'
import { FaCheck } from "react-icons/fa6"
import { IoIosAddCircleOutline } from "react-icons/io"
import Router from "next/router"
import { X } from "lucide-react"
import { toast } from "react-toastify"
import { SeriesProps } from "@/@types/series"
import { useCallback, useEffect, useState } from "react"
import { UserProps } from "@/@types/user"
import { getUserCookieData } from '@/services/cookieClient'
import { fetchTMDBSeries } from '@/services/fetchTMDBData'
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater'
import Stars from '@/components/ui/StarAverage'
import Adult from '@/components/ui/Adult'

interface InfoModalProps {
    card: SeriesProps;
    vote_average: number
    handleModalClose: () => void
}
type GenreProps = {
    id: number,
    name: string
}

export default function CardInfoSerieModal({ card, vote_average, handleModalClose }: InfoModalProps) {
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [overview, setOverview] = useState<string | null>(null)
    const [genres, setGenres] = useState<GenreProps[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [user, setUser] = useState<UserProps>()
    const checkWatchLaterList = useCallback(async () => {
        if (!user) return
        const isAdded = await isOnTheList(card.title, card.subtitle, card.tmdbID)
        setOnWatchLater(isAdded)
    }, [user, card])

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUser(user)
        }
        fetchUserData()
        checkWatchLaterList()
    }, [checkWatchLaterList])

    useEffect(() => {
        setTMDBBackDrop(null)
        setOverview(null)

        if (card.tmdbID === 0) {
            setTMDBBackDrop(null)
            setOverview(null)
            return
        }
        fetchSerieData()
    }, [card, fetchSerieData])
    async function fetchSerieData() {
        const serie = await fetchTMDBSeries(card.tmdbID)
        if (!serie) {
            setTMDBBackDrop(null)
            setOverview(null)
            return
        }
        const backdropURL = `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
        setTMDBBackDrop(backdropURL)
        setOverview(serie.overview)
        setGenres(serie.genres)
    }
    const handleWatchLater = useCallback(async () => {
        if (isLoading || !user) return Router.push('/login')
        setIsLoading(true)

        try {
            await addWatchLater(user.id, card.title, card.tmdbID, card.subtitle)
            await checkWatchLaterList()

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista!";
            toast.error(errorMessage);

        } finally {
            setIsLoading(false)
        }
    }, [isLoading, user, card, checkWatchLaterList])
    function handlePlay() {
        const serie = new URLSearchParams({
            title: `${card.title}`
        })
        Router.push(`/series/serie/${card.tmdbID}`)
    }

    return (
        <div className={styles.movie_desc}>
            <div className={styles.modal_content}>
                <div className={styles.desc_image} style={{ backgroundImage: `url(${TMDBBackDrop ? TMDBBackDrop : card.background})`, backgroundPosition: 'center' }}>
                    <div className={styles.imageBackground}>
                        <div className={styles.close_btn} onClick={handleModalClose}>
                            <X size={30} />
                        </div>
                    </div>
                </div>
                <div className={styles.desc_top}>
                    <h1 className={styles.titulo}>{card.title} {card.subtitle && (
                        <span className={styles.subtitulo}> - {card.subtitle}</span>
                    )}</h1>
                    <div className={styles.button_container}>
                        <div className={styles.watch} onClick={handlePlay}>
                            <h3>Episódios</h3>
                        </div>
                        <div className={styles.queue} onClick={() => handleWatchLater()}>
                            {onWatchLater ?
                                <>
                                    <h3>ADICIONADO À LISTA!</h3>
                                    <FaCheck size={35} color="#fff" />
                                </> : <>
                                    <h3>ASSISTIR MAIS TARDE</h3>
                                    <IoIosAddCircleOutline size={35} color="#fff" />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.gen_mid}>
                    <p>
                        {card.season.length === 1 ? `${card.season.length} temporada` : card.season.length > 1 && `${card.season.length} temporadas`} - &quot;
                        <span>{genres ? genres.map(genre =>
                            genre.name === "Action & Adventure"
                                ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                    ? "Ficção Científica e Fantasia" : genre.name
                        ).join(', ') : card.genero.join(', ')}
                        </span>
                        &quot;
                    </p>
                    <Stars average={vote_average} />
                    <Adult faixa={card.faixa} />
                </div>
                <div className={styles.desc_mid}>
                    <p>{overview ? overview : card.description}</p>
                </div>
            </div>
        </div>
    )
}
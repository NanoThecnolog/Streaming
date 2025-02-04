import { CardsProps, MovieTMDB } from "@/@types/Cards"
import styles from './styles.module.scss'
import { FaCirclePlay } from "react-icons/fa6"
import { IoIosAddCircleOutline } from "react-icons/io"
import Router from "next/router"
import { X } from "lucide-react"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import { UserProps } from "@/@types/user"
import { FaCheck } from "react-icons/fa"
import { getUserCookieData } from "@/services/cookieClient"
import { fetchTMDBBackDrop, fetchTMDBMovie } from "@/services/fetchTMDBData"
import { addWatchLater, isOnTheList } from "@/services/handleWatchLater"
import Stars from "@/components/ui/StarAverage"
import Adult from "@/components/ui/Adult"

interface InfoModalProps {
    card: CardsProps;
    average: number
    handleModalClose: () => void
}

export default function CardInfoModal({ card, average, handleModalClose }: InfoModalProps) {
    //refatorar esse componente
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<UserProps>()
    const [TMDBData, setTMDBData] = useState<{ image: string | null, movie: MovieTMDB | null }>({ image: null, movie: null });

    const movieURL = `/watch/${card.tmdbId}`;
    const handlePlay = () => Router.push(movieURL)

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUser(user)
        }
        const fetchTMDBData = async () => {
            if (card.tmdbId === 0) {
                setTMDBData({ image: null, movie: null })
                return;
            }
            const [image, movie] = await Promise.all([
                fetchTMDBBackDrop(card.tmdbId),
                fetchTMDBMovie(card.tmdbId)
            ])
            setTMDBData({ image: image || null, movie: movie || null })
        }
        fetchUserData()
        fetchTMDBData()
    }, [card.tmdbId])
    const checkWatchLaterList = useCallback(async () => {
        if (!user) return
        const isAdded = await isOnTheList(card.title, card.subtitle, card.tmdbId)
        setOnWatchLater(isAdded)
    }, [user, card])
    useEffect(() => {
        checkWatchLaterList()
    }, [checkWatchLaterList])

    const handleWatchLater = useCallback(async () => {
        if (isLoading || !user) return Router.push('/login')
        setIsLoading(true)

        try {
            await addWatchLater(user.id, card.title, card.tmdbId, card.subtitle)
            await checkWatchLaterList()

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista!";
            toast.error(errorMessage);

        } finally {
            setIsLoading(false)
        }
    }, [isLoading, user, card, checkWatchLaterList])



    return (
        <div className={styles.movie_desc}>
            <div className={styles.modal_content}>
                <div className={styles.desc_image} style={{
                    backgroundImage: `url(${TMDBData.image || card.background})`,
                    backgroundPosition: 'center'
                }}>
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
                            <h3>Play</h3>
                            <FaCirclePlay size={35} color="#fff" />
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
                    <p>&quot;
                        {TMDBData ? TMDBData.movie?.genres.map(genre => genre.name === "Action & Adventure"
                            ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                ? "Ficção Científica e Fantasia" : genre.name === "Thriller" ? "Suspense" : genre.name).join(', ') : card.genero.join(', ')
                        }
                        &quot;
                    </p>
                    <Stars average={average} />
                    <Adult faixa={card.faixa} />
                </div>
                <div className={styles.desc_mid}>
                    <p>{TMDBData.movie?.overview || card.description}</p>
                </div>
            </div>

        </div>

    )
}
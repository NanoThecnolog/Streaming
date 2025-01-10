import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import { cards } from '@/js/cards';
import { fetchTMDBMovie, fetchTMDBMovieCast } from '@/services/fetchTMDBData';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Image from 'next/image';
import Stars from '@/components/ui/StarAverage';
import Adult from '@/components/ui/Adult';
import { Play } from 'lucide-react';
import { FaCheck, FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { getUserCookieData } from '@/services/cookieClient';
import { UserProps } from '@/@types/user';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { toast } from 'react-toastify';
import { CastProps } from '@/@types/cast';
import Footer from '@/components/Footer';
import { minToHour } from '@/utils/UtilitiesFunctions';
import { addFavorite, isFavorite } from '@/services/handleFavorite';
import Card from '@/components/Card';

export default function Movie() {
    const router = useRouter()
    const { tmdbId } = router.query;
    const [user, setUser] = useState<UserProps>()
    const [movie, setMovie] = useState<CardsProps>()
    const [tmdbData, setTmdbData] = useState<MovieTMDB>()
    const [loading, setLoading] = useState(true)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [isFav, setIsFavorite] = useState(false)
    const [cast, setCast] = useState<CastProps>()
    const [relatedCards, setRelatedCards] = useState<CardsProps[]>()



    useEffect(() => {
        if (!tmdbId) return
        const movie = cards.find(card => card.tmdbId === Number(tmdbId));
        setMovie(movie)
        getTMDBData()
        getTMDBCast()
        favorite()
    }, [router])
    useEffect(() => {
        function getRelatedCards() {
            if (movie) {
                const relatedCards = cards
                    .filter(card => card.tmdbId !== movie.tmdbId)
                    .map(card => {
                        const titleMatch = card.title.toLowerCase().includes(movie.title.toLowerCase()) ? 2 : 0;
                        const commonGenres = card.genero.filter((genre: string) => movie.genero.includes(genre)).length;
                        const genreScore = commonGenres > 0 ? commonGenres + (commonGenres === movie.genero.length ? 1 : 0) : 0;

                        return {
                            ...card,
                            score: titleMatch + genreScore,
                        };
                    })
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 20)
                setRelatedCards(relatedCards)
            }
        }
        watchLater()
        getRelatedCards()
    }, [movie])

    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserCookieData();
                if (!user) {
                    return
                }
                setUser(user)
            } catch (err) {
                console.log("Erro ao buscar dados do usuário no cookie", err)
            }
        }
        getUserData()
    }, [])
    const watchLater = async () => {
        if (!movie) return
        const onList = await isOnTheList(movie.title, movie.subtitle, movie.tmdbId)
        setOnWatchLater(onList)
    }
    const favorite = async () => {
        const favorito = await isFavorite(Number(tmdbId))
        setIsFavorite(favorito)
    }

    async function getTMDBData() {
        try {
            const tmdbData = await fetchTMDBMovie(Number(tmdbId));
            if (!tmdbData) return console.warn("Nenhum dado retornado durante a busca dos dados do filme no TMDB.")
            setTmdbData(tmdbData)
        } catch (err) {
            console.error("Erro ao buscar dados do filme no TMDB!")
        }
    }
    async function getTMDBCast() {
        try {
            const cast = await fetchTMDBMovieCast(Number(tmdbId));
            if (!cast) return console.warn("Nenhum dado ao buscar elenco do filme.")
            setCast(cast)
        } catch (err) {
            console.error("Erro ao buscar dados sobre o elenco do filme.")
        }
    }
    async function handleWatchLater() {
        if (!user) return router.push('/login')
        if (!movie) return console.warn("Erro ao adicionar filme a lista de assistir mais tarde.")

        try {
            await addWatchLater(user.id, movie.title, movie.tmdbId, movie.subtitle)
            await watchLater()
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            console.log(err)
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        }
    }
    async function handleFavorite() {
        if (!movie) return
        if (!user) return router.push('/login')
        try {
            await addFavorite(movie?.tmdbId, movie.title, movie.subtitle || "", user.id)
            await favorite()
        } catch (err) {
            console.error(err)
        }
    }

    function handlePlay() {
        router.push(`/watch/${tmdbId}`)
    }
    return (
        <>
            <SEO description={tmdbData ? tmdbData.overview : ""} title={movie ? movie.title : ""} />
            <Header />
            <section className={styles.container}>
                {
                    movie && tmdbData && cast ? (
                        <>
                            <div className={styles.imageContainer}>
                                <Image
                                    className={styles.img}
                                    alt='backdrop'
                                    fill
                                    quality={100}
                                    sizes="100%"
                                    src={tmdbData ? `https://image.tmdb.org/t/p/original/${tmdbData.backdrop_path}` : movie ? movie.background : "/fundo-largo.jpg"}
                                />
                            </div>
                            <div className={styles.coverContainer}>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.titleContainer}>
                                    <h1>{movie?.title}</h1>
                                    <h3>{movie?.subtitle != '' && `${movie?.subtitle}`}</h3>
                                </div>
                                {tmdbData && (
                                    <>
                                        <div>
                                            <div className={styles.movieDetail}>
                                                <h4>{minToHour(tmdbData.runtime)} - {new Date(tmdbData.release_date).getFullYear()}</h4>
                                            </div>
                                            <div className={styles.generoContainer}>
                                                <h4>{tmdbData.genres ? tmdbData.genres.map(genre => genre.name === "Action & Adventure" ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy" ? "Ficção Científica e Fantasia" : genre.name === "Thriller" ? "Suspense" : genre.name).join(', ') : movie && movie.genero.join(', ')}</h4>
                                            </div>
                                            <div className={styles.movieInfo}>
                                                <Stars average={tmdbData?.vote_average} />
                                                <Adult faixa={movie?.faixa} />
                                            </div>
                                        </div>
                                        <div className={styles.buttonPlay} onClick={handlePlay}>
                                            <button type='button'><FaPlay size={25} /><h4>Começar a Assistir</h4></button>
                                        </div>
                                        <div className={styles.buttonContainer}>
                                            <div className={styles.buttonWatchLater}>
                                                <button type='button' onClick={handleWatchLater}>
                                                    {onWatchLater ? (
                                                        <>
                                                            <p><FaCheck /></p>
                                                            <p>Adicionado à Lista</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p><FiPlus /></p>
                                                            <p>Minha Lista</p>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <div className={styles.buttonFavorite}>
                                                <button type='button' onClick={handleFavorite}>
                                                    {isFav ? (
                                                        <>
                                                            <p><FaStar color='#e0bf29' size={25} /></p>
                                                            <p>Favorito</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p><FaRegStar size={25} /></p>
                                                            <p>Favoritar</p>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.descriptionContainer}>
                                            <p>{tmdbData.overview}</p>
                                        </div>
                                        <h2>Elenco</h2>
                                        {cast &&
                                            <div className={styles.castContainer}>
                                                {cast.cast.slice(0, 20).map(actor =>
                                                    <div key={actor.cast_id}>
                                                        <div className={styles.castImage}>
                                                            <Image fill sizes="100%" alt={actor.name} src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : '/fundo-alto.jpg'} />
                                                        </div>
                                                        <div className={styles.castInfo}>
                                                            <h4>{actor.name}</h4>
                                                            <h6>{actor.character}</h6>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        {
                                            movie &&
                                            <>
                                                <h2>Você também pode gostar</h2>
                                                <div className={styles.cardContainer}>
                                                    {relatedCards?.map(card =>
                                                        <Card card={card} key={card.tmdbId} />
                                                    )}

                                                </div>
                                            </>
                                        }
                                    </>
                                )}

                            </div>
                        </>
                    ) : "Carregando..."

                }
            </section>
            <Footer />
        </>
    )
}
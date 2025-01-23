import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import { cards } from '@/data/cards';
import { fetchTMDBMovie, fetchTMDBMovieCast, fetchTMDBTrailer } from '@/services/fetchTMDBData';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Image from 'next/image';
import Stars from '@/components/ui/StarAverage';
import Adult from '@/components/ui/Adult';
import { FaCheck, FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { getUserCookieData } from '@/services/cookieClient';
import { UserProps } from '@/@types/user';
import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { toast } from 'react-toastify';
import { CastProps, CrewProps } from '@/@types/cast';
import Footer from '@/components/Footer';
import { minToHour, translate } from '@/utils/UtilitiesFunctions';
import { addFavorite, isFavorite } from '@/services/handleFavorite';
import Card from '@/components/Card';
import Spinner from '@/components/ui/Loading/spinner';
import Cast from '@/components/Cast';
import Crew from '@/components/Crew';
import { TrailerProps } from '@/@types/trailer';
import TrailerButton from '@/components/ui/TrailerButton';

interface groupedByDepartment {
    [job: string]: CrewProps[]
}

export default function Movie() {
    const router = useRouter()
    const { tmdbId } = router.query;
    const [user, setUser] = useState<UserProps>()
    const [movie, setMovie] = useState<CardsProps>()
    const [tmdbData, setTmdbData] = useState<MovieTMDB>()
    const [loading, setLoading] = useState(false)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [isFav, setIsFavorite] = useState(false)
    const [cast, setCast] = useState<CastProps>()
    const [crewDepartment, setCrewDepartment] = useState<groupedByDepartment>({})
    const [relatedCards, setRelatedCards] = useState<CardsProps[]>()
    const [trailer, setTrailer] = useState<TrailerProps | null>(null)

    const watchLater = async () => {
        if (!movie) return
        const onList = await isOnTheList(movie.title, movie.subtitle, movie.tmdbId)
        setOnWatchLater(onList)
    }
    const favorite = async () => {
        const favorito = await isFavorite(Number(tmdbId))
        setIsFavorite(favorito)
    }
    useEffect(() => {
        if (!tmdbId) return
        const movie = cards.find(card => card.tmdbId === Number(tmdbId));
        setMovie(movie)
        getTMDBData()
        getTMDBCast()
        favorite()
    }, [router, tmdbId])
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
    async function getTMDBData() {
        if (loading) return
        setLoading(true)
        try {
            const tmdbData = await fetchTMDBMovie(Number(tmdbId));
            if (!tmdbData) return console.warn("Nenhum dado retornado durante a busca dos dados do filme no TMDB.")
            setTmdbData(tmdbData)
        } catch (err) {
            console.error("Erro ao buscar dados do filme no TMDB!")
        } finally {
            setLoading(false)
        }
    }
    async function getTMDBCast() {
        if (loading) return
        setLoading(true)
        try {
            const cast = await fetchTMDBMovieCast(Number(tmdbId));
            if (!cast) return console.warn("Nenhum dado ao buscar elenco do filme.")
            const crewData = Array.isArray(cast.crew) && cast.crew.length
                ? cast.crew : []
            const groupedByDepartment = crewData.reduce<groupedByDepartment>((acc, crew) => {
                if (!acc[crew.department]) {
                    acc[crew.department] = []
                }
                acc[crew.department].push(crew)
                return acc
            }, {});
            setCrewDepartment(groupedByDepartment)
            setCast(cast)
        } catch (err) {
            console.error("Erro ao buscar dados sobre o elenco do filme.")
        } finally {
            setLoading(false)
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
    useEffect(() => {
        if (!tmdbId || isNaN(Number(tmdbId))) return;
        getTrailer()
    }, [tmdbId])
    async function getTrailer() {
        const trailer = await fetchTMDBTrailer(Number(tmdbId), 'movie')
        if (!trailer) return setTrailer(null)
        return setTrailer(trailer)
    }
    function handlePlay() {
        router.push(`/watch/${tmdbId}`)
    }
    return (
        <>
            <SEO description={tmdbData ? tmdbData.overview : ""} title={`${movie ? movie.title : ""} - FlixNext`} />
            <Header />
            {
                movie ? (
                    <section className={styles.container}>
                        <div className={styles.imageContainer}>
                            {!loading ? <Image
                                className={styles.img}
                                alt='backdrop'
                                fill
                                quality={100}
                                sizes="100%"
                                src={tmdbData ? `https://image.tmdb.org/t/p/original/${tmdbData.backdrop_path}` : movie ? movie.background : "/fundo-largo.jpg"}
                            /> : <div><Spinner /></div>}
                        </div>
                        <div className={styles.coverContainer}>
                        </div>
                        <div className={`${styles.content} ${loading ? styles.loading : ""}`}>
                            <div className={styles.titleContainer}>
                                <h1>{movie.title}</h1>
                                <h3>{movie.subtitle != '' && `${movie.subtitle}`}</h3>
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
                                        {
                                            trailer && trailer.results.length > 0 &&
                                            <TrailerButton trailer={trailer} />
                                        }
                                    </div>
                                    <div className={styles.descriptionContainer}>
                                        <p>{tmdbData.overview}</p>
                                    </div>
                                    {
                                        !loading ? (
                                            <>
                                                {
                                                    movie &&
                                                    <>
                                                        <h2>Você também vai gostar</h2>
                                                        <div className={styles.cardContainer}>
                                                            {relatedCards?.map(card =>
                                                                <Card card={card} key={card.tmdbId} />
                                                            )}
                                                        </div>
                                                    </>
                                                }
                                                <div className={styles.cast}>

                                                    {cast && cast.cast.length > 0 &&
                                                        <>
                                                            <h2>Elenco</h2>
                                                            <div className={styles.castContainer}>
                                                                {cast.cast.slice(0, 20).map((actor, index) =>
                                                                    <Cast actor={actor} key={index} />
                                                                )}
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                                <div className={styles.crew}>
                                                    <h2>Equipe Técnica</h2>
                                                    <div className={styles.crewContainer}>
                                                        {Object.keys(crewDepartment).map((department) => (
                                                            <div key={department} className={styles.departmentGroup}>
                                                                <h3 className={styles.departmentTitle}>{translate(department)}</h3>
                                                                <div className={styles.departmentCrew}>
                                                                    {crewDepartment[department]
                                                                        .filter((crew, index, self) =>
                                                                            self.findIndex(c => c.name === crew.name) === index
                                                                        )
                                                                        .map((crew, index) => (
                                                                            <Crew crew={crew} key={index} />
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </>
                                        ) : <div className={styles.loadingContainer}><Spinner /></div>
                                    }
                                </>
                            )}

                        </div>
                    </section>
                ) : <div><Spinner /></div>
            }

            <Footer />
        </>
    )
}
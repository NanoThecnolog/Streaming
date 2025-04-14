import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
//import { fetchTMDBMovieCast, fetchTMDBTrailer } from '@/services/fetchTMDBData';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Stars from '@/components/ui/StarAverage';
import Adult from '@/components/ui/Adult';
import { FaCheck, FaPlay } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
//import { addWatchLater, isOnTheList } from '@/services/handleWatchLater';
import { toast } from 'react-toastify';
import { CastProps, CrewProps } from '@/@types/cast';
import Footer from '@/components/Footer';
import { minToHour, translate } from '@/utils/UtilitiesFunctions';
import Card from '@/components/Card';
import Spinner from '@/components/ui/Loading/spinner';
import Cast from '@/components/Cast';
import Crew from '@/components/Crew';
import { TrailerProps } from '@/@types/trailer';
import TrailerButton from '@/components/ui/TrailerButton';
import { getRelatedCards } from '@/utils/CardsManipulation';
import { useTMDB } from '@/contexts/TMDBContext';
import { useFlix } from '@/contexts/FlixContext';
import { parseCookies } from 'nookies';
import debounce from 'lodash.debounce';
import { debug } from '@/classes/DebugLogger';
import { tmdb } from '@/classes/TMDB';
import { mongoService } from '@/classes/MongoContent';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { userMethod, UserMethods } from '@/classes/userMethods';
import { watchLaterManager } from '@/classes/watchLaterManager';

interface groupedByDepartment {
    [job: string]: CrewProps[]
}

interface MovieProps {
    data: MovieTMDB
}

export default function Movie({ data }: MovieProps) {
    const router = useRouter()
    const [showPoster, setShowPoster] = useState(false)
    const { tmdbId } = router.query;
    const { allData } = useTMDB()
    const { user, setUser, movies, setMovies } = useFlix()
    const [movie, setMovie] = useState<CardsProps | null>(null)
    const [tmdbData, setTmdbData] = useState<MovieTMDB>()
    const [loading, setLoading] = useState(false)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [cast, setCast] = useState<CastProps>()
    const [crewDepartment, setCrewDepartment] = useState<groupedByDepartment>({})
    const [relatedCards, setRelatedCards] = useState<CardsProps[]>([])
    const [trailer, setTrailer] = useState<TrailerProps | null>(null)
    const [loadingButton, setLoadingButton] = useState(false)


    useEffect(() => {
        if (!tmdbId) return
        async function fetchCard() {
            const response: CardsProps | null = await mongoService.findOneMovieById(parseInt(tmdbId as string))
            setMovie(response)
        }
        fetchCard()
        getTMDBData()
        getTMDBCast()
    }, [router, tmdbId])

    const watchLater = () => {
        if (!movie) return
        const onList = watchLaterManager.isOnTheList(movie.tmdbId)
        setOnWatchLater(onList)
    }
    useEffect(() => {
        if (!movie) return
        async function getMoviesMongoDB() {
            const response = await mongoService.fetchMovieData()
            setMovies(response)
        }
        if (movies.length === 0) getMoviesMongoDB()
        const relatedCards = getRelatedCards(movie, movies, allData)
        if (relatedCards && relatedCards.length > 0) setRelatedCards(relatedCards)
        watchLater()
    }, [movie, movies, allData])

    const handleWidth = debounce(() => {
        if (window.innerWidth <= 915) {
            debug.log(window.innerWidth)
            setShowPoster(true)
        } else {
            setShowPoster(false)
        }
    }, 300)

    useEffect(() => {
        window.addEventListener('resize', handleWidth)
        handleWidth()
        return () => window.removeEventListener('resize', handleWidth)

    }, [handleWidth])

    async function getTMDBData() {
        if (loading) return
        setLoading(true)
        try {
            //const tmdbData = await fetchTMDBMovie(Number(tmdbId));
            const tmdbData = await tmdb.fetchMovieDetails(Number(tmdbId))
            if (!tmdbData) return debug.warn("Nenhum dado retornado durante a busca pelo filme no TMDB.")
            setTmdbData(tmdbData)
        } catch (err) {
            debug.error("Erro na busca pelo filme no TMDB!")
        } finally {
            setLoading(false)
        }
    }
    async function getTMDBCast() {
        if (loading) return
        setLoading(true)
        try {
            const cast = await tmdb.fetchMovieCast(Number(tmdbId));
            if (!cast) return debug.warn("Nenhum dado ao buscar elenco do filme.")

            const crewData = cast.crew?.length ? cast.crew : [];

            const groupedByDepartment = crewData.reduce<groupedByDepartment>((acc, crew) => {
                if (!crew.department) return acc
                const department = crew.department || "Outros";

                acc[department] = acc[department] || []
                acc[department].push(crew)
                return acc
            }, {});
            setCrewDepartment(groupedByDepartment)
            setCast(cast)
        } catch (err) {
            debug.error("Erro ao buscar dados sobre o elenco do filme.", err)
        } finally {
            setLoading(false)
        }
    }
    async function handleWatchLater() {
        if (!user) {
            const { 'flix-user': userCookie } = parseCookies()
            if (!userCookie) return router.push('/login')
            setUser(JSON.parse(userCookie))
        }
        if (!movie) return debug.warn("Erro ao adicionar filme a lista de assistir mais tarde.")

        try {
            if (loadingButton) return
            setLoadingButton(true)
            await watchLaterManager.addWatchLater(movie)
            await watchLater()
        } catch (err: any) {
            debug.error("Erro ao adicionar filme", err)
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista. Por favor, tente novamente mais tarde!";
            return toast.error(errorMessage)
        } finally {
            setLoadingButton(false)
        }
    }

    useEffect(() => {
        if (!tmdbId || isNaN(Number(tmdbId))) return;
        const getTrailer = async () => {
            try {
                const trailer = await tmdb.fetchTrailer(Number(tmdbId), 'movie')
                setTrailer(trailer || null)
            } catch (err) {
                debug.error("Erro ao buscar o trailer", err)
                setTrailer(null)
            }
        }
        getTrailer()
    }, [tmdbId])

    function handlePlay() {
        router.push(`/watch/${tmdbId}`)
    }
    return (
        <>
            <SEO description={data.overview} title={`${data.title} - FlixNext`} url={`https://flixnext.com.br/movie/${data.id}`} image={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} />
            <Header />
            {
                movie ? (
                    <section className={styles.container}>
                        {!loading ?
                            <div
                                className={styles.imageContainer}
                                style={{ backgroundImage: `url(${tmdbData ? `https://image.tmdb.org/t/p/original${showPoster ? tmdbData.poster_path : tmdbData.backdrop_path}` : movie ? movie.background : "/fundo-largo.jpg"})` }}
                            ></div>
                            :
                            <div className={styles.loading}>
                                <div className={styles.loadingContainer}><Spinner /></div>
                            </div>
                        }

                        <div className={styles.coverContainer}>
                        </div>
                        <div className={`${styles.content} ${loading ? styles.loading : ""}`}>
                            <div className={styles.titleContainer}>
                                <h1 className={`${movie.title.toLowerCase() === 'harry potter' && styles.harryFont}`}>{movie.title}</h1>
                                <h3 className={`${movie.title.toLowerCase() === 'harry potter' && styles.subHarryFont}`}>{movie.subtitle != '' && `${movie.subtitle}`}{movie.tmdbId === 597 && user && user.id === "3ed15ea3-4c54-478d-908f-e19e06d1c1f9" && "Thais cara de Nariz, coloca o filme em 1 hora e 24 minutos 😏...."}</h3>
                            </div>
                            {tmdbData && (
                                <>
                                    <div>
                                        <div className={styles.movieDetail}>
                                            <h4>{movie.title.toLowerCase() === 'batman vs superman' ? movie.duration : minToHour(tmdbData.runtime)} - {new Date(tmdbData.release_date).getFullYear()} - {movie.lang && movie.lang === "Leg" ? "Legendado" : "Dublado"}</h4>
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
                                                {loadingButton ? <Spinner /> : onWatchLater ? (
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
                                        )
                                            :
                                            <div className={styles.loading}>
                                                <div className={styles.loadingContainer}>
                                                    <Spinner />
                                                </div>
                                            </div>
                                    }
                                </>
                            )}
                        </div>
                    </section>
                ) :
                    <div className={styles.loading}>
                        <div className={styles.loadingContainer}>
                            <Spinner />
                        </div>
                    </div>
            }
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tmdbId } = context.params as { tmdbId: string }
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

    //const res = await fetch(`https://api.flixnext.com.br/serie/${tmdbId}`)
    //const res = await apiTMDB.get(`/movie/${tmdbId}`)
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
        headers: {
            Authorization: `Bearer ${tmdbToken}`
        },
        params: {
            language: "pt-BR",
        },
    });

    const data = res.data
    //debug.log('data no serversideprops', data)

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data
        },
    }
}
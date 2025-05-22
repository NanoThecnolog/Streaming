import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { CardsProps, MovieTMDB } from '@/@types/Cards';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Stars from '@/components/ui/StarAverage';
import Adult from '@/components/ui/Adult';
import { FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CastingProps } from '@/@types/movie/cast';
import Footer from '@/components/Footer';
import { minToHour } from '@/utils/UtilitiesFunctions';
import Spinner from '@/components/ui/Loading/spinner';
import { TrailerProps } from '@/@types/trailer';
import TrailerButton from '@/components/ui/TrailerButton';
import { getRelatedCards } from '@/utils/CardsManipulation';
import { useTMDB } from '@/contexts/TMDBContext';
import { useFlix } from '@/contexts/FlixContext';
import debounce from 'lodash.debounce';
import { debug } from '@/classes/DebugLogger';
import { tmdb } from '@/classes/TMDB';
import { mongoService } from '@/classes/MongoContent';
import axios from 'axios';
import CrewContainer from '@/components/movie/CrewContainer';
import { CrewProps } from '@/@types/movie/crew';
import CastContainer from '@/components/movie/CastContaner';
import RelatedCardsContainer from '@/components/movie/RelatedContainer';
import WatchLaterContainer from '@/components/ui/ButtonWatchLater';

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { WatchLaterManager } from '@/classes/watchLaterManager';

interface groupedByDepartment {
    [job: string]: CrewProps[]
}

interface MovieProps {
    movie: MovieTMDB,
    cast: CastingProps[],
    crewByDepartment: groupedByDepartment
}

export default function Movie({ movie, cast, crewByDepartment }: MovieProps) {

    useEffect(() => {
        debug.log('props do MoviePage:', { movie, cast, crewByDepartment });
    }, [movie, cast, crewByDepartment])
    const router = useRouter()
    const [showPoster, setShowPoster] = useState(false)
    const { tmdbId } = router.query;
    const { allData } = useTMDB()
    const { user, setUser, movies, setMovies } = useFlix()
    const [filme, setFilme] = useState<CardsProps | null>(null)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [relatedCards, setRelatedCards] = useState<CardsProps[]>([])
    const [trailer, setTrailer] = useState<TrailerProps | null>(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const watchLaterManager = new WatchLaterManager()

    useEffect(() => {
        if (!movie) return
        const filme = movies.find(mv => mv.tmdbId === movie.id)
        debug.log('Filme encontrado', filme)
        if (!filme) return debug.warn('movie not found')
        setFilme(filme)
    }, [movie, movies])
    //enviar o token pro backend pra verificar o acesso do usuario, pra retornar true ou false

    const watchLater = () => {
        if (!movie || !filme) return
        //aqui vai fazer a request pro backend do next com axios /api/user/list/getmovies
        const onList = watchLaterManager.isOnTheList(filme.tmdbId)
        setOnWatchLater(onList)
    }
    useEffect(() => {
        if (!movie) return
        async function getMoviesMongoDB() {
            const response = await mongoService.fetchMovieData()
            setMovies(response)
        }
        if (movies.length === 0) getMoviesMongoDB()
        if (!filme) return debug.log('filme not found above relatedCards')
        const relatedCards = getRelatedCards(filme, movies, allData)
        if (relatedCards && relatedCards.length > 0) setRelatedCards(relatedCards)
        watchLater()
    }, [movie, movies, allData, filme])

    const handleWidth = debounce(() => {
        if (window.innerWidth <= 915) {
            debug.log(window.innerWidth)
            setShowPoster(true)
        } else {
            setShowPoster(false)
        }
    }, 500)

    useEffect(() => {
        window.addEventListener('resize', handleWidth)
        handleWidth()
        return () => window.removeEventListener('resize', handleWidth)

    }, [handleWidth])
    async function handleWatchLater() {
        if (!user) return router.push('/login')
        if (!movie || !filme) return debug.warn("Erro ao adicionar filme a lista de assistir mais tarde.")

        try {
            if (loadingButton) return
            setLoadingButton(true)
            //fazer requisição post com axios pro backend para a rota api/user/list/add
            const response = await axios.post('/api/user/list/add', filme)
            const data = response.data
            await watchLaterManager.updateCookie('flix-watch', data.request.cookie)
            watchLater()
            toast.success(data.request.message)
        } catch (err: any) {
            debug.error("Erro ao adicionar filme", err)
            const errorMessage = err.response?.data?.message || "Erro ao adicionar filme à lista. Por favor, tente novamente mais tarde!";
            return toast.error(errorMessage)
        } finally {
            setLoadingButton(false)
        }
    }

    useEffect(() => {
        if (!filme) return debug.log('filme not defined for getTrailer inside useEffect')
        const getTrailer = async () => {
            try {
                const trailer = await tmdb.fetchTrailer(filme.tmdbId, 'movie')
                setTrailer(trailer)
            } catch (err) {
                debug.error("Erro ao buscar o trailer", err)
                setTrailer(null)
            }
        }
        getTrailer()
    }, [filme])

    function handlePlay() {
        router.push(`/watch/${tmdbId}`)
    }
    return (
        <>
            <SEO description={movie.overview} title={`${movie.title} - FlixNext`} url={`https://flixnext.com.br/movie/${movie.id}`} image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
            <Header />
            {
                movie && filme ? (
                    <section className={styles.container}>
                        <div
                            className={styles.imageContainer}
                            style={{ backgroundImage: `url(${movie ? `https://image.tmdb.org/t/p/original${showPoster ? movie.poster_path : movie.backdrop_path}` : filme ? filme.background : "/fundo-largo.jpg"})` }}
                        ></div>
                        <div className={styles.loading}>
                            <div className={styles.loadingContainer}><Spinner /></div>
                        </div>
                        <div className={styles.coverContainer}>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.titleContainer}>
                                <h1 className={`${movie.title.toLowerCase() === 'harry potter' && styles.harryFont}`}>{filme.title}</h1>
                                <h3 className={`${movie.title.toLowerCase() === 'harry potter' && styles.subHarryFont}`}>{filme.subtitle != '' && `${filme.subtitle}`}</h3>
                            </div>
                            {movie && (
                                <>
                                    <div>
                                        <div className={styles.movieDetail}>
                                            <h4>{filme.title.toLowerCase() === 'batman vs superman' ?
                                                filme.duration
                                                : minToHour(movie.runtime)} - {new Date(movie.release_date).getFullYear()} - {filme.lang && filme.lang === "Leg" ? "Legendado" : "Dublado"}
                                            </h4>
                                        </div>
                                        <div className={styles.generoContainer}>
                                            <h4>
                                                {
                                                    movie.genres ?
                                                        movie.genres.map(genre =>
                                                            genre.name === "Action & Adventure" ?
                                                                "Ação e Aventura"
                                                                : genre.name === "Sci-Fi & Fantasy" ?
                                                                    "Ficção Científica e Fantasia"
                                                                    : genre.name === "Thriller" ?
                                                                        "Suspense"
                                                                        : genre.name).join(', ')
                                                        : filme && filme.genero.join(', ')
                                                }
                                            </h4>
                                        </div>
                                        <div className={styles.movieInfo}>
                                            <Stars average={movie.vote_average} />
                                            <Adult faixa={filme.faixa} />
                                        </div>
                                    </div>
                                    <div className={styles.buttonPlay} onClick={handlePlay}>
                                        <button type='button'><FaPlay size={25} /><h4>Começar a Assistir</h4></button>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <WatchLaterContainer loading={loadingButton} onClick={handleWatchLater} onWatchLater={onWatchLater} />
                                        {
                                            trailer && trailer.results.length > 0 &&
                                            <TrailerButton trailer={trailer} />
                                        }
                                    </div>
                                    <div className={styles.descriptionContainer}>
                                        <p>{movie.overview}</p>
                                    </div>
                                    {relatedCards &&
                                        <RelatedCardsContainer cards={relatedCards} />
                                    }
                                    {cast &&
                                        <CastContainer cast={cast} />
                                    }
                                    {crewByDepartment &&
                                        <CrewContainer crewDepartment={crewByDepartment} />
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

export const getStaticPaths: GetStaticPaths = async () => {

    const movies = await mongoService.fetchMovieData()
    const paths = movies.map(movie => ({
        params: { tmdbId: movie.tmdbId.toString() }
    })
    )
    //debug.log('ids dos filmes', paths)

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { tmdbId } = context.params as { tmdbId: string };
    //debug.log('ids no staticprops', tmdbId)
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

    try {
        const resMovie = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            },
            params: {
                language: "pt-BR",
            },
        });
        //debug.log('resMovie', resMovie.data)

        // Requisição para dados do elenco (cast)
        const resCast = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            },
        });
        //debug.log('resCast', resCast.data)

        const movieData = resMovie.data;
        const castData = resCast.data;
        const crewData = castData.crew?.length ? castData.crew : [];
        //debug.log('crewData no staticProps', crewData)

        const groupedByDepartment = crewData.reduce((acc: any, crew: any) => {
            if (!crew.department) return acc
            const department = crew.department || "Outros";

            acc[department] = acc[department] || []
            acc[department].push(crew)
            return acc
        }, {});
        //debug.log('groupedByDepartment no staticprops', groupedByDepartment)

        if (!movieData) {
            debug.log('movieData not found')
            return {
                notFound: true,
            };
        }

        return {
            props: {
                movie: movieData,
                cast: castData.cast,
                crewByDepartment: groupedByDepartment,
            },
            revalidate: 60 * 60 * 24 * 1,
        };
    } catch (err) {
        debug.log(err)
        return {
            notFound: true,
        };
    }
};
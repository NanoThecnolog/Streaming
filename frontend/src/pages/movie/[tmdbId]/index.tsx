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

import { GetStaticProps, GetStaticPaths } from "next";
import { WatchLaterManager } from '@/classes/watchLaterManager';
import Overview from '@/components/ui/overview';
import Genre from '@/components/ui/Genre';
import Details from '@/components/ui/DetailContent';
import Title from '@/components/ui/Title';
import Head from 'next/head';
import { WarningModal } from '@/components/ui/WarningModal';

interface groupedByDepartment {
    [job: string]: CrewProps[]
}

interface MovieProps {
    movie: MovieTMDB,
    cast: CastingProps[],
    crewByDepartment: groupedByDepartment
}

export default function Movie({ movie, cast, crewByDepartment }: MovieProps) {
    const router = useRouter()
    const [showPoster, setShowPoster] = useState(false)
    const { tmdbId } = router.query;
    const { allData } = useTMDB()
    const { user, movies, setMovies } = useFlix()
    const [filme, setFilme] = useState<CardsProps | null>(null)
    const [onWatchLater, setOnWatchLater] = useState(false)
    const [relatedCards, setRelatedCards] = useState<CardsProps[]>([])
    const [trailer, setTrailer] = useState<TrailerProps | null>(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const [warningModalOpen, setWarningModalOpen] = useState(false)
    const watchLaterManager = new WatchLaterManager()

    //Schema para melhorar SEO do site. testando para ver se indexa mais filmes
    const movieSchema = {
        "@context": "https://schema.org",
        "@type": "Movie",
        "name": movie.title,
        "description": movie.overview,
        "image": `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        "datePublished": movie.release_date,
        "inLanguage": "pt-BR",
        "genre": movie.genres?.map((g: any) => g.name),
        "aggregateRating": movie.vote_count
            ? {
                "@type": "AggregateRating",
                "ratingValue": movie.vote_average,
                "ratingCount": movie.vote_count
            }
            : undefined,
        "actor": cast.slice(0, 5).map((a: CastingProps) => ({
            "@type": "Person",
            "name": a.name
        }))
    }

    //atualização de dados e estado
    useEffect(() => {
        if (!movie) return
        const filme = movies.find(mv => mv.tmdbId === movie.id)
        debug.log('Filme encontrado', filme)
        if (!filme) return debug.warn('movie not found')
        setFilme(filme)
    }, [movie, movies])


    useEffect(() => {
        if (!movie) return
        const getMoviesMongoDB = async () => {
            const response = await mongoService.fetchMovieData()
            setMovies(response)
        }
        if (movies.length === 0) getMoviesMongoDB()
        if (!filme) return debug.log('filme not found above relatedCards')
        const relatedCards = getRelatedCards(filme, movies, allData)
        if (relatedCards && relatedCards.length > 0) setRelatedCards(relatedCards)
        watchLater()
    }, [movie, movies, allData, filme])

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
    /*useEffect(() => {
        const showingWarningModal = !user || !user.donator
        setWarningModalOpen(showingWarningModal)
    }, [user])*/

    //interação do usuario
    const watchLater = () => {
        if (!movie || !filme) return
        //aqui vai fazer a request pro backend do next com axios /api/user/list/getmovies
        const onList = watchLaterManager.isOnTheList(filme.tmdbId)
        setOnWatchLater(onList)
    }

    const handleWatchLater = async () => {
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

    //responsividade de interface
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


    //auxiliares
    const getBackgroundImage = () => {
        return movie ? `https://image.tmdb.org/t/p/original${showPoster ? movie.poster_path : movie.backdrop_path}` : filme ? filme.background : "/fundo-largo.jpg"
    }
    const handlePlay = () => {
        const showingWarningModal = !user || !user.donator
        if (showingWarningModal) {
            return setWarningModalOpen(showingWarningModal)
        }
        router.push(`/watch/${tmdbId}`)
    }
    return (
        <>
            <Head>
                <title>{`${movie.title} - FlixNext`}</title>
                <meta name="description" content={movie.overview} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Meta OpenGraph */}
                <meta property="og:title" content={`${movie.title} - FlixNext`} />
                <meta property="og:description" content={movie.overview} />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                <meta property="og:url" content={`https://flixnext.com.br/movie/${movie.id}`} />
                <meta property="og:type" content="video.movie" />

                {/* Meta Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${movie.title} - FlixNext`} />
                <meta name="twitter:description" content={movie.overview} />
                <meta name="twitter:image" content={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                <meta property="twitter:url" content={`https://flixnext.com.br/movie/${movie.id}`} />

                <link rel="icon" href="/favicon_io/android-chrome-192x192.png" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(movieSchema)
                    }}
                />
            </Head>
            <Header />
            {
                movie && filme ? (
                    <section className={styles.container}>
                        <div className={styles.imageContainer}>
                            <img src={getBackgroundImage()} alt="banner" />
                        </div>
                        <div className={styles.loading}>
                            <div className={styles.loadingContainer}><Spinner /></div>
                        </div>
                        <div className={styles.coverContainer}>
                        </div>
                        <div className={styles.content}>
                            {movie && (
                                <>
                                    <Title title={filme.title} subtitle={filme.subtitle} />
                                    <div>
                                        <Details
                                            title={filme.title}
                                            duration={filme.duration}
                                            runtime={movie.runtime}
                                            releaseDate={movie.release_date}
                                            language={filme.lang}
                                        />
                                        <Genre genres={movie.genres} />
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
                                    <Overview text={movie.overview} />
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
            <WarningModal open={warningModalOpen} onClose={() => setWarningModalOpen(false)} />
            <Footer />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { tmdbId } = context.params as { tmdbId: string };
    //debug.log('ids no staticprops', tmdbId)
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

    try {
        const [resMovie, resCast] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
                headers: { Authorization: `Bearer ${tmdbToken}` },
                params: { language: "pt-BR" },
            }),
            axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, {
                headers: { Authorization: `Bearer ${tmdbToken}` },
            }),
        ])

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
            revalidate: 60 * 60 * 24,
        };
    } catch (err) {
        debug.log(err)
        return {
            notFound: true,
        };
    }
};
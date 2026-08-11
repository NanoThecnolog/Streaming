import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { CardsProps, MovieTMDB } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import Header from '@/components/Header'
import Stars from '@/components/ui/StarAverage'
import Adult from '@/components/ui/Adult'
import { toast } from '@/components/ui/Notifications'
import { CastingProps } from '@/@types/movie/cast'
import Footer from '@/components/Footer'
import Spinner from '@/components/ui/Loading/spinner'
import { TrailerProps } from '@/@types/trailer'
import TrailerButton from '@/components/ui/TrailerButton'
import { getRelatedContent } from '@/utils/CardsManipulation'
import { useTMDB } from '@/contexts/TMDBContext'
import { useFlix } from '@/contexts/FlixContext'
import { debug } from '@/classes/DebugLogger'
import { tmdb } from '@/classes/TMDB'
import axios from 'axios'
import CrewContainer from '@/components/movie/CrewContainer'
import { CrewProps } from '@/@types/movie/crew'
import CastContainer from '@/components/movie/CastContaner'
import RelatedCardsContainer from '@/components/movie/RelatedContainer'
import WatchLaterContainer from '@/components/ui/ButtonWatchLater'
import { GetStaticProps, GetStaticPaths } from 'next'
import { WatchLaterManager } from '@/classes/watchLaterManager'
import Overview from '@/components/ui/overview'
import Genre from '@/components/ui/Genre'
import Details from '@/components/ui/DetailContent'
import Title from '@/components/ui/Title'
import Head from 'next/head'
import { WarningModal } from '@/components/ui/WarningModal'
import { ProgressData, ProgressEntry, ProgressResponse } from '@/@types/watchedProgress'
import { calculateVideoProgress, hasAccess } from '@/utils/UtilitiesFunctions'
import { FaCirclePlay } from 'react-icons/fa6'
import { FaPlay } from 'react-icons/fa'
import { SubscriptionProps } from '@/@types/user'

interface groupedByDepartment {
  [job: string]: CrewProps[]
}

interface MovieProps {
  movie: MovieTMDB
  cast: CastingProps[]
  crewByDepartment: groupedByDepartment
}

export default function Movie({ movie, cast, crewByDepartment }: MovieProps) {
  const router = useRouter()
  const { tmdbId } = router.query
  const { allData, serieData } = useTMDB()
  const { user, movies, series, setMovies } = useFlix()
  const [filme, setFilme] = useState<CardsProps | null>(null)
  const [onWatchLater, setOnWatchLater] = useState(false)
  const [relatedCards, setRelatedCards] = useState<Array<CardsProps | SeriesProps>>([])
  const [trailer, setTrailer] = useState<TrailerProps | null>(null)
  const [loadingButton, setLoadingButton] = useState(false)
  const [warningModalOpen, setWarningModalOpen] = useState(false)
  const watchLaterManager = new WatchLaterManager()

  const [isLoadingProgress, setIsLoadingProgress] = useState(false)
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [progressPercentage, setProgressPercentage] = useState(0)

  //Schema para melhorar SEO do site. testando para ver se indexa mais filmes
  const movieSchema = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    datePublished: movie.release_date,
    inLanguage: 'pt-BR',
    genre: movie.genres?.map((g: any) => g.name),
    aggregateRating: movie.vote_count
      ? {
          '@type': 'AggregateRating',
          ratingValue: movie.vote_average,
          ratingCount: movie.vote_count,
          bestRating: 10,
          worstRating: 0,
        }
      : undefined,
    actor: cast.slice(0, 5).map((a: CastingProps) => ({
      '@type': 'Person',
      name: a.name,
    })),
  }

  //atualização de dados e estado
  useEffect(() => {
    if (!movie) return
    const filme = movies.find((mv) => mv.tmdbId === movie.id)
    debug.log('Filme encontrado', filme)
    if (!filme) {
      debug.warn('movie not found')
      return
    }
    setFilme(filme)
  }, [movie, movies])

  useEffect(() => {
    if (!movie) return
    /*const getMoviesMongoDB = async () => {
            const response = await mongoService.fetchMovieData()
            setMovies(response)
        }
        if (movies.length === 0) getMoviesMongoDB()*/
    if (!filme) return debug.log('movie not found above relatedCards')
    const relatedCards = getRelatedContent(filme, movies, series, allData, serieData)
    if (relatedCards && relatedCards.length > 0) setRelatedCards(relatedCards)
    watchLater()
  }, [movie, movies, series, allData, serieData, filme])

  useEffect(() => {
    if (movies.length === 0) return
    const movieExist = movies.some((m) => m.tmdbId === movie.id)
    if (!movieExist) router.replace('/404')
  }, [movies, movie])

  useEffect(() => {
    if (!filme) return debug.log('movie not defined for getTrailer inside useEffect')
    const getTrailer = async () => {
      try {
        const trailer = await tmdb.fetchTrailer(filme.tmdbId, 'movie')
        setTrailer(trailer)
      } catch (err) {
        debug.error('Erro ao buscar o trailer', err)
        setTrailer(null)
      }
    }
    getTrailer()
  }, [filme])
  /*useEffect(() => {
        const showingWarningModal = !user || !user.donator
        setWarningModalOpen(showingWarningModal)
    }, [user])*/

  useEffect(() => {
    const controller = new AbortController()

    const fetchProgress = async () => {
      //if(isLoadingProgress) return
      setIsLoadingProgress(true)
      try {
        const { data } = await axios.get<ProgressResponse>('/api/watched/progress', {
          params: {
            tmdbID: movie.id,
          },
          signal: controller.signal,
        })
        debug.log(data.result)
        const hasProgress = data.result.length > 0
        const progress = hasProgress
          ? calculateVideoProgress(data.result[0].progress, movie.runtime)
          : 0
        setProgressPercentage(progress)
        setProgressData(data.result)
      } catch (err) {
        if (!axios.isCancel(err)) debug.error('Erro ao buscar progresso do filme', err)
      } finally {
        if (!controller.signal.aborted) setIsLoadingProgress(false)
      }
    }

    void fetchProgress()
    return () => {
      controller.abort()
    }
  }, [movie.id])

  //==================================================================================================================
  //==========================================Dados Derivados=========================================================
  //==================================================================================================================
  const backdropImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : (filme?.background ?? '/fundo-largo.jpg')

  const posterImage = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : backdropImage

  const safeProgressPercentage = Math.min(Math.max(progressPercentage, 0), 100)

  const hasProgress = safeProgressPercentage > 0 && safeProgressPercentage < 92

  const playLabel =
    safeProgressPercentage >= 92
      ? 'Assistir novamente'
      : hasProgress
        ? 'Continuar assistindo'
        : 'Começar a assistir'

  const formatRevenue = (revenue: number): string | null => {
    if (revenue <= 0) return null

    const units = [
      { value: 1_000_000_000, singular: 'bilhão', plural: 'bilhões' },
      { value: 1_000_000, singular: 'milhão', plural: 'milhões' },
      { value: 1_000, singular: 'mil', plural: 'mil' },
    ]
    const unit = units.find(({ value }) => revenue >= value)

    if (!unit) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(revenue)
    }

    const amount = revenue / unit.value
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 2,
    }).format(amount)
    const label = amount === 1 ? unit.singular : unit.plural

    return `US$ ${formattedAmount} ${label}`
  }

  const formattedRevenue = formatRevenue(movie.revenue)

  const PlayIcon = hasProgress ? FaPlay : FaCirclePlay

  //interação do usuario
  const watchLater = () => {
    if (!movie || !filme) return
    //aqui vai fazer a request pro backend do next com axios /api/user/list/getmovies
    const onList = watchLaterManager.isOnTheList(filme.tmdbId)
    setOnWatchLater(onList)
  }

  const handleWatchLater = async () => {
    if (!user) return router.push('/login')
    if (!movie || !filme)
      return debug.warn('Erro ao adicionar filme a lista de assistir mais tarde.')

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
      debug.error('Erro ao adicionar filme', err)
      const errorMessage =
        err.response?.data?.message ||
        'Erro ao adicionar filme à lista. Por favor, tente novamente mais tarde!'
      return toast.error(errorMessage)
    } finally {
      setLoadingButton(false)
    }
  }

  //auxiliares
  const handlePlay = () => {
    if (!user || !hasAccess(user)) return setWarningModalOpen(true)

    const params = new URLSearchParams({
      startTime: `${progressData[0]?.progress ?? 0}`,
    })
    router.push(`/watch/${tmdbId}?${params}`)
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
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
        <meta property="og:url" content={`https://flixnext.com.br/movies/movie/${movie.id}`} />
        <meta property="og:type" content="video.movie" />

        {/* Meta Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${movie.title} - FlixNext`} />
        <meta name="twitter:description" content={movie.overview} />
        <meta
          name="twitter:image"
          content={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
        <meta property="twitter:url" content={`https://flixnext.com.br/movies/movie/${movie.id}`} />

        <link rel="icon" href="/favicon_io/android-chrome-192x192.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(movieSchema),
          }}
        />
      </Head>
      <Header />
      {movie && filme ? (
        <main className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.imageContainer} aria-hidden="true">
              <picture>
                <source media="(max-width: 915px)" srcSet={posterImage} />

                <img src={backdropImage} alt="" loading="eager" decoding="async" />
              </picture>
            </div>

            <div className={styles.heroOverlay} />

            <div className={styles.heroContent}>
              <div className={styles.mainInformation}>
                <Title title={filme.title} subtitle={filme.subtitle} />

                <div className={styles.metadata}>
                  <Details
                    //title={filme.title}
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

                  {formattedRevenue && (
                    <ul
                      className={styles.contentFacts}
                      aria-label="Informações adicionais do filme"
                    >
                      <li>Receita: {formattedRevenue}</li>
                    </ul>
                  )}
                </div>

                <Overview text={movie.overview} />

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.buttonPlay}
                    onClick={handlePlay}
                    disabled={isLoadingProgress}
                    aria-busy={isLoadingProgress}
                  >
                    <PlayIcon aria-hidden="true" size={30} />

                    <span>{isLoadingProgress ? 'Carregando progresso...' : playLabel}</span>

                    {hasProgress && (
                      <span
                        className={styles.progressContainer}
                        role="progressbar"
                        aria-label={`${Math.round(safeProgressPercentage)}% assistido`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(safeProgressPercentage)}
                      >
                        <span
                          className={styles.progressFill}
                          style={{
                            width: `${safeProgressPercentage}%`,
                          }}
                        />
                      </span>
                    )}
                  </button>

                  <div className={styles.buttonContainer}>
                    <WatchLaterContainer
                      loading={loadingButton}
                      onClick={handleWatchLater}
                      onWatchLater={onWatchLater}
                    />

                    {trailer && trailer.results.length > 0 && <TrailerButton trailer={trailer} />}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.additionalContent}>
            {relatedCards.length > 0 && <RelatedCardsContainer cards={relatedCards} />}

            {cast.length > 0 && <CastContainer cast={cast} />}

            {crewByDepartment && <CrewContainer crewDepartment={crewByDepartment} />}
          </section>
        </main>
      ) : (
        <main className={styles.loading}>
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        </main>
      )}

      <WarningModal open={warningModalOpen} onClose={() => setWarningModalOpen(false)} />

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { tmdbId } = context.params as { tmdbId: string }
  //debug.log('ids no staticprops', tmdbId)
  const tmdbToken = process.env.TMDB_TOKEN

  try {
    const [resMovie, resCast /*progressData*/] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
        headers: { Authorization: `Bearer ${tmdbToken}` },
        params: { language: 'pt-BR' },
      }),
      axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, {
        headers: { Authorization: `Bearer ${tmdbToken}` },
      }),
      /*axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_LINK}/api/watched/progress`, {
                params: {
                    tmdbID: tmdbId
                }
            })*/
    ])

    const movieData = resMovie.data
    const castData = resCast.data
    const crewData = castData.crew?.length ? castData.crew : []
    //debug.log('crewData no staticProps', crewData)

    const groupedByDepartment = crewData.reduce((acc: any, crew: any) => {
      if (!crew.department) return acc
      const department = crew.department || 'Outros'

      acc[department] = acc[department] || []
      acc[department].push(crew)
      return acc
    }, {})
    //debug.log('groupedByDepartment no staticprops', groupedByDepartment)

    if (!movieData) {
      debug.log('movieData not found')
      return {
        notFound: true,
      }
    }

    return {
      props: {
        movie: movieData,
        cast: castData.cast,
        crewByDepartment: groupedByDepartment,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    debug.log(err)
    return {
      notFound: true,
    }
  }
}

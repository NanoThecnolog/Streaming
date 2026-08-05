import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    useEffect,
    useMemo,
    useState,
} from 'react'

import axios from 'axios'
import { verify } from 'jsonwebtoken'
import nookies from 'nookies'
import { FaPlay } from 'react-icons/fa'
import { toast } from 'react-toastify'

import {
    Episodes,
    SeriesProps,
    TMDBEpisodes,
    TMDBSeries,
} from '@/@types/series'
import { CastProps } from '@/@types/movie/cast'
import { groupedByDepartment } from '@/@types/movie/crew'
import {
    EpisodeProgressProps,
    ProgressResponse,
} from '@/@types/watchedProgress'
import { TrailerProps } from '@/@types/trailer'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import Title from '@/components/ui/Title'
import Genre from '@/components/ui/Genre'
import Overview from '@/components/ui/overview'
import Stars from '@/components/ui/StarAverage'
import ContentRating from '@/components/ui/Adult'
import WatchLaterContainer from '@/components/ui/ButtonWatchLater'
import TrailerButton from '@/components/ui/TrailerButton'
import NewContent from '@/components/ui/NewContent'
import Spinner from '@/components/ui/Loading/spinner'
import { WarningModal } from '@/components/ui/WarningModal'

import CastContainer from '@/components/movie/CastContaner'
import CrewContainer from '@/components/movie/CrewContainer'
import RelatedCardsContainer from '@/components/movie/RelatedContainer'
import EpisodeCard from '@/components/seriesComponents/EpisodeCard'

import { useFlix } from '@/contexts/FlixContext'
import { useTMDB } from '@/contexts/TMDBContext'

import { WatchLaterManager } from '@/classes/watchLaterManager'
import { mongoService } from '@/classes/MongoContent'
import { tmdb } from '@/classes/TMDB'
import { debug } from '@/classes/DebugLogger'

import { getRelatedSerieCards } from '@/utils/CardsManipulation'
import {
    calculateVideoProgress,
} from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

interface SeriePageProps {
    data: TMDBSeries
    buttonVisible: boolean
}

const getSeasonLanguage = (
    language?: string,
): string | null => {
    if (
        language === 'Leg' ||
        language === 'Legendado'
    ) {
        return 'Legendado'
    }

    if (
        language === 'Dub' ||
        language === 'Dublado'
    ) {
        return 'Dublado'
    }

    return null
}

export default function Serie({
    data,
    buttonVisible,
}: SeriePageProps) {
    const router = useRouter()

    const { user, series, setSeries } = useFlix()
    const { serieData } = useTMDB()

    const watchLaterManager = useMemo(
        () => new WatchLaterManager(),
        [],
    )

    const [serie, setSerie] =
        useState<SeriesProps | null>(null)

    const [seasonToShow, setSeasonToShow] =
        useState(1)

    const [episodesToShow, setEpisodesToShow] =
        useState<Episodes[]>([])

    const [episodesData, setEpisodesData] =
        useState<Array<TMDBEpisodes[] | null>>([])

    const [episodeProgress, setEpisodeProgress] =
        useState<EpisodeProgressProps[]>([])

    const [onWatchLater, setOnWatchLater] =
        useState(false)

    const [relatedCards, setRelatedCards] =
        useState<SeriesProps[]>([])

    const [cast, setCast] =
        useState<CastProps[]>([])

    const [crewDepartment, setCrewDepartment] =
        useState<groupedByDepartment>({})

    const [castLoading, setCastLoading] =
        useState(true)

    const [loadingButton, setLoadingButton] =
        useState(false)

    const [trailer, setTrailer] =
        useState<TrailerProps | null>(null)

    const [
        warningModalOpen,
        setWarningModalOpen,
    ] = useState(false)

    /*
     * Busca os dados internos da série.
     */
    useEffect(() => {
        let active = true

        setSerie(null)
        setRelatedCards([])
        setCast([])
        setCrewDepartment({})
        setEpisodesData([])
        setEpisodeProgress([])

        const fetchSerie = async () => {
            try {
                const response =
                    await mongoService.findOneSerieById(
                        data.id,
                    )

                if (!active) return

                if (!response) {
                    await router.replace('/404')
                    return
                }

                setSerie(response)

                setSeasonToShow(
                    response.season[0]?.s ?? 1,
                )
            } catch (error) {
                debug.error(
                    'Erro ao buscar dados internos da série',
                    error,
                )

                if (active) {
                    await router.replace('/404')
                }
            }
        }

        void fetchSerie()

        return () => {
            active = false
        }
    }, [data.id, router])

    /*
     * Atualiza os episódios internos exibidos quando
     * a temporada é alterada.
     */
    useEffect(() => {
        if (!serie) {
            setEpisodesToShow([])
            return
        }

        const selectedSeason = serie.season.find(
            season => season.s === seasonToShow,
        )

        setEpisodesToShow(
            selectedSeason?.episodes ?? [],
        )
    }, [serie, seasonToShow])

    /*
     * Verifica se a série está na Minha Lista.
     */
    useEffect(() => {
        if (!serie) return

        const onList =
            watchLaterManager.isOnTheList(
                serie.tmdbID,
            )

        setOnWatchLater(onList)
    }, [serie, watchLaterManager])

    /*
     * Busca os metadados de todos os episódios uma única
     * vez para cada série.
     */
    useEffect(() => {
        if (!serie) {
            setEpisodesData([])
            return
        }

        let active = true

        const loadEpisodesData = async () => {
            try {
                setEpisodesData([])

                const result = await Promise.all(
                    serie.season.map(season => (
                        tmdb.fetchEpisodeData(
                            serie.tmdbID,
                            season.s,
                        )
                    )),
                )

                if (active) {
                    setEpisodesData(result)
                }
            } catch (error) {
                debug.error(
                    'Erro ao buscar episódios da série',
                    error,
                )
            }
        }

        void loadEpisodesData()

        return () => {
            active = false
        }
    }, [serie])

    /*
     * Confirma se a série continua disponível no catálogo.
     */
    useEffect(() => {
        if (series.length === 0) return

        const seriesExists = series.some(
            item => item.tmdbID === data.id,
        )

        if (!seriesExists) {
            void router.replace('/404')
        }
    }, [series, data.id, router])

    /*
     * Busca e calcula os conteúdos relacionados.
     */
    useEffect(() => {
        if (!serie) return

        let active = true

        const loadRelatedCards = async () => {
            try {
                if (series.length === 0) {
                    const response =
                        await mongoService.fetchSerieData()

                    if (active) {
                        setSeries(response)
                    }

                    return
                }

                const related =
                    getRelatedSerieCards(
                        serie,
                        series,
                        serieData,
                    ) ?? []

                if (active) {
                    setRelatedCards(related)
                }
            } catch (error) {
                debug.error(
                    'Erro ao buscar séries relacionadas',
                    error,
                )

                if (active) {
                    setRelatedCards([])
                }
            }
        }

        void loadRelatedCards()

        return () => {
            active = false
        }
    }, [
        serie,
        series,
        serieData,
        setSeries,
    ])

    /*
     * Busca o trailer da série.
     */
    useEffect(() => {
        let active = true

        const loadTrailer = async () => {
            try {
                const response =
                    await tmdb.fetchTrailer(
                        data.id,
                        'tv',
                    )

                if (active) {
                    setTrailer(response ?? null)
                }
            } catch (error) {
                debug.error(
                    'Erro ao buscar trailer da série',
                    error,
                )

                if (active) {
                    setTrailer(null)
                }
            }
        }

        void loadTrailer()

        return () => {
            active = false
        }
    }, [data.id])

    /*
     * Busca elenco e equipe técnica da série e de suas
     * temporadas.
     */
    useEffect(() => {
        if (!serie) return

        let active = true

        const loadCastAndCrew = async () => {
            setCastLoading(true)

            try {
                const mainCredits =
                    await tmdb.fetchSeriesCast(
                        data.id,
                    )

                if (!mainCredits) {
                    if (active) {
                        setCast([])
                        setCrewDepartment({})
                    }

                    return
                }

                const seasonCredits =
                    await Promise.all(
                        serie.season.map(season => (
                            tmdb.fetchSeriesCastBySeason(
                                data.id,
                                season.s,
                            )
                        )),
                    )

                const credits = [
                    mainCredits,
                    ...seasonCredits,
                ].filter(
                    (
                        item,
                    ): item is CastProps => Boolean(item),
                )

                const crewMembers = credits.flatMap(
                    credit => (
                        Array.isArray(credit.crew)
                            ? credit.crew
                            : []
                    ),
                )

                const departments =
                    crewMembers.reduce<groupedByDepartment>(
                        (accumulator, crewMember) => {
                            const department =
                                crewMember.department

                            if (!department) {
                                return accumulator
                            }

                            if (!accumulator[department]) {
                                accumulator[department] = []
                            }

                            accumulator[department].push(
                                crewMember,
                            )

                            return accumulator
                        },
                        {},
                    )

                if (active) {
                    setCast(credits)
                    setCrewDepartment(departments)
                }
            } catch (error) {
                debug.error(
                    'Erro ao buscar elenco e equipe da série',
                    error,
                )

                if (active) {
                    setCast([])
                    setCrewDepartment({})
                }
            } finally {
                if (active) {
                    setCastLoading(false)
                }
            }
        }

        void loadCastAndCrew()

        return () => {
            active = false
        }
    }, [serie, data.id])

    /*
     * Busca o progresso assistido e relaciona cada registro
     * com o runtime retornado pelo TMDB.
     */
    useEffect(() => {
        if (episodesData.length === 0) {
            setEpisodeProgress([])
            return
        }

        const controller = new AbortController()

        const fetchProgress = async () => {
            try {
                const response =
                    await axios.get<ProgressResponse>(
                        '/api/watched/progress',
                        {
                            params: {
                                tmdbID: data.id,
                            },
                            signal: controller.signal,
                        },
                    )

                const allEpisodes =
                    episodesData.flatMap(
                        season => season ?? [],
                    )

                const episodesWithProgress:
                    EpisodeProgressProps[] =
                    response.data.result.flatMap(
                        progress => {
                            const episode =
                                allEpisodes.find(item => (
                                    item.episode_number ===
                                    progress.episode &&
                                    item.season_number ===
                                    progress.season
                                ))

                            if (
                                !episode ||
                                !episode.runtime
                            ) {
                                return []
                            }

                            const percentage =
                                calculateVideoProgress(
                                    progress.progress,
                                    episode.runtime,
                                )

                            return [{
                                episode:
                                    episode.episode_number,
                                season:
                                    episode.season_number,
                                progress:
                                    progress.progress,
                                percentage,
                                complete: percentage > 95,
                            }]
                        },
                    )

                setEpisodeProgress(
                    episodesWithProgress,
                )
            } catch (error) {
                if (!axios.isCancel(error)) {
                    debug.error(
                        'Erro ao buscar o progresso da série',
                        error,
                    )
                }
            }
        }

        void fetchProgress()

        return () => {
            controller.abort()
        }
    }, [data.id, episodesData])

    /*
     * Mapa para evitar percorrer todos os progressos
     * durante a renderização de cada episódio.
     */
    const episodesProgressMap = useMemo(() => {
        return new Map(
            episodeProgress.map(item => [
                `${item.season}-${item.episode}`,
                item,
            ]),
        )
    }, [episodeProgress])

    /*
     * Remove atores repetidos entre os créditos gerais
     * e os créditos das temporadas.
     */
    const castMembers = useMemo(() => {
        const identifiers = new Set<number>()

        return cast
            .flatMap(credits => credits.cast ?? [])
            .filter(actor => {
                if (identifiers.has(actor.id)) {
                    return false
                }

                identifiers.add(actor.id)

                return true
            })
            .slice(0, 20)
    }, [cast])

    const handleWatchLater = async () => {
        if (!user) {
            await router.push('/login')
            return
        }

        if (!serie || loadingButton) return

        try {
            setLoadingButton(true)

            const response = await axios.post(
                '/api/user/list/add',
                serie,
            )

            const responseData = response.data

            await watchLaterManager.updateCookie(
                'flix-watch',
                responseData.request.cookie,
            )

            const onList =
                watchLaterManager.isOnTheList(
                    serie.tmdbID,
                )

            setOnWatchLater(onList)

            toast.success(
                responseData.request.message,
            )
        } catch (error) {
            debug.error(
                'Erro ao atualizar Minha Lista',
                error,
            )

            const message = axios.isAxiosError(error)
                ? error.response?.data?.message
                : null

            toast.error(
                message ??
                'Erro inesperado ao atualizar sua lista.',
            )
        } finally {
            setLoadingButton(false)
        }
    }

    const handleChangeSeason = (
        seasonNumber: number,
    ) => {
        if (!serie) return

        const seasonExists = serie.season.some(
            season => season.s === seasonNumber,
        )

        if (seasonExists) {
            setSeasonToShow(seasonNumber)
        }
    }

    const handlePlayEpisode = (
        episodeData: Episodes,
        startTime = 0,
        seasonNumber = seasonToShow,
    ) => {
        if (!serie) return

        const requiresSubscription =
            !user || !user.donator

        if (requiresSubscription) {
            setWarningModalOpen(true)
            return
        }

        const params = new URLSearchParams({
            episode: `${episodeData.ep}`,
            tmdbID: `${serie.tmdbID}`,
            src: `${episodeData.src}`,
            season: `${seasonNumber}`,
            startTime: `${startTime}`,
        })

        void router.push(
            `/watch/serie?${params.toString()}`,
        )
    }

    const firstSeason = serie?.season[0]
    const firstEpisode = firstSeason?.episodes[0]

    const seasonsAmount =
        serie?.season.length ?? 0

    const seasonsLabel = seasonsAmount === 1
        ? '1 temporada'
        : `${seasonsAmount} temporadas`

    const releaseYear =
        data.first_air_date
            ?.match(/^(\d{4})/)?.[1] ?? null

    const backdropImage = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : serie?.background ?? '/fundo-largo.jpg'

    const posterImage = data.poster_path
        ? `https://image.tmdb.org/t/p/w780${data.poster_path}`
        : backdropImage

    const socialImage = data.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
        : 'https://flixnext.com.br/fundo-largo.jpg'

    const genres = data.genres?.length
        ? data.genres
        : (
            serie?.genero.map((name, index) => ({
                id: -(index + 1),
                name,
            })) ?? []
        )

    const overview =
        serie?.description?.trim() ||
        data.overview?.trim() ||
        ''

    const selectedSeasonIndex = serie
        ? serie.season.findIndex(
            season => season.s === seasonToShow,
        )
        : -1

    const selectedSeasonEpisodes =
        selectedSeasonIndex >= 0
            ? episodesData[selectedSeasonIndex]
            : null

    const hasCrew =
        Object.keys(crewDepartment).length > 0

    return (
        <>
            <Head>
                <title>
                    {`${data.name} - FlixNext`}
                </title>

                <meta
                    name="description"
                    content={data.overview}
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:title"
                    content={`${data.name} - FlixNext`}
                />

                <meta
                    property="og:description"
                    content={data.overview}
                />

                <meta
                    property="og:image"
                    content={socialImage}
                />

                <meta
                    property="og:url"
                    content={
                        `https://flixnext.com.br/series/serie/${data.id}`
                    }
                />

                <meta
                    property="og:type"
                    content="video.tv_show"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />

                <meta
                    name="twitter:title"
                    content={`${data.name} - FlixNext`}
                />

                <meta
                    name="twitter:description"
                    content={data.overview}
                />

                <meta
                    name="twitter:image"
                    content={socialImage}
                />

                <link
                    rel="icon"
                    href="/favicon_io/android-chrome-192x192.png"
                />
            </Head>

            {//<Header />
            }

            {serie ? (
                <main className={styles.container}>
                    <section className={styles.hero}>
                        <div
                            className={styles.imageContainer}
                            aria-hidden="true"
                        >
                            <picture>
                                <source
                                    media="(max-width: 915px)"
                                    srcSet={posterImage}
                                />

                                <img
                                    src={backdropImage}
                                    alt=""
                                    loading="eager"
                                    decoding="async"
                                />
                            </picture>
                        </div>

                        <div
                            className={styles.heroOverlay}
                        />

                        <div
                            className={styles.heroContent}
                        >
                            <div
                                className={
                                    styles.mainInformation
                                }
                            >
                                <Title
                                    title={serie.title}
                                    subtitle={serie.subtitle}
                                />

                                <div
                                    className={
                                        styles.metadata
                                    }
                                >
                                    <ul
                                        className={
                                            styles.seriesDetails
                                        }
                                        aria-label="Informações da série"
                                    >
                                        <li>
                                            {seasonsLabel}
                                        </li>

                                        {releaseYear && (
                                            <li>
                                                {releaseYear}
                                            </li>
                                        )}
                                    </ul>

                                    <Genre genres={genres} />

                                    <div
                                        className={
                                            styles.tmdbInfo
                                        }
                                    >
                                        {serie.news && (
                                            <NewContent
                                                type={
                                                    serie.news
                                                }
                                            />
                                        )}

                                        <Stars
                                            average={
                                                data.vote_average ??
                                                0
                                            }
                                        />

                                        <ContentRating
                                            faixa={
                                                serie.faixa
                                            }
                                        />
                                    </div>
                                </div>

                                <Overview text={overview} />

                                <div
                                    className={
                                        styles.actions
                                    }
                                >
                                    <button
                                        type="button"
                                        className={
                                            styles.buttonPlay
                                        }
                                        disabled={
                                            !firstEpisode
                                        }
                                        onClick={() => {
                                            if (
                                                !firstEpisode ||
                                                !firstSeason
                                            ) {
                                                return
                                            }

                                            handlePlayEpisode(
                                                firstEpisode,
                                                0,
                                                firstSeason.s,
                                            )
                                        }}
                                    >
                                        <FaPlay
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Assistir
                                        </span>
                                    </button>

                                    <div
                                        className={
                                            styles.buttonContainer
                                        }
                                    >
                                        <WatchLaterContainer
                                            loading={
                                                loadingButton
                                            }
                                            onWatchLater={
                                                onWatchLater
                                            }
                                            onClick={() => {
                                                void handleWatchLater()
                                            }}
                                        />

                                        {trailer && (
                                            <TrailerButton
                                                trailer={
                                                    trailer
                                                }
                                            />
                                        )}

                                        {buttonVisible && (
                                            <button
                                                type="button"
                                                className={
                                                    styles.editButton
                                                }
                                                onClick={() => {
                                                    void router.push(
                                                        `/dashboard?id=${data.id}`,
                                                    )
                                                }}
                                            >
                                                Editar série
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className={
                            styles.episodesSection
                        }
                        aria-labelledby="episodes-title"
                    >
                        <header
                            className={
                                styles.episodesHeader
                            }
                        >
                            <h2
                                id="episodes-title"
                                className={
                                    styles.sectionTitle
                                }
                            >
                                Episódios
                            </h2>

                            <div
                                className={
                                    styles.seasonControl
                                }
                            >
                                <label
                                    htmlFor="season-select"
                                >
                                    Temporada
                                </label>

                                <div
                                    className={
                                        styles.selectWrapper
                                    }
                                >
                                    <select
                                        id="season-select"
                                        value={
                                            seasonToShow
                                        }
                                        onChange={event => {
                                            handleChangeSeason(
                                                Number(
                                                    event
                                                        .target
                                                        .value,
                                                ),
                                            )
                                        }}
                                    >
                                        {serie.season.map(
                                            season => {
                                                const language =
                                                    getSeasonLanguage(
                                                        season.lang,
                                                    )

                                                return (
                                                    <option
                                                        key={
                                                            season.s
                                                        }
                                                        value={
                                                            season.s
                                                        }
                                                    >
                                                        {
                                                            `Temporada ${season.s}${language
                                                                ? ` · ${language}`
                                                                : ''
                                                            }`
                                                        }
                                                    </option>
                                                )
                                            },
                                        )}
                                    </select>
                                </div>
                            </div>
                        </header>

                        <div
                            className={
                                styles.cardContainer
                            }
                        >
                            {episodesToShow.map(
                                internalEpisode => {
                                    const episode =
                                        selectedSeasonEpisodes
                                            ?.find(
                                                item => (
                                                    item.episode_number ===
                                                    internalEpisode.ep
                                                ),
                                            )

                                    const progress =
                                        episode
                                            ? episodesProgressMap.get(
                                                `${episode.season_number}-${episode.episode_number}`,
                                            ) ?? null
                                            : null

                                    const image =
                                        episode?.still_path
                                            ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                            : '/blurImage.png'

                                    const episodeInfo = {
                                        serieTmdbId:
                                            serie.tmdbID,
                                        seasonNumber:
                                            episode
                                                ?.season_number ??
                                            seasonToShow,
                                        image,
                                        episode,
                                        data:
                                            internalEpisode,
                                        progress,
                                    }

                                    return (
                                        <div
                                            key={
                                                `${seasonToShow}-${internalEpisode.ep}`
                                            }
                                            className={
                                                styles.episodeContainer
                                            }
                                        >
                                            <EpisodeCard
                                                episodeData={
                                                    episodeInfo
                                                }
                                                handlePlay={
                                                    handlePlayEpisode
                                                }
                                            />
                                        </div>
                                    )
                                },
                            )}
                        </div>
                    </section>

                    <section
                        className={
                            styles.additionalContent
                        }
                    >
                        {relatedCards.length > 0 && (
                            <RelatedCardsContainer
                                cards={relatedCards}
                            />
                        )}

                        {castLoading ? (
                            <div
                                className={
                                    styles.sectionLoading
                                }
                            >
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                {castMembers.length > 0 && (
                                    <CastContainer
                                        cast={
                                            castMembers
                                        }
                                    />
                                )}

                                {hasCrew && (
                                    <CrewContainer
                                        crewDepartment={
                                            crewDepartment
                                        }
                                    />
                                )}
                            </>
                        )}
                    </section>
                </main>
            ) : (
                <main className={styles.loading}>
                    <Spinner />
                </main>
            )}

            <WarningModal
                open={warningModalOpen}
                onClose={() => {
                    setWarningModalOpen(false)
                }}
            />

            <Footer />
        </>
    )
}

export const getServerSideProps:
    GetServerSideProps<SeriePageProps> = async context => {
        const { tmdbId } = context.params as {
            tmdbId: string
        }

        const tmdbToken =
            process.env.NEXT_PUBLIC_TMDB_TOKEN

        if (!tmdbToken) {
            return {
                notFound: true,
            }
        }

        try {
            const response =
                await axios.get<TMDBSeries>(
                    `https://api.themoviedb.org/3/tv/${tmdbId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${tmdbToken}`,
                        },
                        params: {
                            language: 'pt-BR',
                        },
                    },
                )

            const data = response.data

            if (!data) {
                return {
                    notFound: true,
                }
            }

            const cookies = nookies.get(context)
            const token = cookies['flix-token']
            const jwtSecret =
                process.env.SECRET_JWT

            let userId: string | null = null

            if (token && jwtSecret) {
                try {
                    const decoded = verify(
                        token,
                        jwtSecret,
                    )

                    if (
                        typeof decoded !== 'string' &&
                        typeof decoded.sub === 'string'
                    ) {
                        userId = decoded.sub
                    }
                } catch (error) {
                    debug.warn(
                        'Token inválido ou expirado',
                        error,
                    )
                }
            }

            const adminUserId =
                process.env.ADMIN_USER_ID ??
                '14864ef2-94ca-4b02-a41b-b69dbc306489'

            const buttonVisible =
                userId === adminUserId

            return {
                props: {
                    data,
                    buttonVisible,
                },
            }
        } catch (error) {
            debug.error(
                'Erro ao buscar série no TMDB',
                error,
            )

            return {
                notFound: true,
            }
        }
    }

/*import Router, { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react";
import { Episodes, SeriesProps, TMDBEpisodes, TMDBSeries } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play } from "lucide-react";
import { toast } from "react-toastify";
import { FaCheck, FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Stars from "@/components/ui/StarAverage";
import Adult from "@/components/ui/Adult";
import EpisodeCard from "@/components/seriesComponents/EpisodeCard";
import Spinner from "@/components/ui/Loading/spinner";
import { useTMDB } from "@/contexts/TMDBContext";
import { CastProps } from "@/@types/movie/cast";
import { calculateVideoProgress, translate } from "@/utils/UtilitiesFunctions";
import Cast from "@/components/Cast";
import Crew from "@/components/Crew";
import { TrailerProps } from "@/@types/trailer";
import TrailerButton from "@/components/ui/TrailerButton";
import { useFlix } from "@/contexts/FlixContext";
import NewContent from "@/components/ui/NewContent";
import debounce from "lodash.debounce";
import { debug } from "@/classes/DebugLogger";
import { mongoService } from "@/classes/MongoContent";
import { getRelatedSerieCards } from "@/utils/CardsManipulation";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { tmdb } from "@/classes/TMDB";
import { CrewProps } from "@/@types/movie/crew";
import RelatedCardsContainer from "@/components/movie/RelatedContainer";
import { WatchLaterManager } from "@/classes/watchLaterManager";
import Head from "next/head";

import nookies from 'nookies'
import { verify } from "jsonwebtoken";
import { WarningModal } from "@/components/ui/WarningModal";
import { EpisodeProgressProps, ProgressResponse } from "@/@types/watchedProgress";

interface TMDBImagesProps {
    backdrop: string,
    poster: string
}

interface groupedByDepartment {
    [job: string]: CrewProps[]
}
interface SerieProps {
    data: TMDBSeries,
    buttonVisible: boolean
}



export default function Serie({ data, buttonVisible }: SerieProps) {
    //refatorar
    const router = useRouter()
    const { tmdbId } = router.query;
    const [serie, setSerie] = useState<SeriesProps | null>(null)
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
    const [episodesData, setEpisodesData] = useState<(TMDBEpisodes[] | null)[]>([])
    const { user, series, setSeries } = useFlix()
    const { serieData } = useTMDB()
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [TMDBImage, setTMDBImage] = useState<TMDBImagesProps>()
    const [relatedCards, setRelatedCards] = useState<SeriesProps[]>()
    const [cast, setCast] = useState<CastProps[]>()
    const [crewDepartment, setCrewDepartment] = useState<groupedByDepartment>({})
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [trailer, setTrailer] = useState<TrailerProps | null>(null)
    const [showPoster, setShowPoster] = useState(false)
    const [warningModalOpen, setWarningModalOpen] = useState(false)

    const watchLaterManager = new WatchLaterManager()

    const [progressPercentage, setProgressPercentage] = useState(0)
    const [episodeProgress, setEpisodeProgress] = useState<EpisodeProgressProps[]>([])


    //dados principais
    useEffect(() => {
        if (!tmdbId) return
        setSerie(null)
        setSeasonToShow(1)
        const fetchSerie = async () => {
            const response: SeriesProps | null = await mongoService.findOneSerieById(parseInt(tmdbId as string))
            if (response) {
                setSerie(response)
            }
        }
        fetchSerie()

    }, [tmdbId, router])

    useEffect(() => {
        if (!serie) return;
        //debug.log("seasonToShow:", seasonToShow)
        if (seasonToShow > 0) {
            const episodes = serie.season[seasonToShow - 1]?.episodes
            //debug.log("episódios: ", episodes)
            setEpisodesToShow(episodes)
        }
        fetchEpisodes()
        const onList = watchLaterManager.isOnTheList(serie.tmdbID)
        setOnWatchLater(onList)
    }, [serie, seasonToShow])

    useEffect(() => {
        fetchSerieData()
    }, [serie, serieData])

    useEffect(() => {
        if (serie && tmdbId) getTMDBCast()
    }, [serie])

    useEffect(() => {
        if (series.length === 0) return
        const movieExist = series.some(m => m.tmdbID === data.id)
        if (!movieExist) router.replace('/404')
    }, [series, data])

    useEffect(() => {
        if (!serie) return
        const getSeriesMongoDB = async () => {
            const response = await mongoService.fetchSerieData()
            setSeries(response)
        }
        if (series.length === 0) getSeriesMongoDB()
        //debug.log(serie, series, serieData)
        const relatedCards = getRelatedSerieCards(serie, series, serieData)
        setRelatedCards(relatedCards)
    }, [serie, series, serieData])

    /*useEffect(() => {
        const showingWarningModal = !user || !user.donator
        setWarningModalOpen(showingWarningModal)
    }, [user])/

    useEffect(() => {
        const controller = new AbortController()

        const fetchProgress = async () => {
            try {
                const response = await axios.get<ProgressResponse>('/api/watched/progress', {
                    params: {
                        tmdbID: data.id
                    },
                    signal: controller.signal
                })


                //const hasProgress = response.data.result.length > 0
                const progressData = response.data.result
                debug.log("dados do progresso da série", progressData)
                //quero montar um objeto pra cada episódio que tem dados de progresso no banco.
                //o objeto tem episode, season, progress e percentage
                //pra calcular a porcentagem precisa tem progress e o runtime do episódio, que se encontra em episodesData

                debug.log("episodes Data", episodesData)
                //episodesData um array de obj, cada objeto é uma temporada com outro array com os dados dos episódios daquela temporada

                debug.log("episodes to show", episodesToShow)


                const allEpisodes = episodesData.flat()

                const episodesWithProgress: EpisodeProgressProps[] =
                    progressData.flatMap(progress => {
                        const episode = allEpisodes.find(episode =>
                            episode?.episode_number === progress.episode &&
                            episode.season_number === progress.season
                        )

                        if (!episode || !episode.runtime) return []

                        const percent = calculateVideoProgress(progress.progress, episode.runtime)

                        return [{
                            episode: episode.episode_number,
                            season: episode.season_number,
                            progress: progress.progress,
                            percentage: percent,
                            complete: percent > 95 ? true : false
                        }]
                    })
                debug.log('Episódios com progresso calculado', episodesWithProgress)

                setEpisodeProgress(episodesWithProgress)

            } catch (err) {
                if (!axios.isCancel(err))
                    debug.error("Erro ao buscar progresso do filme", err)
            }
        }

        void fetchProgress()
        return () => {
            controller.abort()
        }
    }, [data.id, episodesData, episodesToShow])

    //map pra facilitar a busca e evitar percorrer episodeProgress várias vezes por episódio.
    const episodesProgressMap = useMemo(() => {
        return new Map(
            episodeProgress.map(item => [
                `${item.season}-${item.episode}`,
                item
            ])
        )
    }, [episodeProgress])

    //interação do usuario
    const handleWatchLater = async (tmdbid: number) => {
        //toast.warning("A função Assistir mais tarde está temporariamente desativada")
        if (!user) return Router.push('/login')
        try {
            if (!serie) return
            if (loadingButton) return
            setLoadingButton(true)
            //console.log('chamando')
            const response = await axios.post('/api/user/list/add', serie)
            const data = response.data
            //debug.log('response da requisição em handleWatchLater', data)

            debug.log(data.request.cookie)
            await watchLaterManager.updateCookie('flix-watch', data.request.cookie)

            const onList = watchLaterManager.isOnTheList(tmdbid)
            debug.log('Resultado do onList', onList)

            setOnWatchLater(onList)
            toast.success(data.request.message)
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            debug.log("Erro na function handleWatchLater", err)
            return toast.error("Erro inesperado ao atualizar sua lista! Fale com o Administrador")
        } finally {
            setLoadingButton(false)
        }
    }

    const handleChangeSeason = (value: number) => {
        //debug.log(serie)
        if (!serie) return
        if (value > 0 && value <= serie.season.length) {
            //debug.log(value)
            setSeasonToShow(value)
        } else return;
    }

    const handlePlayEpisode = (ep: Episodes, startTime?: number, season?: number,) => {
        const showingWarningModal = !user || !user.donator
        if (showingWarningModal) {
            return setWarningModalOpen(showingWarningModal)
        }
        const epNumber = ep.ep
        const episode = new URLSearchParams({
            //title: `${serie?.title}`,
            //subtitle: `${serie?.subtitle}`,
            episode: `${epNumber}`,
            tmdbID: `${serie?.tmdbID}`,
            src: `${ep.src}`,
            season: `${season ?? seasonToShow}`,
            startTime: `${startTime ?? 0}`
        })
        Router.push(`/watch/serie?${episode}`)
    }

    //dados da serie
    const fetchSerieData = async () => {
        try {
            if (!serie) return //debug.warn("Serie ou serieData faltando..")
            let serieInfo: TMDBSeries | null | undefined
            if (!serieData || serieData.length <= 0) {
                serieInfo = await tmdb.fetchSeriesDetails(serie.tmdbID)
            } else {
                //debuglog("Serie data", serieData)
                serieInfo = serieData.find(data => data.id === serie.tmdbID)
            }
            if (!serieInfo) return
            //debuglog("serie Info filtrado", serieInfo)
            setTMDBSerie(serieInfo)
            const backdropURL = `https://image.tmdb.org/t/p/original${serieInfo.backdrop_path}`
            const posterURL = `https://image.tmdb.org/t/p/original${serieInfo.poster_path}`
            setTMDBImage({ backdrop: backdropURL, poster: posterURL })
        } catch (err) {
            debug.error("Erro ao buscar dados da série", err)
        }
    }

    const getTMDBCast = async () => {
        if (loading) return
        setLoading(true)
        try {
            if (!tmdbId || isNaN(Number(tmdbId))) return debug.log("tmdbId", tmdbId, "tipo: ", typeof (tmdbId))
            const mainCast = await tmdb.fetchSeriesCast(Number(tmdbId));

            if (!mainCast) return debug.warn("Nenhum dado sobre o elenco principal da série.")
            const seriesCast: CastProps[] = []
            if (!serie) return debug.warn("Dados da Série não estão presentes");
            for (let i = 0; i < serie.season.length; i++) {
                const castSeason = await tmdb.fetchSeriesCastBySeason(Number(tmdbId), i + 1)
                if (!castSeason) return
                seriesCast.push(mainCast, castSeason)
            }
            if (seriesCast.length <= 0) return debug.warn("Nenhum dado sobre o elenco das temporadas")
            const casting = seriesCast.filter((cast): cast is CastProps => cast !== undefined)

            const crewData = Array.isArray(mainCast.crew) && mainCast.crew.length > 0
                ? mainCast.crew
                : casting.flatMap(team => team.crew)

            const groupedByDepartment = crewData.reduce<groupedByDepartment>((acc, crew) => {
                if (!acc[crew.department]) {
                    acc[crew.department] = [];
                }
                acc[crew.department].push(crew);
                return acc;
            }, {});
            setCrewDepartment(groupedByDepartment)
            setCast(casting)
        } catch (err) {
            debug.error("Erro ao buscar dados sobre o elenco do filme.", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchEpisodes = async () => {
        if (!serie) return
        const episodesArray = await Promise.all(
            serie.season.map(async temp => {
                const episodes = await tmdb.fetchEpisodeData(serie.tmdbID, temp.s)
                return episodes
            })
        )
        setEpisodesData(episodesArray)
    }

    //auxiliares
    useEffect(() => {
        getTrailer()
    }, [router, tmdbId])

    const getTrailer = async () => {
        if (!tmdbId) return
        const trailer = await tmdb.fetchTrailer(Number(tmdbId), 'tv')
        if (!trailer) return setTrailer(null)
        return setTrailer(trailer)
    }

    //responsividade
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

    return (
        <>
            <Head>
                <title>{`${data.name} - FlixNext`}</title>
                <meta name="description" content={data.overview} />

                {/* Meta OpenGraph /}
                <meta property="og:title" content={`${data.name} - FlixNext`} />
                <meta property="og:description" content={data.overview} />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} />
                <meta property="og:url" content={`https://flixnext.com.br/series/serie/${data.id}`} />
                <meta property="og:type" content="video.data" />

                {/* Meta Twitter /}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${data.name} - FlixNext`} />
                <meta name="twitter:description" content={data.overview} />
                <meta name="twitter:image" content={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} />
            </Head>
            <section className={styles.container}>
                <Header />
                {serie ?
                    (
                        <div className={styles.serieContainer}>
                            <div className={styles.imageContainer}
                                style={{ backgroundImage: `url(${showPoster ? TMDBImage?.poster : TMDBImage?.backdrop ? TMDBImage.backdrop : serie?.background})` }}
                            >
                            </div>
                            <div className={styles.imageBackground}>
                                <div className={styles.desc_top}>
                                    <div className={styles.title}>
                                        <h1>{serie.title} {serie.subtitle !== '' && `- ${serie.subtitle}`}</h1>
                                    </div>
                                    <div className={styles.tmdbInfo}>
                                        {serie.news && <NewContent type={serie.news} />}
                                        <Stars average={TMDBSerie?.vote_average ?? 0} />
                                        <Adult faixa={serie.faixa} />
                                    </div>
                                    <div className={styles.seasons}>
                                        <h4>{serie.season.length === 1
                                            ? `${serie.season.length} temporada`
                                            : serie.season.length >= 2 && `${serie.season.length} temporadas`} - {TMDBSerie
                                                ? TMDBSerie.genres.map(genre =>
                                                    genre.name === "Action & Adventure"
                                                        ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                                            ? "Ficção Científica e Fantasia" : genre.name
                                                ).join(', ') : serie.genero.join(', ')}</h4>
                                    </div>
                                    <div className={styles.watchButton} onClick={() => handlePlayEpisode(serie.season[0].episodes[0], serie.season[0].s)}>
                                        <button type="button" className={styles.buttonPlay}>
                                            <FaPlay />
                                            <h4>Assistir</h4>
                                        </button>

                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <div className={styles.watchLater}>
                                            <button type="button" onClick={() => handleWatchLater(serie.tmdbID)}>
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
                                                )
                                                }
                                            </button>
                                        </div>
                                        {trailer && trailer.results.length > 0 &&
                                            <div className={styles.trailerButton}>
                                                <TrailerButton trailer={trailer} />
                                            </div>
                                        }
                                        {
                                            buttonVisible && <button style={{ color: '#fff' }} onClick={() => router.push(`/dashboard?id=${tmdbId}`)}>Editar Serie</button>
                                        }
                                    </div>
                                    <div>
                                        <p>
                                            {serie.description}
                                        </p>
                                    </div>
                                    <div className={styles.selectSeasonContainer}>
                                        <select
                                            value={seasonToShow}
                                            onChange={(e) => handleChangeSeason(Number(e.target.value))}
                                        >
                                            {serie.season.map((s, index) => (
                                                <option key={index} value={s.s}>Temporada {s.s} - {
                                                    s.lang === 'Leg'
                                                        ? 'Legendado'
                                                        : s.lang === 'Legendado'
                                                            ? 'Legendado'
                                                            : s.lang === 'Dub'
                                                                ? 'Dublado'
                                                                : 'Dublado'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardContainer}>
                                {
                                    episodesToShow.map((ep, index) => {
                                        const season = episodesData[seasonToShow - 1];
                                        const episode = season?.find(e => e.episode_number === ep.ep)
                                        //const progress = episodeProgress.find(item => item.season === episode?.season_number && item.episode === episode?.episode_number)
                                        const progress = episode
                                            ? episodesProgressMap.get(`${episode.season_number}-${episode.episode_number}`) ?? null
                                            : null

                                        const image = episode ? `https://image.tmdb.org/t/p/w500${episode?.still_path}` : '/blurImage.png';

                                        const episodeInfo = {
                                            serieTmdbId: serie.tmdbID,
                                            seasonNumber: episode?.season_number,
                                            image: image,
                                            episode: episode,
                                            data: ep,
                                            progress
                                        }
                                        return (
                                            <div key={`${seasonToShow}-${ep.ep}`} className={styles.episodeContainer}>
                                                <EpisodeCard episodeData={episodeInfo} handlePlay={handlePlayEpisode} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.related}>
                                <div className={styles.relatedContainer}>
                                    {relatedCards &&
                                        <RelatedCardsContainer cards={relatedCards} />
                                    }
                                </div>
                            </div>
                            {cast ?
                                (
                                    <>
                                        <div className={styles.cast}>
                                            <h2>Elenco</h2>
                                            <div className={styles.castContainer}>
                                                {
                                                    cast
                                                        .flatMap(object => object.cast.slice(0, 20))
                                                        .filter((actor, index, self) =>
                                                            self.findIndex(a => a.id === actor.id) === index
                                                        )
                                                        .map((actor, index) =>
                                                            <Cast actor={actor} key={index} />
                                                        )
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.crew}>
                                            <h2>Equipe Técnica</h2>
                                            <div className={styles.crewContainer}>
                                                {
                                                    Object.keys(crewDepartment).map((department) => (
                                                        <div key={department} className={styles.departmentGroup}>
                                                            <h3 className={styles.departmentTitle}>{translate(department)}</h3>
                                                            <div className={styles.departmentCrew}>
                                                                {crewDepartment[department]
                                                                    .filter((crew, index, self) =>
                                                                        self.findIndex(c => c.name === crew.name) === index
                                                                    )
                                                                    .map((crew, index) => (
                                                                        <Crew crew={crew} key={index} />
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                                : <div className={styles.loading}><Spinner /></div>
                            }
                        </div>
                    ) : <div className={styles.loading}><Spinner /></div>
                }
            </section >
            <WarningModal open={warningModalOpen} onClose={() => setWarningModalOpen(false)} />
            <Footer />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tmdbId } = context.params as { tmdbId: string }
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;


    const res = await axios.get<TMDBSeries>(`https://api.themoviedb.org/3/tv/${tmdbId}`, {
        headers: {
            Authorization: `Bearer ${tmdbToken}`
        },
        params: {
            language: "pt-BR",
        },
    })

    const data = res.data

    if (!data) {
        return {
            notFound: true,
        }
    }

    const cookies = nookies.get(context)
    const token = cookies['flix-token']
    const env = process.env.SECRET_JWT ?? ''
    debug.log('token dos cookies', token)

    let userId = null
    let buttonVisible: boolean = false
    if (token) {
        try {
            const decoded = verify(token, env)
            userId = decoded.sub
            debug.log('decoded dentro do try', decoded)
        } catch (err) {
            console.error('Token inválido ou expirado', err)
        }
    }

    debug.log('id do usuario no token httponly', userId)
    if (userId && userId === '14864ef2-94ca-4b02-a41b-b69dbc306489') {
        buttonVisible = true
    }

    return {
        props: {
            data,
            buttonVisible
        },
    }
}*/

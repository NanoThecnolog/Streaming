import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Episodes, SeriesProps, TMDBEpisodes, TMDBSeries } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play } from "lucide-react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Stars from "@/components/ui/StarAverage";
import Adult from "@/components/ui/Adult";
import SEO from "@/components/SEO";
import EpisodeCard from "@/components/seriesComponents/EpisodeCard";
import Spinner from "@/components/ui/Loading/spinner";
import { useTMDB } from "@/contexts/TMDBContext";
import { CastProps } from "@/@types/movie/cast";
import { translate } from "@/utils/UtilitiesFunctions";
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
import { GetServerSideProps } from "next";
import axios from "axios";
import { tmdb } from "@/classes/TMDB";
import { CrewProps } from "@/@types/movie/crew";
import RelatedCardsContainer from "@/components/movie/RelatedContainer";
import { WatchLaterManager } from "@/classes/watchLaterManager";

interface TMDBImagesProps {
    backdrop: string,
    poster: string
}

interface groupedByDepartment {
    [job: string]: CrewProps[]
}
interface SerieProps {
    data: TMDBSeries
}

export default function Serie({ data }: SerieProps) {
    //refatorar
    const router = useRouter()
    const { tmdbId } = router.query;
    const [access, setAccess] = useState(false)
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

    const watchLaterManager = new WatchLaterManager()

    /*    useEffect(() => {
            const getAcess = async () => {
                try {
                    const response = await axios.get('/api/user/detail')
                    debug.log('response ', response.data)
                    setAccess(response.data.access)
                } catch (err) {
                    debug.error('Erro ao buscar dados do usuario', user)
                }
            }
            if (user) getAcess()
        }, [user])
    */
    useEffect(() => {
        if (!tmdbId) return
        setSerie(null)
        setSeasonToShow(1)
        //debug.warn("chamando", seasonToShow)
        //const findSerie = series.find((serie) => serie.tmdbID === Number(tmdbId))
        async function fetchSerie() {
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
    async function fetchSerieData() {
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

    useEffect(() => {
        if (serie && tmdbId) getTMDBCast()
    }, [serie])

    async function getTMDBCast() {
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

    async function fetchEpisodes() {
        if (!serie) return
        const episodesArray = await Promise.all(
            serie.season.map(async temp => {
                const episodes = await tmdb.fetchEpisodeData(serie.tmdbID, temp.s)
                return episodes
            })
        )
        setEpisodesData(episodesArray)
    }
    useEffect(() => {
        if (!serie) return
        async function getSeriesMongoDB() {
            const response = await mongoService.fetchSerieData()
            setSeries(response)
        }
        if (series.length === 0) getSeriesMongoDB()
        //debug.log(serie, series, serieData)
        const relatedCards = getRelatedSerieCards(serie, series, serieData)
        setRelatedCards(relatedCards)
    }, [serie, series, serieData])


    function handleChangeSeason(value: number) {
        //debug.log(serie)
        if (!serie) return
        if (value > 0 && value <= serie.season.length) {
            //debug.log(value)
            setSeasonToShow(value)
        } else return;
    }

    function handlePlayEpisode(ep: Episodes, season?: number) {
        const epNumber = ep.ep
        const episode = new URLSearchParams({
            title: `${serie?.title}`,
            subtitle: `${serie?.subtitle}`,
            episode: `${epNumber}`,
            tmdbID: `${serie?.tmdbID}`,
            src: `${ep.src}`,
            season: `${season ?? seasonToShow}`
        })
        Router.push(`/watch/serie?${episode}`)
    }


    async function handleWatchLater(tmdbid: number) {
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

    useEffect(() => {
        getTrailer()
    }, [router, tmdbId])
    async function getTrailer() {
        if (!tmdbId) return
        const trailer = await tmdb.fetchTrailer(Number(tmdbId), 'tv')
        if (!trailer) return setTrailer(null)
        return setTrailer(trailer)
    }

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
            <SEO title={`${data.name} | FlixNext`} description={data.overview} image={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} url={`https://flixnext.com.br/series/serie/${data.id}`} />
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
                                            <Play />
                                            <h4>Começar a Assistir</h4>
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
                                        //debug.log("episodesData: ", episodesData)
                                        const season = episodesData[seasonToShow - 1];
                                        //debug.log("season no render: ", season)
                                        const episode = season?.find(e => e.episode_number === ep.ep)
                                        const image = episode ? `https://image.tmdb.org/t/p/w500${episode?.still_path}` : '/blurImage.png';
                                        const episodeInfo = {
                                            serieTmdbId: serie.tmdbID,
                                            seasonNumber: episode?.season_number,
                                            image: image,
                                            episode: episode,
                                            data: ep
                                        }
                                        return (
                                            <div key={index} className={styles.episodeContainer}>
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
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tmdbId } = context.params as { tmdbId: string }
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;

    //const res = await fetch(`https://api.flixnext.com.br/serie/${tmdbId}`)
    //const res = await apiTMDB.get(`/movie/${tmdbId}`)
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${tmdbId}`, {
        headers: {
            Authorization: `Bearer ${tmdbToken}`
        },
        params: {
            language: "pt-BR",
        },
    })

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
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { series } from "@/js/series";
import { Episodes, SeriesProps, TMDBEpisodes, TMDBSeries } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play } from "lucide-react";
import { toast } from "react-toastify";
import { UserProps } from "@/@types/user";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { fetchEpisodeData, fetchTMDBSerieCast, fetchTMDBSerieCastBySeason, fetchTMDBSeries } from "@/services/fetchTMDBData";
import { getUserCookieData } from "@/services/cookieClient";
import { addWatchLater, isOnTheList } from "@/services/handleWatchLater";
import Stars from "@/components/ui/StarAverage";
import Image from "next/image";
import Adult from "@/components/ui/Adult";
import SEO from "@/components/SEO";
import EpisodeCard from "@/components/seriesComponents/EpisodeCard";
import Spinner from "@/components/ui/Loading/spinner";
import { useTMDB } from "@/contexts/TMDBContext";
import { CastProps, CrewProps } from "@/@types/cast";
import { translate } from "@/utils/UtilitiesFunctions";
import Cast from "@/components/Cast";
import Crew from "@/components/Crew";
import Card from "@/components/seriesComponents/Card";

interface TMDBImagesProps {
    backdrop: string,
    poster: string
}

interface groupedByDepartment {
    [job: string]: CrewProps[]
}

export default function Serie(status: string) {
    //refatorar
    const router = useRouter()
    const { tmdbId } = router.query;
    const [serie, setSerie] = useState<SeriesProps>()
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
    const [episodesData, setEpisodesData] = useState<(TMDBEpisodes[] | null)[]>([])
    const [user, setUser] = useState<UserProps>()
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [headTitle, setHeadTitle] = useState<string>(' ')
    const [TMDBImage, setTMDBImage] = useState<TMDBImagesProps>()
    const { serieData } = useTMDB();
    const [relatedCards, setRelatedCards] = useState<SeriesProps[]>()
    const [cast, setCast] = useState<CastProps[]>()
    const [crewDepartment, setCrewDepartment] = useState<groupedByDepartment>({})
    const [loading, setLoading] = useState(false);


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

    useEffect(() => {
        if (tmdbId) {
            const findSerie = series.find((serie) => serie.tmdbID === Number(tmdbId))
            //console.log(findSerie)
            setSerie(findSerie)
        } else {
            return console.log("tmdbId não está presente")
        }

    }, [tmdbId])
    useEffect(() => {
        if (!serie) return;
        if (seasonToShow > 0) {
            const episodes = serie.season[seasonToShow - 1]?.episodes
            setEpisodesToShow(episodes)
        }
        fetchEpisodes()

        const onList: Promise<boolean> = isOnTheList(serie.title, serie.subtitle, serie.tmdbID)
        onList.then(result => {
            if (!result) {
                setOnWatchLater(false)
            } else {
                setOnWatchLater(true)
            }
        })
        const titulo = `${serie.title} ${serie.subtitle ? `- ${serie.subtitle}` : ''}`
        setHeadTitle(titulo)
    }, [serie, seasonToShow])
    useEffect(() => {
        fetchSerieData()
        if (serie) getTMDBCast()
    }, [tmdbId, serie, serieData])
    async function fetchSerieData() {
        try {
            if (!serie) return //console.warn("Serie ou serieData faltando..")
            let serieInfo: TMDBSeries | null | undefined
            if (!serieData || serieData.length <= 0) {
                serieInfo = await fetchTMDBSeries(serie.tmdbID)
                //console.log("SerieInfo: ", serieInfo)
            } else {
                //console.log("Serie data", serieData)
                serieInfo = serieData.find(data => data.id === serie.tmdbID)
            }
            if (!serieInfo) return
            //console.log("serie Info filtrado", serieInfo)
            setTMDBSerie(serieInfo)
            const backdropURL = `https://image.tmdb.org/t/p/original${serieInfo.backdrop_path}`
            const posterURL = `https://image.tmdb.org/t/p/original${serieInfo.poster_path}`
            setTMDBImage({ backdrop: backdropURL, poster: posterURL })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * Função assíncrona que busca informações sobre atores e equipe técnica da série.
     * @param mainCast - atores principais
     * @param seriesCast - todos os atores envolvidos nas temporadas
     * @param casting - filtragem para retirar possíveis undefined
     * @param crewData - utiliza a equipe técnica geral da série ou a equipe especifica de cada temporada
     * @param groupedByDepartment - agrupa equipe de acordo com a propriedade department
     * @returns Não retorna nada
     */
    async function getTMDBCast() {
        if (loading) return
        setLoading(true)
        try {
            const mainCast = await fetchTMDBSerieCast(Number(tmdbId));

            if (!mainCast) return console.warn("Nenhum dado sobre o elenco principal da série.")
            const seriesCast: CastProps[] = []
            if (!serie) return console.warn("Dados da Série não estão presentes");
            for (let i = 0; i < serie.season.length; i++) {
                const castSeason = await fetchTMDBSerieCastBySeason(Number(tmdbId), i + 1)
                if (!castSeason) return
                seriesCast.push(mainCast, castSeason)
            }
            if (seriesCast.length <= 0) return console.warn("Nenhum dado sobre o elenco das temporadas")
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
            console.error("Erro ao buscar dados sobre o elenco do filme.", err)
        } finally {
            setLoading(false)
        }
    }

    async function fetchEpisodes() {
        if (!serie) return
        const episodesArray = await Promise.all(
            serie.season.map(async temp => {
                const episodes = await fetchEpisodeData(serie.tmdbID, temp.s)
                return episodes
            })
        )
        setEpisodesData(episodesArray)
    }
    useEffect(() => {
        function getRelatedCards() {
            if (serie) {
                const relatedCards = series
                    .filter(card => card.tmdbID !== serie.tmdbID)
                    .map(card => {
                        const titleMatch = card.title.toLowerCase().includes(serie.title.toLowerCase()) ? 2 : 0;
                        const commonGenres = card.genero.filter((genre: string) => serie.genero.includes(genre)).length;
                        const genreScore = commonGenres > 0 ? commonGenres + (commonGenres === serie.genero.length ? 1 : 0) : 0;

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
        getRelatedCards()
    }, [serie])


    function handleChangeSeason(value: string) {
        const season = parseInt(value)
        if (season > 0) {
            setSeasonToShow(season)
        } else return;
    }



    function handlePlayEpisode(ep: Episodes, season?: number) {
        const epNumber = ep.ep
        const episode = new URLSearchParams({
            title: `${serie?.title}`,
            subtitle: `${serie?.subtitle}`,
            episode: `${epNumber}`,
            src: `${ep.src}`,
            season: `${season ?? seasonToShow}`
        })
        Router.push(`/watch/serie?${episode}`)
    }


    async function handleAddUserList(title: string, tmdbid: number, subtitle?: string) {
        //toast.warning("A função Assistir mais tarde está temporariamente desativada")
        if (!user) {
            Router.push('/login')
            return
        }
        try {
            await addWatchLater(user.id, title, tmdbid, subtitle);
            const onList: Promise<boolean> = isOnTheList(title, subtitle)
            onList.then(result => {
                if (!result) {
                    setOnWatchLater(false)
                } else {
                    setOnWatchLater(true)
                }
            })
        } catch (err: any) {
            if (err.response && err.response.data) return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
            console.log(err)
            return toast.error("Erro inesperado ao adicionar série à lista!")
        }
    }

    useEffect(() => {
        function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

        // Impede atalhos de ferramentas de desenvolvedor
        function openConsoleBlock(event: KeyboardEvent) {
            const blockedKeys = ['F12', 'I', 'C', 'J', 'U']
            if (
                blockedKeys.includes(event.key) ||
                (event.ctrlKey && event.shiftKey && blockedKeys.includes(event.key)) ||
                (event.ctrlKey && event.key === 'U')
            ) {
                event.preventDefault();
            }
        };

        document.addEventListener('contextmenu', rightClickBlock);
        document.addEventListener('keydown', openConsoleBlock);

        return () => {
            document.removeEventListener('contextmenu', rightClickBlock);
            document.removeEventListener('keydown', openConsoleBlock);
        };
    }, []);

    return (
        <>
            <SEO title={`${headTitle} | FlixNext`} description={serie?.description || "Descrição indisponível"} />
            <section className={styles.container}>
                <Header userAvatar={user?.avatar} status={status} />
                {serie ?
                    (
                        <div className={styles.serieContainer}>
                            <div className={styles.imageContainer}>
                                <Image className={styles.img} src={TMDBImage?.backdrop ? TMDBImage.backdrop : serie?.background} fill quality={100} alt={serie.title} />
                            </div>
                            <div className={styles.imageBackground}>
                                <div className={styles.desc_top}>
                                    <div className={styles.title}>
                                        <h1>{serie.title} {serie.subtitle !== '' && `- ${serie.subtitle}`}</h1>
                                    </div>
                                    <div className={styles.tmdbInfo}>
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
                                        <button type="button" className={styles.buttonPlay}><Play /><h4>Começar a Assistir</h4></button>
                                    </div>
                                    <div className={styles.watchLater}>
                                        <button type="button" onClick={() => handleAddUserList(serie.title, serie.tmdbID, serie.subtitle)}>
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
                                            )
                                            }

                                        </button>
                                    </div>
                                    <div>
                                        <p>
                                            {serie.description}
                                        </p>
                                    </div>
                                    <div className={styles.selectSeasonContainer}>
                                        <select
                                            onChange={(e) => handleChangeSeason(e.target.value)}
                                        >
                                            {serie.season.map((s, index) => (
                                                <option key={index} value={s.s}>Temporada {s.s} - {s.lang}</option>
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
                                        const image = episode ? `https://image.tmdb.org/t/p/original${episode?.still_path}` : '/blurImage.png';
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
                                <h2>Você também vai gostar</h2>
                                <div className={styles.relatedContainer}>
                                    {relatedCards?.map(card =>
                                        <Card card={card} key={card.tmdbID} />
                                    )}
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
                                                        .map(actor => <Cast actor={actor} />)
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
                                                                        <Crew crew={crew} index={index} />
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>

                                )

                                : "Carregando..."
                            }
                        </div>
                    ) : <div className={styles.loading}><Spinner /></div>
                }
            </section >
            <Footer />
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    async function fetchServerStatus() {
        const status = await serverStatus();
        return status
    }
    const status = await fetchServerStatus()
    return {
        props: {
            status
        }
    }
}
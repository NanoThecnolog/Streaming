import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { series } from "@/js/series";
import { Episodes, SeriesProps, TMDBEpisodes } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play, PlayIcon } from "lucide-react";
import Head from "next/head";
import { toast } from "react-toastify";
import { addWatchLater } from "@/services/addWatchLater";
import { UserProps } from "@/@types/user";
import { getCookieClient } from "@/services/cookieClient";
import { api } from "@/services/api";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { isOnTheList } from "@/services/isOnTheList";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { episodeImage } from "@/services/fetchEpisodeImage";
import { serieData } from "@/services/fetchSeries";

export default function Serie(status: { status: string }) {
    //refatorar
    const router = useRouter()
    const { title } = router.query;
    const [serie, setSerie] = useState<SeriesProps>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
    const [episodesData, setEpisodesData] = useState<(TMDBEpisodes[] | null)[]>([])
    const [user, setUser] = useState<UserProps>()
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [headTitle, setHeadTitle] = useState<string>(' ')
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [TMDBPoster, setTMDBPoster] = useState<string | null>(null)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            return
        }
        setUser(user)
    }, [])

    useEffect(() => {
        if (title) {
            const serie = series.find((serie) => serie.title === title)
            setSerie(serie)
        }
    }, [title])
    useEffect(() => {
        if (!serie) return;
        if (seasonToShow > 0) {
            const episodes = serie.season[seasonToShow - 1]?.episodes
            setEpisodesToShow(episodes)
        }
        fetchEpisodes()

        const onList: Promise<boolean> = isOnTheList(serie.title, serie.subtitle)
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
        setTMDBBackDrop(null)
        setTMDBPoster(null)
        if (serie?.tmdbID === 0) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        fetchSerieData()
    }, [serie])
    async function fetchSerieData() {
        if (!serie) return
        const serieInfo = await serieData(serie.tmdbID)
        if (!serieInfo || !serieInfo.backdrop_path || !serieInfo.poster_path) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        const backdropURL = `https://image.tmdb.org/t/p/original${serieInfo.backdrop_path}`
        const posterURL = `https://image.tmdb.org/t/p/original${serieInfo.poster_path}`
        setTMDBBackDrop(backdropURL)
        setTMDBPoster(posterURL)
    }

    async function fetchEpisodes() {
        if (!serie) return
        const episodesArray = await Promise.all(
            serie.season.map(async temp => {
                const episodes = await episodeImage(serie.tmdbID, temp.s)
                return episodes
            })
        )
        setEpisodesData(episodesArray)
    }

    function handleChangeSeason(value: string) {
        const season = parseInt(value)
        if (season > 0) {
            setSeasonToShow(season)
        } else return;
    }

    function handlePlayEpisode(ep: Episodes, season: number) {
        const epNumber = ep.ep
        const episode = new URLSearchParams({
            title: `${serie?.title}`,
            subtitle: `${serie?.subtitle}`,
            episode: `${epNumber}`,
            src: `${ep.src}`,
            season: `${season}`
        })
        Router.push(`/watch/serie?${episode}`)
    }

    async function handleAddUserList(title: string, subtitle?: string) {
        //toast.warning("A função Assistir mais tarde está temporariamente desativada")
        if (!user) {
            Router.push('/login')
            return
        }
        try {
            await addWatchLater(user.id, title, subtitle);
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
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        }
    }

    return (
        <>
            <Head>
                <title>{headTitle} | FlixNext</title>
                <meta name="description" content={serie?.description || "Descrição indisponível"} />
            </Head>
            <section className={styles.container}>
                <Header userAvatar={user?.avatar} status={status} />
                {serie ?
                    (
                        <div className={styles.serieContainer} style={{ backgroundImage: `url(${TMDBBackDrop ? TMDBBackDrop : serie?.background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                            <div className={styles.imageBackground}>
                                <div className={styles.desc_top}>
                                    <div className={styles.title}>
                                        <h1>{serie.title} {serie.subtitle !== '' && `- ${serie.subtitle}`}</h1>
                                    </div>
                                    <div className={styles.seasons}>
                                        <h4>{serie.season.length === 1 ? `${serie.season.length} temporada` : serie.season.length >= 2 && `${serie.season.length} temporadas`} - {serie.genero.join(', ')}</h4>
                                    </div>
                                    <div className={styles.watchButton} onClick={() => handlePlayEpisode(serie.season[0].episodes[0], serie.season[0].s)}>
                                        <button className={styles.buttonPlay}><Play /><h4>Começar a Assistir</h4></button>
                                    </div>
                                    <div className={styles.watchLater}>
                                        <button type="button" onClick={() => handleAddUserList(serie.title, serie.subtitle)}>
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
                                                <option key={index} value={s.s}>Temporada {s.s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.cardContainer}>
                                        {
                                            episodesToShow.map((ep) => {
                                                const season = episodesData[seasonToShow - 1];
                                                const episode = season?.find(e => e.episode_number === ep.ep)
                                                const image = `https://image.tmdb.org/t/p/original${episode?.still_path}`
                                                return (
                                                    <div key={ep.src} className={styles.episodeContainer} onClick={() => handlePlayEpisode(ep, seasonToShow)}>
                                                        <div
                                                            className={styles.episodeImage}
                                                            style={{ backgroundImage: `url(${image})` }}
                                                        ><PlayIcon size={35} /></div>
                                                        <div className={styles.epiInfo}>
                                                            <h3>Ep.{ep.ep}: {episode?.name}</h3>
                                                            <p>Duração: {ep.duration}</p>
                                                            <p className={styles.description} title={episode?.overview}>{episode?.overview}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : "Carregando..."
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
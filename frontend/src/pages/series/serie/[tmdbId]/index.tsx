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
import { UserProps } from "@/@types/user";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { fetchEpisodeData, fetchTMDBSeries } from "@/services/fetchTMDBData";
import { getUserCookieData } from "@/services/cookieClient";
import { addWatchLater, isOnTheList } from "@/services/handleWatchLater";
import Stars from "@/components/ui/StarAverage";
import Image from "next/image";
import Adult from "@/components/ui/Adult";
import SEO from "@/components/SEO";
import EpisodeCard from "@/components/seriesComponents/EpisodeCard";
import ChangeLanguage from "@/components/ui/SwitchLang";

type GenreProps = {
    id: number,
    name: string
}

export default function Serie(status: string) {
    //refatorar
    const router = useRouter()
    const { tmdbId } = router.query;
    const [serie, setSerie] = useState<SeriesProps>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
    const [episodesData, setEpisodesData] = useState<(TMDBEpisodes[] | null)[]>([])
    const [user, setUser] = useState<UserProps>()
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)
    const [headTitle, setHeadTitle] = useState<string>(' ')
    const [TMDBBackDrop, setTMDBBackDrop] = useState<string | null>(null)
    const [TMDBPoster, setTMDBPoster] = useState<string | null>(null)
    const [vote_average, setVote_Average] = useState<number>(0)
    const [genres, setGenres] = useState<GenreProps[]>()


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
            const serie = series.find((serie) => serie.tmdbID === Number(tmdbId))
            setSerie(serie)
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
        const serieInfo = await fetchTMDBSeries(serie.tmdbID)
        if (!serieInfo) {
            setTMDBBackDrop(null)
            setTMDBPoster(null)
            return
        }
        const backdropURL = `https://image.tmdb.org/t/p/original${serieInfo.backdrop_path}`
        const posterURL = `https://image.tmdb.org/t/p/original${serieInfo.poster_path}`
        setTMDBBackDrop(backdropURL)
        setTMDBPoster(posterURL)
        setVote_Average(serieInfo.vote_average)
        setGenres(serieInfo.genres)
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
            return toast.error("Erro inesperado ao adicionar filme à lista!")
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
                                <Image className={styles.img} src={TMDBBackDrop ? TMDBBackDrop : serie?.background} fill quality={100} alt={serie.title} />
                            </div>
                            <div className={styles.imageBackground}>
                                <div className={styles.desc_top}>
                                    <div className={styles.title}>
                                        <h1>{serie.title} {serie.subtitle !== '' && `- ${serie.subtitle}`}</h1>
                                    </div>
                                    <div className={styles.tmdbInfo}>
                                        <Stars average={vote_average} />
                                        <Adult faixa={serie.faixa} />
                                    </div>
                                    <div className={styles.seasons}>
                                        <h4>{serie.season.length === 1 ? `${serie.season.length} temporada` : serie.season.length >= 2 && `${serie.season.length} temporadas`} - {genres ? genres.map(genre =>
                                            genre.name === "Action & Adventure"
                                                ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                                    ? "Ficção Científica e Fantasia" : genre.name
                                        ).join(', ') : serie.genero.join(', ')}</h4>
                                    </div>
                                    <div className={styles.watchButton} onClick={() => handlePlayEpisode(serie.season[0].episodes[0], serie.season[0].s)}>
                                        <button className={styles.buttonPlay}><Play /><h4>Começar a Assistir</h4></button>
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
                                    episodesToShow.map((ep) => {
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
                                            <div key={ep.src} className={styles.episodeContainer}>
                                                <EpisodeCard episodeData={episodeInfo} handlePlay={handlePlayEpisode} />
                                            </div>
                                        )
                                    })
                                }
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
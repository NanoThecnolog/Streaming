import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { series } from "@/js/series";
import { Episodes, SeriesProps } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play } from "lucide-react";
import Head from "next/head";
import { toast } from "react-toastify";
import { addWatchLater } from "@/services/addWatchLater";
import { UserProps } from "@/@types/user";
import { getCookieClient } from "@/services/cookieClient";
import { api } from "@/services/api";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { isOnTheList } from "@/services/isOnTheList";

export default function Serie() {
    const router = useRouter()
    const { title } = router.query;
    const [serie, setSerie] = useState<SeriesProps>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
    const [user, setUser] = useState<UserProps>()
    const [onWatchLater, setOnWatchLater] = useState<boolean>(false)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            Router.push('/login')
            return
        }
        setUser(user)
        //console.log(user)
        //isOnTheList();
    }, [])

    /*
    async function isOnTheList() {
        if (!user) {
            //console.log("User ainda não reconhecido", user)
            return
        }
        //console.log("user reconhecido", user)
        const watchLaterList = await api.get(`/watchLater?id=${user.id}`)
        const onTheList = watchLaterList.data.some((titulo: { id: string, title: string, subtitle?: string }) => {
            return titulo.title.trim().toLowerCase() === serie?.title.trim().toLowerCase()
        })
        //console.log(onTheList)

        if (!onTheList) {
            return setOnWatchLater(false)
        }
        setOnWatchLater(true)
    }
    */


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

        const onList: Promise<boolean> = isOnTheList(serie.title, serie.subtitle)
        onList.then(result => {
            if (!result) {
                setOnWatchLater(false)
            } else {
                setOnWatchLater(true)
            }
        })


    }, [serie, seasonToShow])



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
        try {
            if (!user) {
                Router.push('/login')
                return
            }
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
                <title>{serie?.title} {serie?.subtitle && serie.subtitle != '' && `- ${serie.subtitle}`} | FlixNext</title>
                <meta name="description" content={serie?.description} />
            </Head>
            <section className={styles.container}>
                <Header />
                {serie ?
                    (
                        <div className={styles.serieContainer} style={{ backgroundImage: `url(${serie?.background})`, backgroundRepeat: 'no-repeat' }}>
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
                                        {episodesToShow.map((ep, index) => (
                                            <div key={index} className={styles.episodeButton}>
                                                <button type="button" onClick={() => handlePlayEpisode(ep, seasonToShow)}>
                                                    <h3>Episódio {ep.ep}</h3>
                                                    <p>{ep.duration}</p>
                                                </button>
                                            </div>
                                        ))}
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
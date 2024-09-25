import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { series } from "@/js/series";
import { Episodes, SeriesProps } from "@/@types/series";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { Play } from "lucide-react";
import Head from "next/head";

export default function Serie() {
    const router = useRouter()
    const { title } = router.query;
    const [serie, setSerie] = useState<SeriesProps>()
    const [seasonToShow, setSeasonToShow] = useState<number>(1)
    const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])



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

    return (
        <>
            <Head>
                <title>{serie?.title} {serie?.subtitle != '' && `- ${serie?.subtitle}`} | FlixNext</title>
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
                                        <button>
                                            <p>+</p>
                                            <p>Minha Lista</p>
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
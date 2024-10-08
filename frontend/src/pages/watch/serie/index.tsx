import Head from "next/head"
import Router, { useRouter } from "next/router"
//import styles from './styles.module.scss'
import styles from '@/styles/Watch.module.scss'
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function WatchSerie() {
    const router = useRouter()
    const { title, subtitle, episode, src, season } = router.query
    const [episodio, setEpisodio] = useState({ title: "", subtitle: "", episode: 0, src: "", season: 0 })

    useEffect(() => {
        if (title && src && episode && season) {

            setEpisodio({
                title: Array.isArray(title) ? title[0] : title,
                subtitle: Array.isArray(subtitle) ? subtitle[0] : subtitle || '',
                episode: Array.isArray(episode) ? parseInt(episode[0]) : parseInt(episode),
                src: src as string,
                season: Array.isArray(season) ? parseInt(season[0]) : parseInt(season),

            })
        }

    }, [router, title, subtitle, src, episode])
    console.log(episodio)
    function handleBack() {
        Router.back()
    }
    return (
        <>
            <Head>
                <title>Episódio {episode} - {title} {subtitle != '' && `- ${subtitle}`} | FlixNext</title>
            </Head>
            {src ? (
                <div className={styles.container}>
                    <div className={styles.movie}>
                        <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                            <ChevronLeft size={30} />
                        </button>
                        <h3>{episodio.title} {episodio.subtitle != "" && `- ${episodio.subtitle}`} - Temporada {episodio.season} Episódio {episodio.episode}</h3>
                        <iframe
                            title={episodio.title}
                            allowFullScreen
                            width="100%"
                            height="100%"
                            src={episodio.src}
                        />
                    </div>
                </div>
            )
                : "Carregando..."}

        </>
    )
}
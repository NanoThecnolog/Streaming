import Router, { useRouter } from "next/router"
import styles from '@/styles/Watch.module.scss'
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import NextEpisode from "@/components/ui/NextEpisode"
import PrevEpisode from "@/components/ui/PreviousEpisode"
import SEO from "@/components/SEO"
import { series } from "@/data/series"
import HelpFlag from "@/components/Helpflag"
import HelpModal from "@/components/modals/HelpModal/index "
import { SeriesProps } from "@/@types/series"
import { useFlix } from "@/contexts/FlixContext"
import { parseCookies } from "nookies"
import NoFile from "@/components/ui/NoFile"
import { apiGoogle } from "@/services/apiGoogle"
import { CheckFileProps } from "@/@types/googleRequest"
import Spinner from "@/components/ui/Loading/spinner"
import { debuglog } from "@/utils/UtilitiesFunctions"

interface EpisodeProps {
    title: string,
    subtitle: string,
    episode: number,
    src: string,
    season: number
}


export default function WatchSerie() {
    const router = useRouter()
    const { title, subtitle, episode, src, season } = router.query
    const [episodio, setEpisodio] = useState<EpisodeProps | null>(null)
    const [serie, setSerie] = useState<SeriesProps>()
    const { user, setUser } = useFlix()
    const [visible, setVisible] = useState(false)
    const [shared, setShared] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            const { 'flix-user': userCookie } = parseCookies()
            if (!userCookie) {
                router.push('/login')
                return
            }
            setUser(JSON.parse(userCookie))
        }
    }, [])

    useEffect(() => {
        async function acordarServidor() {
            try {
                const wakeup = await api.get('/acordar');
                return wakeup
            } catch (err) {
                return err
            }
        }
        acordarServidor();
        const manterAcordado = setInterval(() => {
            acordarServidor()
        }, 40000);
        return () => clearInterval(manterAcordado)
    }, [])

    useEffect(() => {
        if (title && src && episode && season) {
            const serie = series.find(serie => serie.title.toLowerCase() === String(title).toLowerCase())
            if (serie) {
                setSerie(serie)
            }
            setEpisodio({
                title: Array.isArray(title) ? title[0] : title,
                subtitle: Array.isArray(subtitle) ? subtitle[0] : subtitle || '',
                episode: Array.isArray(episode) ? parseInt(episode[0]) : parseInt(episode),
                src: src ? src as string : '',
                season: Array.isArray(season) ? parseInt(season[0]) : parseInt(season),
            })
            shareVerify(src as string)
        }
    }, [router, title, subtitle, src, episode, season])

    function handleBack() {
        const serie = series.find(serie => serie.title === title && serie.subtitle === subtitle)
        Router.push(`/series/serie/${serie?.tmdbID}`)
    }

    function handleHelpModal() {
        setVisible(!visible)
    }

    async function shareVerify(link: string) {
        if (loading) return
        debuglog("loading no inicio", loading)
        setLoading(true)
        try {
            const encodedLink = encodeURIComponent(link)
            debuglog("loading no momento de setar shared", loading)
            const info = await apiGoogle.get(`/${encodedLink}`)

            const fileCheck: CheckFileProps = info.data.response

            setShared(fileCheck.shared)

        } catch (err) {
            console.error("Erro ao verificar arquivo", err)
            setShared(false)
        } finally {
            console.log("loading no final", loading)
            setLoading(false)
        }
    }

    return (
        <>
            <SEO title={`Episódio ${episode} - ${title} ${subtitle != '' && `- ${subtitle}`} | FlixNext`} description=" " />
            <div className={styles.container}>

                <div className={styles.movie}>
                    <div className={styles.movieName}>
                        <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                            <ChevronLeft size={30} />
                        </button>
                        {
                            episodio ? <h3>{episodio.title} {episodio.subtitle != "" && `- ${episodio.subtitle}`} - Temporada {episodio.season} Episódio {episodio.episode}</h3>
                                : ''
                        }

                    </div>
                    <div className={styles.flagContainer}>
                        <HelpFlag modalVisible={handleHelpModal} />
                    </div>
                    {
                        loading ?
                            <div className={styles.iframe}>
                                <Spinner />
                            </div> : shared ?
                                episodio &&
                                <>
                                    <div className={styles.iframe}>
                                        <iframe
                                            title={episodio.title}
                                            allowFullScreen
                                            width="100%"
                                            height="100%"
                                            src={episodio.src}
                                        />
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <PrevEpisode
                                            title={episodio.title}
                                            subtitle={episodio.subtitle}
                                            season={episodio.season}
                                            episode={episodio.episode}
                                        />
                                        <NextEpisode
                                            title={episodio.title}
                                            subtitle={episodio.subtitle}
                                            season={episodio.season}
                                            episode={episodio.episode}
                                        />
                                    </div>

                                </> :
                                <div className={styles.iframe}>
                                    <NoFile type="serie" />
                                </div>
                    }
                    {visible && (
                        <HelpModal
                            handleHelpModal={handleHelpModal}
                            userId={user?.id}
                            tmdbId={Number(serie ? serie.tmdbID : 0)}
                            serie={serie}
                            season={Number(season)}
                            episode={Number(episode)}
                        />
                    )}
                </div>


            </div>
        </>
    )
}
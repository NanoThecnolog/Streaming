import Router, { useRouter } from "next/router"
import styles from '@/styles/Watch.module.scss'
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import NextEpisode from "@/components/ui/NextEpisode"
import PrevEpisode from "@/components/ui/PreviousEpisode"
import SEO from "@/components/SEO"
import HelpFlag from "@/components/Helpflag"
import HelpModal from "@/components/modals/HelpModal/index "
import { SeriesProps } from "@/@types/series"
import { useFlix } from "@/contexts/FlixContext"
import { parseCookies } from "nookies"
import NoFile from "@/components/ui/NoFile"
import { apiGoogle } from "@/services/apiGoogle"
import { CheckFileProps } from "@/@types/googleRequest"
import Spinner from "@/components/ui/Loading/spinner"
import { debug } from "@/classes/DebugLogger"
import { mongoService } from "@/classes/MongoContent"
import { apiEmail } from "@/services/apiMessenger"
import Head from "next/head"
import { GetServerSideProps } from "next"
import axios from "axios"
import { UserContext } from "@/@types/user"

interface EpisodeProps {
    title: string,
    subtitle: string,
    episode: number,
    src: string,
    season: number
}

interface WatchSerieProps {
    userContext: UserContext
}


export default function WatchSerie({ userContext }: WatchSerieProps) {
    const router = useRouter()
    const { title, subtitle, episode, src, season, tmdbID } = router.query
    const [episodio, setEpisodio] = useState<EpisodeProps | null>(null)
    const [serie, setSerie] = useState<SeriesProps | null>(null)
    const { user, setUser } = useFlix()
    const [visible, setVisible] = useState(false)
    const [shared, setShared] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            if (!userContext) return
            setUser(userContext)
        }

    }, [userContext])

    useEffect(() => {
        if (user && !user.donator) router.push('/me/escolher-plano')
        //debug.log(user.donator)
        //debug.log(user)
    }, [user])

    useEffect(() => {
        async function getSerieMongoData() {
            const serieDb = await mongoService.findOneSerieById(parseInt(tmdbID as string))
            debug.log('serieDb: ', serieDb)
            if (!serieDb) return debug.log('serieDb vazia ou null')

            setSerie(serieDb)
            setEpisodio({
                title: serieDb.title,
                subtitle: serieDb.subtitle ?? '',
                episode: parseInt(episode as string),
                src: src ? src as string : '',
                season: parseInt(season as string),
            })
        }
        if (tmdbID && src && episode && season) {
            getSerieMongoData()
        }
    }, [router, src, episode, season, tmdbID])

    function handleBack() {
        Router.push(`/series/serie/${serie?.tmdbID}`)
    }

    function handleHelpModal() {
        setVisible(!visible)
    }

    /*useEffect(() => {
        if (episodio?.src) {
            shareVerify(episodio.src)
        } else {
            debug.log("Src do episodio ausente")
        }
    }, [episodio])*/

    async function shareVerify(link: string) {
        if (loading) return
        debug.log("loading no inicio", loading)
        setLoading(true)
        try {
            const encodedLink = encodeURIComponent(link)
            const info = await apiGoogle.get(`/${encodedLink}`)
            if (info.data.code && info.data.code === 404) {
                const notificar = await apiEmail.post('/notification/problem', {
                    title: episodio?.title,
                    description: 'Problema com arquivo',
                    tmdbId: serie?.tmdbID,
                    season: episodio?.season,
                    episode: episodio?.episode,
                    email: user?.email
                })
                debug.log("depois do envio de email", notificar.data)
                if (notificar.data.code === 201) debug.log("email enviado!")
                return setShared(false)
            }
            if (info.data.code && info.data.code === 200) {
                const fileCheck: CheckFileProps = info.data.response
                return setShared(fileCheck.shared)
            }
        } catch (err) {
            console.error("Erro ao verificar arquivo", err)
            setShared(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <meta name='robots' content='noindex, nofollow' />
            </Head>
            <SEO title={`Episódio ${episode} - ${title} ${subtitle && `- ${subtitle}`} | FlixNext`} description=" " />
            <div className={styles.container}>

                <div className={styles.movie}>
                    <div className={styles.movieName}>
                        <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                            <ChevronLeft size={30} />
                        </button>
                        {
                            episodio ? <h3>{episodio.title} {episodio.subtitle && `- ${episodio.subtitle}`} - Temporada {episodio.season} Episódio {episodio.episode}</h3>
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
                                            serie={serie}
                                        />
                                        <NextEpisode
                                            title={episodio.title}
                                            subtitle={episodio.subtitle}
                                            season={episodio.season}
                                            episode={episodio.episode}
                                            serie={serie}
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
                            email={user?.email}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req } = ctx

    const token = req.cookies['flix-token']


    if (!token) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
    const url = process.env.NEXT_PUBLIC_WEBSITE_LINK

    try {
        const userData = await axios.get<UserContext>(`${url}/api/user`)
        if (!userData.data.donator) {
            return {
                redirect: {
                    destination: '/me/escolher-plano',
                    permanent: false
                }
            }
        }
        return {
            props: {
                userContext: userData.data
            }
        }
    } catch (err) {
        debug.log("Erro ao buscar dados do usuario na pagina /watch")
        return {
            props: {
                userContext: null
            }
        }
    }
}
import styles from '@/styles/Watch.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from 'lucide-react';
import HelpFlag from "@/components/Helpflag";
import HelpModal from "@/components/modals/HelpModal/index ";
import SEO from "@/components/SEO";
import { useFlix } from '@/contexts/FlixContext';
import { apiGoogle } from '@/services/apiGoogle';
import NoFile from '@/components/ui/NoFile';
import { CheckFileProps } from '@/@types/googleRequest';
import Spinner from '@/components/ui/Loading/spinner';
import { debug } from '@/classes/DebugLogger';
import { mongoService } from '@/classes/MongoContent';
import { apiEmail } from '@/services/apiMessenger';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { UserContext } from '@/@types/user';
import { MoviePlayer } from '@/components/ui/Player';

interface WatchProps {
    userContext: UserContext | null
}
export default function Watch({ userContext }: WatchProps) {
    const router = useRouter()
    const { tmdbId } = router.query;
    const [movieData, setMovieData] = useState({ title: '', subtitle: '', src: '', tmdbId: 0 });
    const { user, setUser, movies } = useFlix()
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
    }, [user])


    useEffect(() => {
        async function getMovieMongoData() {
            const movie = await mongoService.findOneMovieById(parseInt(tmdbId as string))
            if (!movie) return
            setMovieData({
                title: movie.title,
                subtitle: movie.subtitle ?? '',
                src: movie.src,
                tmdbId: movie.tmdbId
            })
        }
        if (tmdbId) getMovieMongoData()
    }, [router, tmdbId])

    const handleBack = useCallback(() => {
        router.back()
    }, [router])


    const handleHelpModal = useCallback(() => {
        setVisible(prev => !prev)
    }, [])

    useEffect(() => {
        debug.log("movie data ao verificar: ", movieData)
        if (movieData.src) {
            shareVerify(movieData.src)
        } else {
            setShared(false)
            debug.log("não fazer nada!")
        }
    }, [movieData])


    async function shareVerify(link: string) {
        if (loading) return
        setLoading(true)

        try {

            const { data } = await apiGoogle.get(`/${encodeURIComponent(link)}`)
            debug.log("arquivo verificado: ", data)
            const fileCheck: CheckFileProps = data

            setShared(!!fileCheck.shared)

        } catch (err: any) {
            const status = err?.response?.status

            debug.error('Erro ao verificar arquivo', status)

            if (status === 400 || status === 404 || status === 403) {
                try {
                    await apiEmail.post('/notification/problem', {
                        title: movieData.title,
                        description: 'Problema com arquivo',
                        tmdbId: movieData.tmdbId,
                        email: user?.email
                    })
                } catch (mailError) {
                    debug.warn('Falha ao enviar notificação de erro', mailError)
                }
            }
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
            <SEO title={`${movieData.title}${movieData.subtitle ? ` - ${movieData.subtitle}` : ''} - FlixNext`} description=" " />
            <div className={styles.container}>
                <div className={styles.movie}>
                    <div className={styles.movieName}>
                        <button
                            onClick={handleBack}
                            title="Voltar ao início"
                            aria-label='Voltar'
                            className={styles.buttonPreview}
                        >
                            <ChevronLeft size={30} />
                        </button>
                        <h3>{movieData.title}
                            {movieData.subtitle && `- ${movieData.subtitle}`}
                        </h3>
                    </div>

                    <div className={styles.flagContainer}>
                        <HelpFlag modalVisible={handleHelpModal} />
                    </div>

                    <div className={styles.iframe} id="iframe">
                        <MoviePlayer
                            loading={loading}
                            shared={shared}
                            src={movieData.src}
                            title={movieData.title}
                        />
                    </div>
                    {visible && (
                        <HelpModal
                            handleHelpModal={handleHelpModal}
                            email={user?.email}
                            tmdbId={Number(tmdbId)}
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
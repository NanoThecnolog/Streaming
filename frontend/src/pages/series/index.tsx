import Header from "@/components/Header";
import TopSerie from "@/components/seriesComponents/Top serie";
import styles from './styles.module.scss'
import CardSerieContainer from "@/components/seriesComponents/CardSerieContainer";
import { useEffect, useState } from "react";
import Search from "@/components/Searching";
import Footer from "@/components/Footer";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { UserProps } from "@/@types/user";
import { getUserCookieData } from "@/services/cookieClient";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import { apiTMDB } from "@/services/apiTMDB";
import { TMDBSeries } from "@/@types/series";
import Loading from "@/components/ui/Loading";

export default function Series(status: string) {
    //refatorar
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [user, setUser] = useState<UserProps>()
    const [width, setWidth] = useState<number>()

    const divisaoPorGenero = [
        "Netflix",
        "Hbo",
        "Disney+",
        "Prime video",
        "Apple tv",
        "DC",
        "Marvel",
        "Ação",
        "Suspense",
        "Comédia",
        "Ficção científica",
        "Drama",
        "Fantasia",
        "Animação",
    ]
    const [loading, setLoading] = useState(false)
    const { serieData, setSerieData } = useTMDB()

    useEffect(() => {
        /**
         * Realiza a busca dos dados no TMDB e salva no context.
         * @returns não retorna dado nenhum
         */
        const fetchData = async () => {
            if (loading || serieData.length > 0) return
            setLoading(true)
            try {
                const response = await apiTMDB.get('/all', {
                    params: {
                        type: 'tv'
                    }
                })
                const cardData = response.data.data as TMDBSeries[]
                setSerieData(cardData)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [serieData.length, setSerieData])

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
        function handleResize() {
            const width = window.innerWidth;
            setWidth(width)

            if (width < 780) {
                setCardPerContainer(1)
            } else if (width < 1100) {
                setCardPerContainer(2)
            } else if (width < 1480) {
                setCardPerContainer(3)
            } else if (width < 1650) {
                setCardPerContainer(4)
            } else {
                setCardPerContainer(5)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        const rightClickBlock = (event: MouseEvent) => {
            event.preventDefault();
        };
        // Impede atalhos de ferramentas de desenvolvedor
        const openConsoleBlock = (event: KeyboardEvent) => {
            if (
                event.key === 'F12' ||
                (event.ctrlKey && event.shiftKey && event.key === 'I') ||
                (event.ctrlKey && event.shiftKey && event.key === 'C') ||
                (event.ctrlKey && event.shiftKey && event.key === 'J') ||
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
        }
    }, [])

    return (
        <>
            <SEO title="Series | FlixNext" description="Várias séries para maratonar!" />
            {
                serieData.length > 0 ?
                    <>
                        <Header userAvatar={user?.avatar} status={status} />
                        <main className={styles.main}>
                            <div className={styles.content}>
                                <TopSerie width={width} />
                                <div className={styles.mid}>
                                    {divisaoPorGenero.map((sec, index) => (
                                        <div key={sec}>
                                            <CardSerieContainer
                                                section={sec}
                                                cardPerContainer={cardPerContainer}
                                            />
                                            {index === 1 && cardPerContainer >= 2 && <Search />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </> : <div className={styles.loading}><Loading /></div>
            }
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
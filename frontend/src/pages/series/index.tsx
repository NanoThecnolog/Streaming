import Header from "@/components/Header";
import TopSerie from "@/components/seriesComponents/Top serie";
import styles from './styles.module.scss'
import CardSerieContainer from "@/components/seriesComponents/CardSerieContainer";
import { useEffect, useState } from "react";
import Search from "@/components/Searching";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import { apiTMDB } from "@/services/apiTMDB";
import { TMDBSeries } from "@/@types/series";
import Loading from "@/components/ui/Loading";
import { gen, stm } from "@/utils/Genres";
import Head from "next/head";

export default function Series() {
    //refatorar
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [width, setWidth] = useState<number>()
    const genres = Object.values(gen)
    const streamings = Object.values(stm)
    const combined = [...streamings, ...genres]
    const removedSections = ["Romance", "Terror", "Globo Play", "Paramount", "StarZ", "SKY"]
    const divisaoPorGenero = combined.filter(item => !removedSections.includes(item))

    /*const divisaoPorGenero = [
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
    ]*/
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
            <Head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7266476713162775"
                    crossOrigin="anonymous"
                />
            </Head>
            <SEO title="Series | FlixNext" description="Várias séries para maratonar!" />
            {
                serieData.length > 0 ?
                    <>
                        <Header />
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
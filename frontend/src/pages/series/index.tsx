import Header from "@/components/Header";
import TopSerie from "@/components/seriesComponents/Top serie";
import styles from './styles.module.scss'
import { useCallback, useEffect, useState } from "react";
import Search from "@/components/Searching";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import Loading from "@/components/ui/Loading";
import { gen, stm } from "@/utils/Genres";
import debounce from "lodash.debounce";
import BackTopButton from "@/components/ui/BackToTop";
import Carousel from "@/components/Carousel";
import { breakpoints } from "@/utils/Variaveis";
import { flixFetcher } from "@/classes/Flixclass";
import { SeriesProps } from "@/@types/series";
import { mongoService } from "@/classes/MongoContent";
import { useFlix } from "@/contexts/FlixContext";

export default function Series() {
    //refatorar
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [width, setWidth] = useState<number>()
    const genres = Object.values(gen)
    const streamings = Object.values(stm)
    const combined = [...streamings, ...genres]
    const removedSections = ["Romance", "Terror", "Globo Play", "Paramount", "StarZ", "SKY"]
    const divisaoPorGenero = combined.filter(item => !removedSections.includes(item))
    //const [loading, setLoading] = useState(false)
    const { serieData, setSerieData } = useTMDB()
    const [visible, setvisible] = useState(false)
    const { series, setSeries } = useFlix()

    useEffect(() => {
        async function fetchSeriesMongoDB() {
            const response: SeriesProps[] = await mongoService.fetchSerieData()
            if (response.length > 0) setSeries(response)
        }
        if (series.length === 0) fetchSeriesMongoDB()
    }, [series])

    useEffect(() => {
        if (serieData.length > 0) return
        flixFetcher.fetchSerieData(setSerieData)
    }, [setSerieData])

    useEffect(() => {

        function handleResize() {
            const windowWidth = window.innerWidth;
            setWidth(windowWidth)
            const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 5 }
            setCardPerContainer(cards)
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

    const handleScroll = useCallback(
        debounce(() => {
            if (window.scrollY > 1500) {
                setvisible(true)
            } else {
                setvisible(false)
            }
        }, 200),
        []
    );
    useEffect(() => {

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <SEO title="Series | FlixNext" description="Várias séries para maratonar!" />
            {
                serieData.length > 0 ?
                    <>
                        <Header />
                        <main className={styles.main} id="series">
                            <div className={styles.content}>
                                {
                                    series && series.length > 0 &&
                                    <>
                                        <TopSerie width={width} />
                                        <div className={styles.mid}>
                                            {divisaoPorGenero.map((sec, index) => (
                                                <div key={sec}>
                                                    {
                                                        index === 5 && cardPerContainer >= 2 && <Search />
                                                    }
                                                    <Carousel type="tv" section={sec} cardPerContainer={cardPerContainer} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                            <BackTopButton visible={visible} link="/series/#series" />
                        </main>
                        <Footer />
                    </> : <div className={styles.loading}><Loading /></div>
            }
        </>
    )
}
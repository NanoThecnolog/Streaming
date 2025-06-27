import Header from "@/components/Header";
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
import NewTopSerie from "@/components/seriesComponents/newTopSerie";

export default function Series() {
    //refatorar
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [width, setWidth] = useState<number>(0)
    const genres = Object.values(gen)
    const streamings = Object.values(stm)
    const combined = [...streamings, ...genres]
    const removedSections = ["Romance", "Terror", "Globo Play", "Paramount", "StarZ", "SKY"]
    const divisaoPorGenero = combined.filter(item => !removedSections.includes(item))
    //const [loading, setLoading] = useState(false)
    const { serieData, setSerieData } = useTMDB()
    const [visible, setvisible] = useState(false)
    const { series, setSeries } = useFlix()
    const tmdbid = 114471;
    const [topCard, setTopCard] = useState<SeriesProps | null>(null)

    useEffect(() => {
        async function fetchSeriesMongoDB() {
            const response: SeriesProps[] = await mongoService.fetchSerieData()
            if (response.length > 0) setSeries(response)
        }
        if (series.length === 0) fetchSeriesMongoDB()
        if (series.length > 0) {
            const card = series.find((card) => card.tmdbID === tmdbid)
            if (!card) return
            setTopCard(card)
        }
    }, [series])

    useEffect(() => {
        if (serieData.length > 0) return
        flixFetcher.fetchSerieData(setSerieData)
    }, [serieData])

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
            <SEO
                title="Series | FlixNext"
                description="Várias séries para maratonar!"
                image="https://flixnext.com.br/blurImage.png"
                url="https://flixnext.com.br"
            />
            {
                serieData.length > 0 ?
                    <>
                        <Header />
                        <main className={styles.main} id="series">
                            <div className={styles.content}>
                                {
                                    series && series.length > 0 &&
                                    <>
                                        {//<TopSerie width={width} />
                                        }
                                        {
                                            topCard && <NewTopSerie width={width} card={topCard} />
                                        }
                                        <div className={styles.mid}>
                                            {divisaoPorGenero.map((sec, index) => (
                                                <div key={sec}>
                                                    {
                                                        index === 5 && width >= 915 && <Search />
                                                    }
                                                    <Carousel type="tv" section={sec} cardPerContainer={cardPerContainer} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                            <BackTopButton visible={visible} />
                        </main>
                        <Footer />
                    </> : <div className={styles.loading}><Loading /></div>
            }
        </>
    )
}
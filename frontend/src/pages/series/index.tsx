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
import TopPopularTVShows from "@/components/TopPopularTV";
import { CardsProps } from "@/@types/Cards";
import { DailyWarningModal } from "@/components/ui/DailyModal";
import { useDailyModal } from "@/hooks/useDailyModal";

export default function Series() {
    //refatorar
    const { isOpen, close } = useDailyModal()
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [width, setWidth] = useState<number>(0)
    const genres = Object.values(gen)
    const streamings = Object.values(stm)
    const combined = [...streamings, ...genres]
    const removedSections = ["Romance", "Terror", "Globo Play", "Paramount", "StarZ", "SKY"]
    const divisaoPorGenero = combined.filter(item => !removedSections.includes(item))
    //const [loading, setLoading] = useState(false)
    const { serieData, setSerieData, setAllData, allData } = useTMDB()
    const [visible, setvisible] = useState(false)
    const { user, series, setSeries } = useFlix()

    useEffect(() => {
        async function fetchSeriesMongoDB() {
            const response: SeriesProps[] = await mongoService.fetchSerieData()
            if (response.length > 0) setSeries(response)
        }
        if (series.length === 0) fetchSeriesMongoDB()
    }, [series])

    useEffect(() => {
        //if (serieData.length > 0) return
        async function fetchMoviesMongoDB() {
            const movies: CardsProps[] = await mongoService.fetchMovieData()
            if (movies.length > 0) await flixFetcher.fetchMovieData(setAllData, movies)
        }

        if (serieData.length === 0) flixFetcher.fetchSerieData(setSerieData)
        if (allData.length === 0) fetchMoviesMongoDB()
    }, [serieData, allData])

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
                                            <NewTopSerie width={width} id={66732} isActive={true} />
                                        }
                                        <div className={styles.mid}>
                                            <TopPopularTVShows cardPerContainer={cardPerContainer} cards={serieData} seriesDB={series} />
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
                        {!user?.donator && <DailyWarningModal open={isOpen} onClose={close} />}
                        <Footer />
                    </> : <div className={styles.loading}><Loading /></div>
            }
        </>
    )
}
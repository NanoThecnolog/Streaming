import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Searching";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import Loading from "@/components/ui/Loading";
import { agp, gen } from "@/utils/Genres";
import BackTopButton from "@/components/ui/BackToTop";
import debounce from "lodash.debounce";
import Carousel from "@/components/Carousel";
import { breakpoints } from "@/utils/Variaveis";
import { flixFetcher } from "@/classes/Flixclass";
import { useFlix } from "@/contexts/FlixContext";
import { CardsProps } from "@/@types/Cards";
import TopPopularMovies from "@/components/TopPopularMovies";
import HeroSection from "@/components/HeroSection";
import TrendingCarousel from "@/components/TrendingCarousel";
import TopPopularTVShows from "@/components/TopPopularTV";


export default function Home() {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>(0)
  const removedSections = [agp.dc, agp.marvel, agp.hero]
  const generos = Object.values(gen);
  const agrupadores = Object.values(agp);
  const combined = [...generos, ...agrupadores.filter(item => removedSections.includes(item))];
  const divisaoPorGenero = combined
  const { allData, setAllData, serieData, setSerieData } = useTMDB()
  const [visible, setvisible] = useState(false)
  const { movies, setMovies, series } = useFlix()
  const tmdbid = 617126;
  const [topCard, setTopCard] = useState<CardsProps | null>(null)

  useEffect(() => {
    const card = movies.find((card) => card.tmdbId === tmdbid)
    if (card && (!topCard || topCard.tmdbId !== card.tmdbId)) setTopCard(card)
  }, [movies])

  useEffect(() => {
    //if (allData.length > 0 && serieData.length > 0) return
    if (movies.length > 0 && allData.length === 0) flixFetcher.fetchMovieData(setAllData, movies)
    if (serieData.length === 0) flixFetcher.fetchSerieData(setSerieData)
  }, [movies, setAllData, serieData, setSerieData])

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
        title="FlixNext - Início"
        description="Um Streaming nunca antes visto porque é novo."
        image="https://flixnext.com.br/blurImage.png"
        url="https://flixnext.com.br"
      />
      {
        allData.length > 0 ?
          <>
            <Header />
            <main className={styles.main}>
              <div className={styles.content}>
                {movies && movies.length > 0 &&
                  <>
                    <div className={styles.top}>
                      {
                        //topCard && <NewTop width={width} card={topCard} />
                      }
                      <HeroSection width={width} />
                    </div>
                    <div className={styles.mid} id="filmes">

                      <TopPopularMovies cardPerContainer={cardPerContainer} cards={allData} moviesDB={movies} />
                      <TopPopularTVShows cardPerContainer={cardPerContainer} cards={serieData} seriesDB={series} />
                      <TrendingCarousel cardPerContainer={cardPerContainer} />
                      {
                        divisaoPorGenero.map((sec, index) => {
                          return (
                            <div key={`${sec}+${index}`}>
                              {
                                index === 3 && width >= 915 && <Search />
                              }
                              <Carousel type="movie" section={sec} cardPerContainer={cardPerContainer} />
                            </div>
                          )
                        })}
                    </div>
                  </>
                }
              </div>
              <BackTopButton visible={visible} />
            </main>
            <Footer />
          </> :
          <div className={styles.loading}>
            <Loading />
          </div>
      }
    </>
  );
}
/*export const getStaticPaths: GetStaticPaths = async () => {

  return {
        paths,
        fallback: 'blocking',
    };
}*/
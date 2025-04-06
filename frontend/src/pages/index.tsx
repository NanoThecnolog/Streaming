import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import Top from "@/components/Top";
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
import { mongoService } from "@/classes/MongoContent";
import { useFlix } from "@/contexts/FlixContext";
import NewTop from "@/components/newTop";
import { CardsProps } from "@/@types/Cards";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>()
  const removedSections = [agp.dc, agp.marvel, agp.hero]
  const generos = Object.values(gen);
  const agrupadores = Object.values(agp);
  const combined = [...generos, ...agrupadores.filter(item => removedSections.includes(item))];
  const divisaoPorGenero = combined
  const { allData, setAllData } = useTMDB()
  const [loading, setLoading] = useState(false)
  const [visible, setvisible] = useState(false)
  const { movies, setMovies } = useFlix()
  const tmdbid = 635910;
  const [topCard, setTopCard] = useState<CardsProps | null>(null)

  useEffect(() => {
    async function fetchMoviesMongoDB() {
      const response = await mongoService.fetchMovieData()
      if (response.length > 0) setMovies(response)
    }
    if (movies.length === 0) fetchMoviesMongoDB()
  }, [movies])


  useEffect(() => {
    if (allData.length > 0) return
    flixFetcher.fetchMovieData(setAllData)
  }, [setAllData])


  useEffect(() => {
    // Breakpoints ajustados
    /**
     * Define a quantidade de cards por container baseado na largura da página
     */
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

  useEffect(() => {
    if (movies.length > 0) {
      const card = movies.find((card) => card.tmdbId === tmdbid)
      if (!card) return
      setTopCard(card)
    }
  }, [movies])

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
            <main className={`${styles.main} ${inter.className}`}>
              <div className={styles.content}>
                {movies && movies.length > 0 &&
                  <>
                    {
                      <Top width={width} cards={movies} />
                    }
                    {
                      //topCard && <NewTop width={width} card={topCard} />
                    }

                    <div className={styles.mid} id="filmes">
                      {
                        //<ReleaseContainer section="lançamentos" cardPerContainer={cardPerContainer} />
                      }
                      {
                        divisaoPorGenero.map((sec, index) => {
                          return (
                            <div key={index}>
                              {/*<CardContainer
                            section={sec}
                            cardPerContainer={cardPerContainer}
                          />*/}
                              {
                                index === 3 && cardPerContainer >= 2 && <Search />
                              }
                              <Carousel type="movie" section={sec} cardPerContainer={cardPerContainer} />
                            </div>
                          )
                        })}

                    </div>
                  </>

                }

              </div>
              <BackTopButton link="/#inicio" visible={visible} />
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
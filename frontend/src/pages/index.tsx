import { Inter } from "next/font/google";
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
import { mongoService } from "@/classes/MongoContent";
import { useFlix } from "@/contexts/FlixContext";
import NewTop from "@/components/newTop";
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { GetStaticPaths } from "next";


const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>(0)
  const removedSections = [agp.dc, agp.marvel, agp.hero]
  const generos = Object.values(gen);
  const agrupadores = Object.values(agp);
  const combined = [...generos, ...agrupadores.filter(item => removedSections.includes(item))];
  const divisaoPorGenero = combined
  const { allData, setAllData } = useTMDB()
  //const [loading, setLoading] = useState(false)
  const [visible, setvisible] = useState(false)
  const { movies, setMovies } = useFlix()
  const tmdbid = 822119;
  const [topCard, setTopCard] = useState<CardsProps | null>(null)

  useEffect(() => {
    async function fetchMoviesMongoDB() {
      const response: CardsProps[] = await mongoService.fetchMovieData()
      if (response.length > 0) setMovies(response)
    }
    if (movies.length === 0) fetchMoviesMongoDB()
    else if (movies.length > 0) {
      const card = movies.find((card) => card.tmdbId === tmdbid)
      if (!card) return
      setTopCard(card)
    }
  }, [movies])

  useEffect(() => {
    if (allData.length > 0) return
    //setAllData(moviesTMDB)
    if (movies.length > 0) flixFetcher.fetchMovieData(setAllData, movies)
  }, [movies, setAllData])

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
            <main className={`${styles.main} ${inter.className}`}>
              <div className={styles.content}>
                {movies && movies.length > 0 &&
                  <>
                    <div className={styles.top}>
                      {
                        topCard && <NewTop width={width} card={topCard} />
                      }
                    </div>
                    {
                      //<Top width={width} cards={movies} />
                    }
                    <div className={styles.mid} id="filmes">
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
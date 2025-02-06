import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CardContainer from "@/components/CardContainer";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import Top from "@/components/Top";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Searching";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import { apiTMDB } from "@/services/apiTMDB";
import { MovieTMDB } from "@/@types/Cards";
import ReleaseContainer from "@/components/ReleaseContainer";
import Loading from "@/components/ui/Loading";
import { agp, gen } from "@/utils/Genres";
import Script from "next/script";
import BackTopButton from "@/components/ui/BackToTop";
import debounce from "lodash.debounce";


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

  const MAX_RETRIES = 5

  useEffect(() => {
    /**
     * Realiza a busca dos dados no TMDB e salva no context.
     * @returns não retorna dado nenhum
    */
    if (loading || allData.length > 0) return
    setLoading(true)
    const fetchData = async (attempt = 1) => {
      try {
        const response = await apiTMDB.get('/all')

        if (response.status === 504 || !response.data) {
          if (attempt < MAX_RETRIES) {
            console.log(`Erro durante a requisição. Tentando novamente (${attempt}/${MAX_RETRIES})...`)
            setTimeout(() => fetchData(attempt + 1), 4000)
          } else {
            console.log("Max attempts reached")
            setLoading(false)
          }
        }
        const cardData = response.data.data as MovieTMDB[]
        setAllData(cardData)
      } catch (err) {
        console.log(`Erro na tentativa ${attempt}`, err)
        if (attempt < MAX_RETRIES) {
          console.log(`Tentando novamente (${attempt}/${MAX_RETRIES}) em 4s...`)
          setTimeout(() => fetchData(attempt + 1), 4000)
        } else {
          console.log("Max Attempts reached")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [allData.length, setAllData])


  useEffect(() => {
    // Breakpoints ajustados
    const breakpoints = [
      { width: 780, cards: 1 },
      { width: 1100, cards: 2 },
      { width: 1500, cards: 3 },
      { width: 1650, cards: 4 },
      { width: Infinity, cards: 5 },
    ]
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

  return (
    <>
      {
        /*
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7266476713162775"
        strategy="afterInteractive"
      />*/
      }
      <SEO title="FlixNext - Início" description="Um Streaming nunca antes visto porque é novo." />
      {
        allData.length > 0 ?
          <>
            <Header />
            <main className={`${styles.main} ${inter.className}`}>
              <div className={styles.content}>
                <Top width={width} />
                <div className={styles.mid} id="filmes">
                  {//<WatchHistory section="Assistidos" cardPerContainer={cardPerContainer + 2} />
                  }
                  <ReleaseContainer section="lançamentos" cardPerContainer={cardPerContainer} />
                  {
                    divisaoPorGenero.map((sec, index) => (
                      <div key={index}>
                        <CardContainer
                          section={sec}
                          cardPerContainer={cardPerContainer}
                        />
                        {index === 1 && cardPerContainer >= 2 && <Search />}
                      </div>
                    ))}
                </div>
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
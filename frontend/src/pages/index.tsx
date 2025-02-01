import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CardContainer from "@/components/CardContainer";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Top from "@/components/Top";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Searching";
import SEO from "@/components/SEO";
import { useTMDB } from "@/contexts/TMDBContext";
import { apiTMDB } from "@/services/apiTMDB";
import { MovieTMDB } from "@/@types/Cards";
import ReleaseContainer from "@/components/ReleaseContainer";
import Loading from "@/components/ui/Loading";
import { shuffle } from "@/utils/UtilitiesFunctions";
import { gen } from "@/utils/Genres";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>()
  const divisaoPorGenero = Object.values(gen);
  const { allData, setAllData } = useTMDB()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    /**
     * Realiza a busca dos dados no TMDB e salva no context.
     * @returns não retorna dado nenhum
     */
    const fetchData = async () => {
      if (loading || allData.length > 0) return
      setLoading(true)
      try {
        const response = await apiTMDB.get('/all')
        const cardData = response.data.data as MovieTMDB[]
        setAllData(cardData)
      } catch (err) {
        console.log(err)
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

  return (
    <>
      <SEO title="FlixNext - Início" description="Um Streaming nunca antes visto porque é novo." />
      {
        allData.length > 0 ?
          <>
            <Header />
            <main className={`${styles.main} ${inter.className}`}>
              <div className={styles.content}>
                <Top width={width} />
                <div className={styles.mid} id="filmes">
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
/*export const getServerSideProps: GetServerSideProps = async () => {
  async function fetchServerStatus() {
    const status = await serverStatus();
    return status
  }
  const status = await fetchServerStatus()
  return {
    props: {
      status,
    }
  }
}
*/
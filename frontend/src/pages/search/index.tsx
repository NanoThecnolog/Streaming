import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { CardsProps } from "@/@types/Cards";
import { cards } from "@/js/cards";
import { series } from "@/js/series";
import Card from "@/components/Card";
import CardSerie from "@/components/seriesComponents/Card";
import { UserProps } from "@/@types/user";
import Footer from "@/components/Footer";
import { SeriesProps } from "@/@types/series";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { getUserCookieData } from "@/services/cookieClient";



export default function Search(status: string) {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [searchCards, setSearchCards] = useState<CardsProps[]>()
    const [searchSeries, setSearchSeries] = useState<SeriesProps[]>()
    //const [width, setWidth] = useState<number>()
    const [usuario, setUsuario] = useState<UserProps | null>(null)

    useEffect(() => {
        if (router.isReady) {
            const { input } = router.query;
            setMovie(input as string)
        }
        if (movie && movie !== '') {
            searchingMovie(movie);
        }

    }, [router.isReady, router.query, movie])

    /*useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            //console.log(width)
            setWidth(width)

            //ajustar os breakpoints depois
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
    }, [])*/
    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUsuario(user)
        }
        fetchUserData()
    }, [])

    function searchingMovie(movie: string) {
        setSearchCards([])
        setSearchSeries([])
        const filteredCards = cards
            .filter((card) => card.title.toLowerCase().includes(movie.toLowerCase()))
            .map((card) => ({
                ...card,
                type: 'movie' as const
            }))

        const filteredSeries = series
            .filter((serie) => serie.title.toLowerCase().includes(movie.toLowerCase()))
            .map((serie) => ({
                ...serie,
                type: 'series' as const
            }))
        if (filteredCards.length >= 1) {
            setSearchCards(filteredCards);
        }
        if (filteredSeries.length >= 1) {
            setSearchSeries(filteredSeries)
        }
    }

    return (
        <>
            <Header userAvatar={usuario?.avatar} status={status} />
            <section className={styles.container}>
                <div className={styles.title}>
                    <h2>Resultados da busca:</h2>
                </div>
                <div className={styles.cardsContainer}>
                    {!searchCards && !searchSeries && <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: '80vw', height: '50vh' }}>Nenhum filme ou série encontrado.</div>}
                    {searchCards && searchCards?.map((card) => {
                        return <Card
                            key={card.src}
                            card={card}
                        />
                    }

                    )} {searchSeries && searchSeries?.map((serie, index) => {
                        return <CardSerie
                            key={index}
                            card={serie}
                        />
                    })}

                </div>
            </section>
            <Footer />
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
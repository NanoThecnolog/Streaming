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
import SEO from "@/components/SEO";

export default function Search(status: string) {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [searchCards, setSearchCards] = useState<CardsProps[]>()
    const [searchSeries, setSearchSeries] = useState<SeriesProps[]>()
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
            .filter((card) => card.title.toLowerCase().includes(movie.toLowerCase()) || (card.subtitle?.toLowerCase().includes(movie.toLowerCase())))
            .map((card) => ({
                ...card,
                type: 'movie' as const
            }))

        const filteredSeries = series
            .filter((serie) => serie.title.toLowerCase().includes(movie.toLowerCase()) || (serie.subtitle?.toLowerCase().includes(movie.toLowerCase())))
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
            <SEO title="Busca | FlixNext" description="Busque entre centenas de filmes e séries! Só aqui você encontra de tudo!" />
            <Header userAvatar={usuario?.avatar} status={status} />
            <section className={styles.container}>
                <div className={styles.title}>
                    <h2>Resultados da busca:</h2>
                </div>
                <div className={styles.cardsContainer}>
                    {searchCards || searchSeries ? (searchCards && searchCards.length > 0 ? searchCards?.map(card =>
                        <Card
                            key={card.tmdbId}
                            card={card}
                        />


                    ) : searchSeries && searchSeries.length > 0 ? searchSeries?.map(serie =>
                        <CardSerie
                            key={serie.tmdbID}
                            card={serie}
                        />
                    ) :
                        <div className={styles.noResultsContainer}>
                            <h2>"Não encontramos o que procura =/"</h2>
                        </div>
                    ) :
                        <div className={styles.noResultsContainer}>
                            <h2>"Não encontramos o que procura =/"</h2>
                        </div>}

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
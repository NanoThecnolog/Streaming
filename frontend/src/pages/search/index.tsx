import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { CardsProps } from "@/@types/Cards";
import { cards } from "@/data/cards";
import { series } from "@/data/series";
import Card from "@/components/Card";
import CardSerie from "@/components/seriesComponents/Card";
import { UserProps } from "@/@types/user";
import Footer from "@/components/Footer";
import { SeriesProps } from "@/@types/series";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { getUserCookieData } from "@/services/cookieClient";
import SEO from "@/components/SEO";
import Filter from "@/components/ui/SearchFilter";

export default function Search(status: string) {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [searchCards, setSearchCards] = useState<CardsProps[]>()
    const [searchSeries, setSearchSeries] = useState<SeriesProps[]>()
    const [usuario, setUsuario] = useState<UserProps | null>(null)
    const [title, setTitle] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [streaming, setStreaming] = useState<string>('')
    const [faixa, setFaixa] = useState<string>('')
    const [filtered, setFiltered] = useState<(CardsProps | SeriesProps)[] | []>([])

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

    function handleFilter() {
        newFilter()
    }

    function searchingMovie(movie: string) {
        setFiltered([])
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
        const combined = [...filteredCards, ...filteredSeries]
        setFiltered(combined)

    }

    function newFilter() {
        setFiltered([])
        if (title === '' && genre === '' && streaming === '' && faixa === '') return console.log('Tudo vazio');
        console.log(`
            titulo: ${title != '' ? title : 'string vazia'},
            genero: ${genre != '' ? genre : 'string vazia'},
            streaming: ${streaming != '' ? streaming : 'string vazia'},
            faixa: ${faixa != '' ? faixa : 'string vazia'}
            `)
        function matches(item: CardsProps | SeriesProps): boolean {
            const matchesTitle = !title || item.title.toLowerCase().includes(title.toLowerCase()) || item.subtitle.toLowerCase().includes(title.toLowerCase());
            const matchesGenre = !genre || item.genero.some((g) => g.toLowerCase() === genre.toLowerCase());
            const matchesStreaming = !streaming || item.genero.some((g) => g.toLowerCase() === streaming.toLowerCase());
            const matchesFaixa = !faixa || item.faixa.toLowerCase() === faixa.toLowerCase();
            return matchesTitle && matchesGenre && matchesStreaming && matchesFaixa;
        }

        const filteredCard = cards.filter(matches)
        const filteredSerie = series.filter(matches)
        console.log([...filteredCard, ...filteredSerie])
        const combined = [...filteredCard, ...filteredSerie]
        setFiltered(combined)
    }

    return (
        <>
            <SEO title="Busca | FlixNext" description="Busque entre centenas de filmes e séries! Só aqui você encontra de tudo!" />
            <Header userAvatar={usuario?.avatar} status={status} />
            <section className={styles.container}>
                <Filter
                    title={title}
                    genre={genre}
                    streaming={streaming}
                    faixa={faixa}
                    setTitle={setTitle}
                    setGenre={setGenre}
                    setStreaming={setStreaming}
                    setFaixa={setFaixa}
                    handleFilter={handleFilter}
                />
                <div className={styles.results}>
                    <div className={styles.title}>
                        <h2>Resultados da busca:</h2>
                    </div>
                    <div className={styles.cardsContainer}>
                        {
                            filtered.length > 0 ? filtered.map(card => {
                                if ("season" in card) {
                                    return (
                                        <CardSerie key={card.tmdbID} card={card} />
                                    )
                                } else {
                                    return (
                                        <Card key={card.tmdbId} card={card} />
                                    )
                                }
                            }) :
                                <div className={styles.noResultsContainer}>
                                    <h2>Não encontramos o que procura =/</h2>
                                </div>
                        }

                    </div>
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
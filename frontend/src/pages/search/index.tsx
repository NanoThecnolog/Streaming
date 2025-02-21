import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from './styles.module.scss'
import { CardsProps } from "@/@types/Cards";
import { cards } from "@/data/cards";
import { series } from "@/data/series";
import Card from "@/components/Card";
import CardSerie from "@/components/seriesComponents/Card";
import Footer from "@/components/Footer";
import { SeriesProps } from "@/@types/series";
import SEO from "@/components/SEO";
import Filter from "@/components/ui/SearchFilter";
import Link from "next/link";
import Spinner from "@/components/ui/Loading/spinner";
import { normalizing } from "@/utils/UtilitiesFunctions";
import { matches } from "@/utils/FilterFunctions";

export default function Search() {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [input, setinput] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [streaming, setStreaming] = useState<string>('')
    const [faixa, setFaixa] = useState<string>('')
    const [filtered, setFiltered] = useState<(CardsProps | SeriesProps)[] | []>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (router.isReady) {
            const { input } = router.query;
            setMovie(normalizing(input as string))
        }
    }, [router.isReady, router.query, movie])
    useEffect(() => {
        if (movie && movie !== '') {
            searchingMovie(movie);
        }
    }, [movie])
    async function searchingMovie(movie: string) {
        setFiltered([])
        try {
            if (loading) return

            setLoading(true)
            const normalizedMovie = normalizing(movie)
            const filteredCards = cards
                .filter((card) => {
                    const normalizedTitle = normalizing(card.title).toLowerCase()
                    const normalizedSubtitle = normalizing(card.subtitle).toLowerCase()
                    return (
                        normalizedTitle.includes(normalizedMovie) ||
                        normalizedSubtitle.includes(normalizedMovie)
                    )
                })
                .map((card) => ({
                    ...card,
                    type: 'movie' as const
                }))

            const filteredSeries = series
                .filter((serie) => {
                    const normalizedTitle = normalizing(serie.title).toLowerCase()
                    const normalizedSubtitle = normalizing(serie.subtitle).toLowerCase()
                    return (
                        normalizedTitle.includes(normalizedMovie) ||
                        normalizedSubtitle.includes(normalizedMovie)
                    )
                })
                .map((serie) => ({
                    ...serie,
                    type: 'series' as const
                }))
            const combined = [...filteredCards, ...filteredSeries]
            setFiltered(combined)
            await new Promise((resolve) => setTimeout(resolve, 1000))
        } catch (err) {
            console.error("Erro durante a busca pelo header.", err)
        } finally {
            setLoading(false)
        }
    }

    async function handleFilter() {
        await newFilter()
    }
    async function newFilter() {
        setFiltered([])
        try {
            if (loading) return
            setLoading(true)

            //const normalizedInput = normalizing(input).toLowerCase()
            if (input === '' && genre === '' && streaming === '' && faixa === '') return setLoading(false);


            const filteredCard = cards.filter((item) => matches(input, genre, streaming, faixa, item))
            const filteredSerie = series.filter((item) => matches(input, genre, streaming, faixa, item))
            const combined = [...filteredCard, ...filteredSerie]
            setFiltered(combined)
            await new Promise((resolve) => setTimeout(resolve, 1000))

        } catch (err) {
            console.error("Erro ao buscar pelo filtro.", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO title="Busca | FlixNext" description="Busque entre centenas de filmes e séries! Só aqui você encontra de tudo!" />
            <Header />
            <section className={styles.container}>
                <Filter
                    title={input}
                    genre={genre}
                    streaming={streaming}
                    faixa={faixa}
                    setTitle={setinput}
                    setGenre={setGenre}
                    setStreaming={setStreaming}
                    setFaixa={setFaixa}
                    handleFilter={handleFilter}
                />
                <div className={styles.results}>
                    {
                        loading ? <Spinner /> :
                            <div className={`${filtered.length > 0 ? styles.cardsContainer : styles.noCardsContainer}`}>
                                {
                                    filtered.length > 0 ? filtered.map((card, index) => {
                                        if ("season" in card) {
                                            return <CardSerie key={index} card={card} />
                                        } else {
                                            return <Card key={index} card={card} />
                                        }
                                    })
                                        :
                                        <div className={styles.noResultsContainer}>
                                            <h2>Não achou o que procurava? Talvez ele ainda não esteja no catálogo. Mas deixa esse trabalho com a gente!</h2>
                                            <p><Link href={`/request`}>Clique aqui</Link> para selecionar e pedir o filme ou série que você quer ver!</p>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}
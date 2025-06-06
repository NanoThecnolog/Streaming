import Header from '@/components/Header'
import styles from './styles.module.scss'
import { FormEvent, useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { apiTMDB } from '@/services/apiTMDB';
import { RequestCardProps } from '@/@types/RequestCard';
import RequestCard from '@/components/RequestCard';
import { CardsProps } from '@/@types/Cards';
import { SeriesProps } from '@/@types/series';
import Spinner from '@/components/ui/Loading/spinner';
import { useFlix } from '@/contexts/FlixContext';
import { mongoService } from '@/classes/MongoContent';

export default function Request() {
    const [title, setTitle] = useState<string>('')
    const [searchCards, setSearchCards] = useState<RequestCardProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { movies, series, setMovies, setSeries } = useFlix()

    useEffect(() => {
        async function getMongoData() {
            const [mongoMovies, mongoSeries] = await Promise.all([
                mongoService.fetchMovieData(),
                mongoService.fetchSerieData()
            ])
            setMovies(mongoMovies)
            setSeries(mongoSeries)
        }
        if (movies.length === 0 || series.length === 0) getMongoData()

    }, [movies, series])


    /**
     * Busca no tmdb o termo no estado title.
     * Inicia limpando o estado SearchCards, que é usado para armazenar os resultados da busca.
     * Os resultados são filtrados pra aparecer somente filmes e séries.
     * Os resultados filtrados passam por um novo filtro que verifica se os títulos já existem na plataforma
     * salva os resultados no estado SearchCards, para renderização
     */
    async function handleSearch(e: FormEvent) {
        e.preventDefault()

        setSearchCards([])

        try {
            if (loading) return;
            setLoading(true)
            const initialResponse = await apiTMDB.get(`/search`, {
                params: {
                    query: title,
                    page: 1,
                },
            });

            const { results, total_pages } = initialResponse.data;
            const allRequests = [];
            for (let page = 2; page <= total_pages; page++) {
                allRequests.push(
                    apiTMDB.get(`/search`, {
                        params: {
                            query: title,
                            page,
                        },
                    })
                );
            }

            const otherResponses = await Promise.all(allRequests);

            const seenIds = new Set<number>();
            const cardIds = new Set(movies.map((card: CardsProps) => card.tmdbId))
            const serieIds = new Set(series.map((serie: SeriesProps) => serie.tmdbID))

            const allResults = [
                ...results.filter(
                    (item: any) =>
                        (item.media_type === 'tv' || item.media_type === 'movie') &&
                        !seenIds.has(item.id) &&
                        !cardIds.has(item.id) &&
                        !serieIds.has(item.id) &&
                        seenIds.add(item.id)

                ),
                ...otherResponses.flatMap((response) =>
                    response.data.results.filter(
                        (item: any) =>
                            (item.media_type === 'tv' || item.media_type === 'movie') &&
                            !seenIds.has(item.id) &&
                            !cardIds.has(item.id) &&
                            !serieIds.has(item.id) &&
                            seenIds.add(item.id)
                    )
                ),
            ];
            setSearchCards(allResults);
            //console.log(allResults);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <SEO description='Solicite seu filme ou sua série!' title='Solicitar Filme ou Série' />
            <Header />
            <main className={styles.mainContainer}>
                <section className={styles.sectionContainer}>
                    <div>
                        <form onSubmit={(e) => handleSearch(e)} className={styles.inputContainer}>
                            <label htmlFor="nome">
                                <h2>Nome do filme ou série</h2>
                                <input type="text" id='nome' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <button type='submit'>Buscar</button>
                        </form>
                    </div>
                    {
                        loading ? <div className={styles.loading}><Spinner /></div> : searchCards && searchCards.length > 0 ?
                            <>
                                <h3 className={styles.warning}>Clique em um card para Solicitá-lo</h3>
                                <div className={styles.cardContainer}>
                                    {searchCards.map(card => <RequestCard card={card} key={card.id} />)}
                                </div>
                            </> :
                            <div className={styles.noResults}>
                                <h3>Nada encontrado.</h3>
                            </div>
                    }
                </section>
            </main>
            <Footer />
        </>
    )
}
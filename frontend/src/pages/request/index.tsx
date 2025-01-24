import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { getUserCookieData } from '@/services/cookieClient';
import { UserProps } from '@/@types/user';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { apiTMDB } from '@/services/apiTMDB';
import { RequestCardProps } from '@/@types/RequestCard';
import RequestCard from '@/components/RequestCard';
import { CardsProps } from '@/@types/Cards';
import { cards } from '@/data/cards';
import { series } from '@/data/series';
import { SeriesProps } from '@/@types/series';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Request() {
    const router = useRouter()
    const [user, setUser] = useState<UserProps>()
    const [title, setTitle] = useState<string>('')
    const [searchCards, setSearchCards] = useState<RequestCardProps[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserCookieData();
                if (!user) {
                    return
                }
                setUser(user)
            } catch (err) {
                console.log("Erro ao buscar dados do usuário no cookie", err)
            }
        }
        getUserData()
    }, [])
    /**
     * Busca no tmdb o termo no estado title.
     * Inicia limpando o estado SearchCards, que é usado para armazenar os resultados da busca.
     * Os resultados são filtrados pra aparecer somente filmes e séries.
     * Os resultados filtrados passam por um novo filtro que verifica se os títulos já existem na plataforma
     * salva os resultados no estado SearchCards, para renderização
     */
    async function handleSearch() {
        setSearchCards([])

        try {
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
            const cardIds = new Set(cards.map((card: CardsProps) => card.tmdbId))
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
            console.log(allResults);
        } catch (err) {
            console.error(err);
        }
    }
    async function handleRequest(tmdbId: number) {
        if (!user) return router.push('/login')
        if (loading) return
        setLoading(true)
        try {
            const response = await api.post('/request/content', {
                tmdbId
            })
            const data = response.data;
            console.log(data)
            toast.success("Conteúdo Solicitado!")
        } catch (err) {
            console.log(err)
            toast.error("Não conseguimos solicitar o conteúdo. Tente novamente mais tarde!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO description='Solicite seu filme ou sua série!' title='Solicitar Filme ou Série' />
            <Header userAvatar={user?.avatar} />
            <main className={styles.mainContainer}>
                <section className={styles.sectionContainer}>
                    <div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="nome">
                                <h2>Nome do filme ou série</h2>
                                <input type="text" id='nome' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <button onClick={handleSearch}>Buscar</button>
                        </div>
                    </div>
                    {searchCards && searchCards.length > 0 ?
                        <>
                            <h3 className={styles.warning}>Clique em um card para Solicitá-lo</h3>
                            <div className={styles.cardContainer}>
                                {searchCards.map(card => <RequestCard card={card} key={card.id} handleClick={handleRequest} loading={loading} />)}
                            </div>
                        </> :
                        <div className={styles.noResults}>
                            <h3>"Nada encontrado."</h3>
                        </div>

                    }
                </section>
            </main>
            <Footer />
        </>
    )
}
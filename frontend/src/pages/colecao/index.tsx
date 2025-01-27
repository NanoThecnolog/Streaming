import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResultsProps } from '@/@types/collection';
import { collections } from '@/data/collections';
import { cards } from '@/data/cards';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Collection() {
    const router = useRouter()
    const [collection, setCollection] = useState<ResultsProps | null>(null);

    useEffect(() => {
        if (router.query.collection) {
            try {
                const collectionData = JSON.parse(router.query.collection as string);
                console.log(collectionData)
                setCollection(collectionData)
            } catch (err) {
                console.log("Erro ao recuperar dados da coleção", err)
            }
        }
    }, [router.query])
    return (
        <>
            <SEO title={`${collection ? collection.name : 'Coleção de Filmes'} | FlixNext`} description='Assista aos filmes do seu coração!' />
            <Header />
            <section className={styles.sectionContainer}>
                <div className={styles.data}>
                    {collection ? (
                        (() => {
                            const colecao = collections.find((colecao) => colecao.id === collection.id)
                            if (!colecao) return <p>Coleção Não Encontrada</p>;

                            let filteredCards = cards.filter((card) =>
                                card.title.toLowerCase().includes(colecao.name.toLowerCase()))
                            if (colecao.name.toLowerCase() === 'pânico') {
                                filteredCards = filteredCards.filter((card) =>
                                    !card.title.toLowerCase().includes("todo mundo")
                                )
                            }
                            if (colecao.name.toLowerCase() === 'batman') {
                                filteredCards = filteredCards.filter((card) =>
                                    card.subtitle?.toLowerCase().includes('cavaleiro das trevas') ||
                                    card.subtitle?.toLowerCase().includes('begins')
                                )
                            }
                            return filteredCards ? filteredCards.map(card => (
                                <Card
                                    key={card.tmdbId}
                                    card={card}
                                />
                            )) : <p>Coleção Não Encontrada</p>
                        })()
                    ) : <p>Carregando Coleção...</p>}
                </div>
            </section>
            <Footer />
        </>
    )
}
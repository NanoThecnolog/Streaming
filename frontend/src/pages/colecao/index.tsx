import Header from '@/components/Header'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next';
import { serverStatus } from '@/services/verifyStatusServer';
import { useEffect, useState } from 'react';
import { UserProps } from '@/@types/user';
import { getUserCookieData } from '@/services/cookieClient';
import { useRouter } from 'next/router';
import { ResultsProps } from '@/@types/collection';
import { collections } from '@/js/collections';
import { cards } from '@/js/cards';
import Card from '@/components/Card';
import Footer from '@/components/Footer';

export default function Collection(status: string) {
    const [usuario, setUsuario] = useState<UserProps | null>(null)
    const router = useRouter()
    const [collection, setCollection] = useState<ResultsProps | null>(null);

    useEffect(() => {
        if (router.query.collection) {
            try {
                const collectionData = JSON.parse(router.query.collection as string);
                console.log(collectionData)
                setCollection(collectionData)
            } catch (err) {
                console.log("Erro ao capturar coleção", err)
            }
        }
    }, [router.query])


    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUsuario(user)
        }
        fetchUserData()
    }, [])
    return (
        <>
            <Header userAvatar={usuario?.avatar} status={status} />
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
import { cards } from '@/js/cards'
import { series } from '@/js/series'
import styles from './styles.module.scss'
import Head from 'next/head'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { getUserCookieData } from '@/services/cookieClient'
import { UserProps } from '@/@types/user'
import Footer from '@/components/Footer'

export default function Catalogo() {
    const [user, setUser] = useState<UserProps>()

    useEffect(() => {
        const userData = async () => {
            const user = await getUserCookieData();
            if (!user) return Router.push('/login');
            setUser(user)
        }
        userData()
    }, [])

    return (
        <>
            <Head>
                <title>Catálogo | FlixNext</title>
                <meta name="description" content="Veja os títulos disponíveis na plataforma" />
            </Head>
            <Header userAvatar={user?.avatar} />
            <main className={styles.container}>
                <div>
                    <h1>Filmes</h1>
                    <div className={styles.contentContainer}>
                        {cards.map(card => (
                            <div key={card.tmdbId}>
                                <h4>{card.title} {card.subtitle && ` - ${card.subtitle}`}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Séries</h1>
                    <div className={styles.contentContainer}>
                        {series.map(serie => (
                            <div key={serie.tmdbID}>
                                <h4>{serie.title} {serie.subtitle && `- ${serie.subtitle}`}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
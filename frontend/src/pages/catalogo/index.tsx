import { cards } from '@/js/cards'
import { series } from '@/js/series'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getUserCookieData } from '@/services/cookieClient'
import { UserProps } from '@/@types/user'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Catalogo() {
    const [user, setUser] = useState<UserProps>()
    const router = useRouter()

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
            <SEO title='Catálogo | FlixNext' description='Catálogo com mais de 200 títulos para todos os gostos. Veja os conteúdos disponíveis na plataforma' />
            <Header userAvatar={user?.avatar} />
            <main className={styles.container}>
                <div>
                    <h1>Filmes - {cards.length}</h1>
                    <div className={styles.contentContainer}>
                        {[...cards].sort((a, b) => a.title.localeCompare(b.title)).map(card => (
                            <div key={card.tmdbId} onClick={() => router.push(`/watch/${card.tmdbId}`)}>
                                <h4>{card.title} {card.subtitle && ` - ${card.subtitle}`}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Séries - {series.length}</h1>
                    <div className={styles.contentContainer}>
                        {[...series].sort((a, b) => a.title.localeCompare(b.title)).map(serie => (
                            <div key={serie.tmdbID} onClick={() => router.push(`/series/serie/${serie.tmdbID}`)}>
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
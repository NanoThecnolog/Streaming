import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import MovieDash from '@/components/dashboard/Movie'
import TVDash from '@/components/dashboard/Tv'
import { useFlix } from '@/contexts/FlixContext'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { debug } from '@/classes/DebugLogger'

export default function Dashboard() {
    const router = useRouter()
    const { user, setUser } = useFlix()
    const [type, setType] = useState<string>('')
    useEffect(() => {
        if (!user) {
            const { 'flix-user': userCookie } = parseCookies()
            if (!userCookie) {
                router.push('/login')
                return
            }
            setUser(JSON.parse(userCookie))
        }
    }, [])
    useEffect(() => {
        if (user) {
            const access = user.access
            debug.log('acesso: ', access)
            debug.log(user)
            //if (!access) router.push('/login')
        }
    }, [user])

    function ComponentToShow() {
        if (type === 'movie') {
            return <MovieDash />
        }
        if (type === 'tv') {
            return <TVDash />
        }
    }


    return (
        <>
            <Header />
            <main className={styles.container}>
                <aside>
                    <div className={styles.menuContainer}>
                        <button onClick={() => setType('movie')}>Filmes</button>
                        <button onClick={() => setType('tv')}>Séries</button>
                    </div>
                </aside>
                <article>
                    <section className={styles.componentContainer}>
                        {ComponentToShow()}
                    </section>
                </article>
            </main>
        </>
    )
}
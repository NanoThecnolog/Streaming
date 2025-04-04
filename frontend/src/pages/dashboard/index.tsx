import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useState } from 'react'
import MovieDash from '@/components/dashboard/Movie'
import TVDash from '@/components/dashboard/Tv'

export default function Dashboard() {
    const [type, setType] = useState<string>('')

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
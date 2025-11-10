import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useState } from 'react'
import MovieDash from '@/components/dashboard/Movie'
import TVDash from '@/components/dashboard/Tv'
import { useRouter } from 'next/router'
import { debug } from '@/classes/DebugLogger'
import { GetServerSideProps } from 'next'
import { SetupAPIClient } from '@/services/api'
import Head from 'next/head'

export default function Dashboard() {
    const router = useRouter()
    const [type, setType] = useState<string>('')
    const { id } = router.query;

    function ComponentToShow() {
        if (type === 'movie') {
            return <MovieDash id={parseInt(id as string)} />
        }
        if (type === 'tv') {
            return <TVDash id={parseInt(id as string)} />
        }
    }


    return (
        <>
            <Head>
                <meta name='robots' content='noindex, nofollow' />
            </Head>

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const client = new SetupAPIClient(ctx)

    try {
        const response = await client.api.get('/user/access')
        const data: { access: boolean, message: string } = response.data
        debug.log(data)
        if (!data.access) return {
            redirect: {
                destination: '/series',
                permanent: false
            }
        }

        return {
            props: {}
        }
    } catch (err) {
        console.log('Error getting access for user', err)

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}
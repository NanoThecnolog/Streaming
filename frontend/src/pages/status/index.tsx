import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useEffect } from 'react'
import { debug } from '@/classes/DebugLogger'
import { statusVerify } from '@/utils/UtilitiesFunctions'

interface StatusPageProps {
    services: {
        front: boolean,
        back: boolean,
        sub: boolean,
        messenger: boolean
        dbmanager: boolean
    }
}

export default function StatusPage({ services }: StatusPageProps) {

    useEffect(() => {
        debug.log(services)
    }, [services])

    return (
        <>
            <Head>
                <title>Página de Status</title>
                <meta name='description' content='Página de Status' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <article className={styles.statusContainer}>
                    <section className={styles.statusCard}>
                        <div>Site <span className={styles.statusSignal} style={{ backgroundColor: services.front ? 'green' : 'red' }}></span></div>
                        <div>Gerenciamento de usuários <span className={styles.statusSignal} style={{ backgroundColor: services.back ? 'green' : 'red' }}></span></div>
                        <div>Gerenciamento de assinaturas <span className={styles.statusSignal} style={{ backgroundColor: services.sub ? 'green' : 'red' }}></span></div>
                        <div>Serviço de mensageria <span className={styles.statusSignal} style={{ backgroundColor: services.messenger ? 'green' : 'red' }}></span></div>
                        <div>Gerenciamento de conteúdo <span className={styles.statusSignal} style={{ backgroundColor: services.dbmanager ? 'green' : 'red' }}></span></div>
                    </section>
                    <section className={styles.historicContainer}>
                        histórico diário ou horário? em lista ou em gráfico?
                    </section>
                    <section className={styles.featuresContainer}>
                        alterações nas funcionalidades em lista
                    </section>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const baseUrl = 'https://api.flixnext.com.br'
    const baseUrlFront = 'https://flixnext.com.br'

    const promises = await Promise.allSettled([
        axios.get(`${baseUrlFront}/api/awake`, { timeout: 3000 }),
        axios.get(`${baseUrl}/backend`, { timeout: 3000 }),
        axios.get(`${baseUrl}/manager`, { timeout: 3000 }),
        axios.get(`${baseUrl}/mensageria`, { timeout: 3000 }),
        axios.get(`${baseUrl}/content`, { timeout: 3000 })
    ])

    const [front, back, sub, messenger, dbmanager] = promises

    return {
        props: {
            services: {
                front: statusVerify(front),
                back: statusVerify(back),
                sub: statusVerify(sub),
                messenger: statusVerify(messenger),
                dbmanager: statusVerify(dbmanager)
            }
        }
    }
}
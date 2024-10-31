import Header from '@/components/Header'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next';
import { serverStatus } from '@/services/verifyStatusServer';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { UserProps } from '@/@types/user';
import { getUserCookieData } from '@/services/cookieClient';
import Router from 'next/router';

export default function Favorite(status: string) {
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
                <title>Favoritos - FlixNext</title>
                <meta name="description" content="Favoritos da conta." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header status={status} />
            <main>

            </main>
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
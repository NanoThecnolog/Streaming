import Header from '@/components/Header'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next';
import { serverStatus } from '@/services/verifyStatusServer';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getCookieClient } from '@/services/cookieClient';
import { api } from '@/services/api';
import { UserProps } from '@/@types/user';

export default function Favorite(status: { status: string }) {
    const [user, setUser] = useState<UserProps>()
    useEffect(() => {
        getUserData()
    }, [status])
    async function getUserData() {
        const user = getCookieClient();
        if (!user) {
            return
        }
        try {
            const atualizarUsuario = await api.get('/user', {
                params: {
                    id: user.id
                }
            })
            const expressTime = 15 * 24 * 60 * 60 * 1000;
            const userJson = JSON.stringify(atualizarUsuario.data)
            document.cookie = `flixnext=${userJson}; path=/; max-age=${expressTime}`
            //console.log(userData)
        } catch (err) {
            console.log("Erro ao buscar dados do usuário na API", err)
        }
    }
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
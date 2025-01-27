import Header from '@/components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { UserProps } from '@/@types/user';
import { getUserCookieData } from '@/services/cookieClient';
import Router from 'next/router';
import SEO from '@/components/SEO';

export default function Favorite() {
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
            <SEO title='Favoritos - FlixNext' description='Página vazia' />
            <Header />
            <main>
            </main>
        </>
    )
}
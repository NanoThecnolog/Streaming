import Head from "next/head";
import styles from '@/styles/Watch.module.scss';
import { useCallback, useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { ChevronLeft } from 'lucide-react';
import { api } from "@/services/api";
import { getUserCookieData } from "@/services/cookieClient";

export default function Watch() {
    const router = useRouter()
    const { title, subTitle, src } = router.query;
    const [movieData, setMovieData] = useState({ title: '', subTitle: '', src: '' });

    const acordarServidor = useCallback(async () => {
        try {
            await api.get('/acordar')
        } catch (err) {
            console.error("Erro ao acordar o servidor", err)
        }
    }, [])
    const userData = useCallback(async () => {
        const user = await getUserCookieData();
        if (!user) return router.push('/login');
    }, [router])

    useEffect(() => {
        userData()
    }, [userData])


    useEffect(() => {
        acordarServidor();
        const manterAcordado = setInterval(acordarServidor, 40000);
        return () => clearInterval(manterAcordado)
    }, [acordarServidor])

    useEffect(() => {
        if (title && src) {
            setMovieData({
                title: title as string,
                subTitle: subTitle as string || '',
                src: src as string,
            })
        }
    }, [title, subTitle, src])


    const handleBack = useCallback(() => {
        router.back()
    }, [router])
    useEffect(() => {
        function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

        // Impede atalhos de ferramentas de desenvolvedor
        function openConsoleBlock(event: KeyboardEvent) {
            const blockedKeys = ['F12', 'I', 'C', 'J', 'U']
            if (
                blockedKeys.includes(event.key) ||
                (event.ctrlKey && event.shiftKey && blockedKeys.includes(event.key)) ||
                (event.ctrlKey && event.key === 'U')
            ) {
                event.preventDefault();
            }
        };

        document.addEventListener('contextmenu', rightClickBlock);
        document.addEventListener('keydown', openConsoleBlock);

        return () => {
            document.removeEventListener('contextmenu', rightClickBlock);
            document.removeEventListener('keydown', openConsoleBlock);
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title} - FlixNext</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.movie}>
                    <div className={styles.movieName}>
                        <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                            <ChevronLeft size={30} />
                        </button>
                        <h3>{title} {subTitle != "" && `- ${subTitle}`}</h3>
                    </div>
                    <div className={styles.iframe} id="iframe">
                        <iframe
                            title={movieData.title}
                            allowFullScreen
                            width="100%"
                            height="100%"
                            src={movieData.src}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
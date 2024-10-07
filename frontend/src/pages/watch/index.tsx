import Head from "next/head";
import styles from '@/styles/Watch.module.scss';
import { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { ChevronLeft } from 'lucide-react';

export default function Watch() {
    const router = useRouter()
    const { title, subTitle, src } = router.query;
    const [movieData, setMovieData] = useState({ title: '', subTitle: '', src: '' });



    useEffect(() => {
        if (title && src) {

            setMovieData({
                title: title as string,
                subTitle: subTitle as string || '',
                src: src as string,
            })
        }
    }, [title, subTitle, src])

    function handleBack() {
        Router.push('/')
    }

    return (
        <>
            <Head>
                <title>Filme {title} - FlixNext</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.movie}>
                    <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                        <ChevronLeft size={30} />
                    </button>
                    <h3>{title} {subTitle != "" && `- ${subTitle}`}</h3>
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
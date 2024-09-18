import Head from "next/head";
import styles from '@/styles/Watch.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//import ReactPlayer from "react-player";
//import { Mouse } from "lucide-react";
//import { clearTimeout } from "timers";



export default function Watch() {
    const router = useRouter()
    const { title, subTitle, src } = router.query;
    const [movieData, setMovieData] = useState({ title: '', subTitle: '', src: '' });
    //const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    //const [visibleTitle, setVisibleTitle] = useState<boolean>(false)

    useEffect(() => {
        if (title && src) {
            setMovieData({
                title: title as string,
                subTitle: subTitle as string || '',
                src: src as string
            })
        }
    }, [title, subTitle, src])

    return (
        <>
            <Head>
                <title>Filme {title} - FlixNext</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.movie}>
                    <h3>{title} {subTitle != "" && `- ${subTitle}`}</h3>
                    <iframe
                        title={movieData.title}
                        allowFullScreen
                        width="100%"
                        height="100%"
                        src={movieData.src}
                    />
                </div>
            </div>
        </>
    )
}
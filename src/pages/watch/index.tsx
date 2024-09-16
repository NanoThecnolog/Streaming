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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [visibleTitle, setVisibleTitle] = useState<boolean>(false)

    useEffect(() => {
        if (title && src) {
            setMovieData({
                title: title as string,
                subTitle: subTitle as string || '',
                src: src as string
            })
        }



    }, [title, subTitle, src])

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;


        setVisibleTitle(true);

        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            setVisibleTitle(false)
        }, 5000)
        console.log(mousePosition)


        window.addEventListener('mousemove', detectarMovimento)

        return () => {
            window.addEventListener('mousemove', detectarMovimento)
            if (timeoutId !== null) clearTimeout(timeoutId)

        }
    }, [mousePosition])
    function detectarMovimento(event: MouseEvent) {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        })
    }


    return (
        <>
            <Head>
                <title>Assistir {title}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.movie}>
                    {visibleTitle &&
                        <h3>{title} {subTitle != "" && `- ${subTitle}`}</h3>
                    }
                    <iframe
                        onMouseMove={(event) => detectarMovimento(event.nativeEvent)}
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
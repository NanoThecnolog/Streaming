import { series } from '@/js/series'
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';


export default function TopSerie() {
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')
            setTimeout(() => {
                setCardOn(prevCardOn => (prevCardOn + 1) % series.length);
                setFade('fadeIn')
            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    function handleEpisodes(title: string) {
        const serie = new URLSearchParams({
            title: `${title}`
        })
        Router.push(`/series/serie?${serie}`)
    }

    function handleWatch() {
        const movie = new URLSearchParams({
            title: `${series[cardOn].title}`,
            subTitle: `${series[cardOn].subtitle}` || "",
            src: `${series[cardOn].season[0].episodes[0].src}`,
            episode: `${series[cardOn].season[0].episodes[0].ep}`,
            season: `${series[cardOn].season[0].s}`
        });
        const play: string = `/watch/serie?${movie}`
        Router.push(play)
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`} style={{ backgroundImage: `url(${series[cardOn].background})` }}>
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 id="titulo-principal">{series[cardOn].title.toUpperCase()}</h1>
                    {series[cardOn].subtitle && (
                        <h3 className={styles.subtitulo_principal}>{series[cardOn].subtitle}</h3>
                    )}
                    <div className={styles.season}>
                        <p>{series[cardOn].season.length === 1 ? `${series[cardOn].season.length} Temporada` : series[cardOn].season.length >= 2 && `${series[cardOn].season.length} Temporadas`}</p>
                    </div>
                    <div className={styles.description}>
                        <p>{series[cardOn].description}</p>
                    </div>

                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={(e) => handleWatch()}>
                            <h3>Play</h3>
                            <FaCirclePlay color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={() => handleEpisodes(series[cardOn].title)}>
                            <h3>EPISÓDIOS</h3>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
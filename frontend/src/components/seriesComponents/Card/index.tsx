import styles from './styles.module.scss'
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CardInfoSerieModal from "../CardInfos";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import OverlaySerie from "../Overlay";
import { fetchTMDBSeries } from '@/services/fetchTMDBData';
import { useRouter } from 'next/router';
import { useTMDB } from '@/contexts/TMDBContext';


interface CardProps {
    card: SeriesProps;
}


interface TMDBImageProps {
    poster: string
}

export default function Card({ card }: CardProps) {
    const router = useRouter()
    const [TMDBImage, setTMDBImage] = useState<TMDBImageProps>()
    const { serieData } = useTMDB()
    const [TMDBSerie, setTMDBSerie] = useState<TMDBSeries>()

    useEffect(() => {
        const data = serieData.find(data => data.id === card.tmdbID)
        if (data) {
            const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
            setTMDBSerie(data)
            setTMDBImage({ poster: posterUrl })
        }
    }, [card, serieData])

    function handleClick() {
        router.push(`/series/serie/${card.tmdbID}`)
    }


    return (
        <>
            <div key={card.tmdbID} className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={TMDBImage ? TMDBImage.poster : card.overlay}
                    alt={card.title}
                    fill
                    placeholder="blur"
                    blurDataURL="/blurImage.png"
                    quality={35}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                    onClick={() => handleClick()}
                />
            </div>
        </>
    )
}


import styles from './styles.module.scss'
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CardInfoSerieModal from "../CardInfos";
import { SeriesProps } from "@/@types/series";
import { serieData } from "@/services/fetchSeries";
import OverlaySerie from "../Overlay";


interface CardProps {
    card: SeriesProps;
}
type StateProps = {
    modalVisible: boolean,
    TMDBPoster: string | null,
}

export default function Card({ card }: CardProps) {
    const [state, setState] = useState<StateProps>({
        modalVisible: false,
        TMDBPoster: null,
    })
    const { modalVisible, TMDBPoster } = state;
    useEffect(() => {
        if (card.tmdbID !== 0) {
            fetchSerieData();
        } else {
            setState(prev => ({ ...prev, TMDBPoster: null }))
        }
    }, [card, modalVisible])

    async function fetchSerieData() {
        const serie = await serieData(card.tmdbID)
        setState(prev => ({ ...prev, TMDBPoster: serie?.poster_path ? `https://image.tmdb.org/t/p/original${serie.poster_path}` : null }))
    }

    const handleClick = useCallback(() => setState(prev => ({ ...prev, modalVisible: !prev.modalVisible })), [])
    const handleModalClose = useCallback(() => setState(prev => ({ ...prev, modalVisible: false })), [])
    const modalVisibility = useCallback(() => setState(prev => ({ ...prev, modalVisible: true })), [])
    const posterSRC = useMemo(() => TMDBPoster ? TMDBPoster : card.overlay, [TMDBPoster, card.overlay])
    return (
        <>
            <div className={styles.card} id={card.genero[0].toLowerCase()}>
                <Image
                    src={posterSRC}
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
                <div className={styles.overlay}>
                    <OverlaySerie
                        tmdbId={card.tmdbID}
                        title={card.title}
                        subtitle={card.subtitle}
                        season={card.season}
                        genero={card.genero}
                        isVisible={modalVisible}
                        modalVisible={modalVisibility}
                    />
                </div>

            </div>

            {modalVisible &&
                <div className={styles.modalInfo}>
                    {
                        <CardInfoSerieModal
                            card={card}
                            handleModalClose={handleModalClose}
                        />
                    }
                </div>
            }
        </>
    )
}


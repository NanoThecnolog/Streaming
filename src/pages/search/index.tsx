import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { CardsProps } from "@/@types/Cards";
import { cards } from "@/js/cards";
import Link from "next/link";
import { FaInfoCircle, FaPlay, FaRegClock, FaStar } from "react-icons/fa";

export default function Search() {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [searchCards, setSearchCards] = useState<CardsProps[]>()

    useEffect(() => {
        if (router.isReady) {
            const { input } = router.query;
            setMovie(input as string)
        }
        if (movie && movie !== '') {
            searchingMovie(movie);
        }

    }, [router.isReady, router.query, movie])

    function searchingMovie(movie: string) {
        const filteredCards = cards.filter((card) => card.title.toLowerCase().includes(movie.toLowerCase()));
        setSearchCards(filteredCards)
        console.log(filteredCards)
    }

    return (
        <>
            <Header handleSearching={searchingMovie} />
            <div className={styles.container}>

                {searchCards ? searchCards?.map((card, index) => {
                    const movie = new URLSearchParams({
                        title: `${card.title}`,
                        subTitle: `${card.subtitle}` || "",
                        src: `${card.src}`
                    });

                    const play: string = `/watch?${movie}`
                    return (
                        <div key={index} className={styles.card} id={card.genero[0].toLowerCase()} style={{ backgroundImage: `url(${card.overlay})` }}>
                            <div className={styles.overlay}>
                                <h3>{card.title.toUpperCase()}</h3>
                                {card.subtitle && (
                                    <h4>{card.subtitle}</h4>
                                )}
                                <p>{card.duration} - {card.genero.join(', ')}</p>

                                <div className={styles.button_container}>
                                    <div className={styles.watch}>
                                        <Link href={`${play}`}>
                                            <button>
                                                <FaPlay size={15} />
                                            </button>
                                        </Link>

                                    </div>
                                    <div className={styles.queue}>
                                        <FaRegClock size={20} />
                                    </div>
                                    <div className={`${styles.star} ${styles.queue}`}>
                                        <FaStar size={20} />
                                    </div>
                                    <div className={`${styles.star} ${styles.queue}`}>
                                        <FaInfoCircle size={20} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
                ) : "Carregando..."}

            </div>
        </>
    )
}
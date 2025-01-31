import Card from "../Card"
import { cards } from "@/data/cards";
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from "react";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { Divide } from "lucide-react";
import { shuffle } from "@/utils/UtilitiesFunctions";
import { CardsProps } from "@/@types/Cards";

interface ContainerProps {
    section: string

    cardPerContainer: number
}

export default function CardContainer({ section, cardPerContainer }: ContainerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(cardPerContainer);
    const [shuffledCards, setShuffledCards] = useState<CardsProps[]>([])

    useEffect(() => {
        if (cardPerContainer) {
            setCardsPerPage(cardPerContainer)
        }
    }, [cardPerContainer])
    useEffect(() => {
        if (!section) return
        const filter = cards.filter(card => card.genero.some(gen => gen.toLowerCase() === section?.toLowerCase()))
        if (!filter) return
        const shuffled = shuffle(filter)
        setShuffledCards(shuffled)
    }, [section])

    function nextPage() {
        if (currentIndex + 1 < shuffledCards.length) {
            setCurrentIndex(currentIndex + 1)
        }
    }
    function prevPage() {
        if (currentIndex - 1 >= 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    return (
        <div className={styles.content_area} id={section}>
            <h2 className={styles.content_title}>{section.toUpperCase()}</h2>
            <div className={styles.card_carousel} id={section}>
                <button className={styles.beforeButton} onClick={prevPage} disabled={currentIndex === 0}>
                    <MdNavigateBefore size={30} />
                </button>
                <button className={styles.nextButton} onClick={nextPage} disabled={currentIndex + cardsPerPage >= shuffledCards.length}>
                    <MdNavigateNext size={30} />
                </button>
                <div className={styles.cardContainer}>
                    {
                        shuffledCards.slice(currentIndex, currentIndex + cardsPerPage).map((card) => (
                            <div className={styles.card} key={card.tmdbId}>
                                <Card
                                    card={card}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
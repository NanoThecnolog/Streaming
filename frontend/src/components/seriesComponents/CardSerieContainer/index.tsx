import Card from "@/components/seriesComponents/Card"
import { series } from "@/js/series";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

interface ContainerProps {
    section: string
    cardPerContainer: number
}

export default function CardContainerSerie({ section, cardPerContainer }: ContainerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(cardPerContainer);
    const filteredCards = series.filter(serie => serie.genero.some(gen => gen.toLowerCase() === section?.toLowerCase()))

    useEffect(() => {
        if (cardPerContainer) {
            setCardsPerPage(cardPerContainer)
        }
    }, [cardPerContainer])

    function nextPage() {
        if (currentIndex + 1 < filteredCards.length) {
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
                <button className={styles.nextButton} onClick={nextPage} disabled={currentIndex + cardsPerPage >= filteredCards.length}>
                    <MdNavigateNext size={30} />
                </button>
                <div className={styles.cardContainer}>
                    {filteredCards.slice(currentIndex, currentIndex + cardsPerPage).map((serie, index) => (
                        <div className={styles.card} key={index}>
                            <Card
                                key={index}
                                card={serie}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
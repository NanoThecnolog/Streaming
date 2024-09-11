import { Container } from "react-dom"
import Card from "../Card"
import { cards } from "@/js/cards";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

interface ContainerProps {
    section: string
    handleOpenModal: (title: string, subTitle?: string) => void;
}

export default function CardContainer({ section, handleOpenModal }: ContainerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(5);
    const filteredCards = cards.filter(card => card.genero.some(gen => gen.toLowerCase() === section?.toLowerCase()))

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            console.log(width)

            //ajustar os breakpoints depois
            if (width < 600) {
                setCardsPerPage(1)
            } else if (width < 900) {
                setCardsPerPage(2)
            } else if (width < 1200) {
                setCardsPerPage(3)
            } else if (width < 1500) {
                setCardsPerPage(4)
            } else {
                setCardsPerPage(5)
            }

        }
        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                <div className={styles.cardContainer}>
                    {filteredCards.slice(currentIndex, currentIndex + cardsPerPage).map((card, index) => (
                        <div className={styles.card} key={index}>
                            <Card
                                card={card}
                                modalWatchLater={handleOpenModal}
                                section={section}
                            />

                        </div>

                    ))}
                </div>

                <button className={styles.nextButton} onClick={nextPage} disabled={currentIndex + cardsPerPage >= filteredCards.length}>
                    <MdNavigateNext size={30} />
                </button>

            </div>
            <div className={styles.controls}>


            </div>
        </div>

    )
}
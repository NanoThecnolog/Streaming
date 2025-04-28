import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import Card from '@/components/Card'

interface RelatedProps {
    cards: CardsProps[]
}

export default function RelatedCardsContainer({ cards }: RelatedProps) {
    return (
        <>
            <h2>Você também vai gostar</h2>
            <div className={styles.cardContainer}>
                {cards.map(card =>
                    <Card card={card} key={card.tmdbId} />
                )}
            </div>
        </>
    )
}
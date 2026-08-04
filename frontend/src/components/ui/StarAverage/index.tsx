import {
    FaRegStar,
    FaStar,
    FaStarHalfAlt,
} from 'react-icons/fa'

import styles from './styles.module.scss'

interface StarProps {
    average: number
    showScore?: boolean
}

const normalizeAverage = (average: number): number => {
    if (!Number.isFinite(average)) return 0

    return Math.min(Math.max(average, 0), 10)
}

export default function Stars({
    average,
    showScore = true,
}: StarProps) {
    const normalizedAverage = normalizeAverage(average)

    const ratingOutOfFive = normalizedAverage / 2

    const roundedRating = Math.round(
        ratingOutOfFive * 2,
    ) / 2

    const scoreLabel = normalizedAverage
        .toFixed(1)
        .replace('.', ',')

    if (normalizedAverage === 0) {
        return (
            <div
                className={styles.rating}
                aria-label="Ainda sem avaliação"
            >
                <FaRegStar
                    className={styles.emptyStar}
                    aria-hidden="true"
                />

                <span className={styles.unavailable}>
                    Sem avaliação
                </span>
            </div>
        )
    }

    const renderStar = (index: number) => {
        const fullStarLimit = index + 1
        const halfStarLimit = fullStarLimit - 0.5

        if (roundedRating >= fullStarLimit) {
            return (
                <FaStar
                    key={`full-${index}`}
                    className={styles.filledStar}
                    aria-hidden="true"
                />
            )
        }

        if (roundedRating >= halfStarLimit) {
            return (
                <FaStarHalfAlt
                    key={`half-${index}`}
                    className={styles.filledStar}
                    aria-hidden="true"
                />
            )
        }

        return (
            <FaRegStar
                key={`empty-${index}`}
                className={styles.emptyStar}
                aria-hidden="true"
            />
        )
    }

    return (
        <div
            className={styles.rating}
            aria-label={`Avaliação ${scoreLabel} de 10`}
        >
            <div
                className={styles.stars}
                aria-hidden="true"
            >
                {Array.from(
                    { length: 5 },
                    (_, index) => renderStar(index),
                )}
            </div>

            {showScore && (
                <span className={styles.score}>
                    <strong>{scoreLabel}</strong>
                    <span>/10</span>
                </span>
            )}
        </div>
    )
}
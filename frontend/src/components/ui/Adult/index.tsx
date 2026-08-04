import { CSSProperties } from 'react'

import { classification } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface ContentRatingProps {
    faixa?: string
}

export default function ContentRating({ faixa }: ContentRatingProps) {
    const normalizedRating = faixa
        ?.trim()
        .toLocaleUpperCase('pt-BR')

    if (!normalizedRating) return null

    const rating = classification.find(
        ({ etaria, label }) => (
            etaria.toLocaleUpperCase('pt-BR') === normalizedRating ||
            label === normalizedRating
        ),
    )

    if (!rating) return null

    const ratingDescription = rating.label === 'L'
        ? `Classificação indicativa livre. ${rating.msg}`
        : `Classificação indicativa de ${rating.label} anos. ${rating.msg}`

    const ratingStyle = {
        '--rating-background': rating.cor,
        '--rating-color': rating.textColor,
    } as CSSProperties

    return (
        <div
            className={styles.rating}
            style={ratingStyle}
            title={rating.msg}
            role="img"
            aria-label={ratingDescription}
        >
            <span aria-hidden="true">
                {rating.label}
            </span>
        </div>
    )
}
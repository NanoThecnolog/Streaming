import { CSSProperties } from 'react'

import styles from './styles.module.scss'

type TitleVariant = 'default' | 'potter'

interface TitleProps {
    title: string
    subtitle?: string
    color?: string
    variant?: TitleVariant
}

export default function Title({
    title,
    subtitle,
    color,
    variant,
}: TitleProps) {
    const normalizedTitle = title
        .trim()
        .toLocaleLowerCase('pt-BR')

    const selectedVariant: TitleVariant =
        variant ??
        (normalizedTitle === 'harry potter'
            ? 'potter'
            : 'default')

    const hasSubtitle = Boolean(subtitle?.trim())

    const containerStyle = color
        ? ({
            '--title-color': color,
        } as CSSProperties)
        : undefined

    return (
        <header
            className={styles.titleContainer}
            style={containerStyle}
        >
            <h1
                className={[
                    styles.title,
                    selectedVariant === 'potter'
                        ? styles.potterTitle
                        : '',
                ].filter(Boolean).join(' ')}
            >
                {title}
            </h1>

            {hasSubtitle && (
                <p
                    className={[
                        styles.subtitle,
                        selectedVariant === 'potter'
                            ? styles.potterSubtitle
                            : '',
                    ].filter(Boolean).join(' ')}
                >
                    {subtitle}
                </p>
            )}
        </header>
    )
}
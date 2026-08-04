import {
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import {
    FiChevronDown,
    FiChevronUp,
} from 'react-icons/fi'

import styles from './styles.module.scss'

interface OverviewProps {
    text?: string
}

export default function Overview({
    text,
}: OverviewProps) {
    const [expanded, setExpanded] = useState(false)
    const [canExpand, setCanExpand] = useState(false)

    const paragraphRef = useRef<HTMLParagraphElement>(null)
    const descriptionId = useId()

    const normalizedText = text?.trim()

    useEffect(() => {
        setExpanded(false)
    }, [text])

    useEffect(() => {
        const paragraph = paragraphRef.current

        if (!paragraph || expanded) return

        const checkOverflow = () => {
            const hasOverflow =
                paragraph.scrollHeight >
                paragraph.clientHeight + 1

            setCanExpand(hasOverflow)
        }

        const animationFrame =
            window.requestAnimationFrame(checkOverflow)

        const resizeObserver =
            typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(checkOverflow)
                : null

        resizeObserver?.observe(paragraph)

        return () => {
            window.cancelAnimationFrame(animationFrame)
            resizeObserver?.disconnect()
        }
    }, [normalizedText, expanded])

    if (!normalizedText) return null

    const handleToggle = () => {
        setExpanded(currentState => !currentState)
    }

    return (
        <section
            className={styles.descriptionContainer}
            aria-labelledby={`${descriptionId}-title`}
        >
            <h2
                id={`${descriptionId}-title`}
                className={styles.title}
            >
                Sinopse
            </h2>

            <p
                ref={paragraphRef}
                id={descriptionId}
                className={[
                    styles.description,
                    !expanded ? styles.collapsed : '',
                ].filter(Boolean).join(' ')}
            >
                {normalizedText}
            </p>

            {canExpand && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={handleToggle}
                    aria-expanded={expanded}
                    aria-controls={descriptionId}
                >
                    <span>
                        {expanded
                            ? 'Mostrar menos'
                            : 'Ler mais'}
                    </span>

                    {expanded
                        ? <FiChevronUp aria-hidden="true" />
                        : <FiChevronDown aria-hidden="true" />
                    }
                </button>
            )}
        </section>
    )
}
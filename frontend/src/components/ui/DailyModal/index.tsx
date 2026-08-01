import {
    MouseEvent,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import { FiAlertTriangle, FiCheck } from 'react-icons/fi'

import styles from './styles.module.scss'

interface DailyWarningModalProps {
    open: boolean
    onClose: () => void
}

const ANIMATION_DURATION = 200

const DailyWarningModal = ({
    open,
    onClose,
}: DailyWarningModalProps) => {
    const [isRendered, setIsRendered] = useState(open)
    const [isClosing, setIsClosing] = useState(false)

    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    )
    const actionButtonRef = useRef<HTMLButtonElement>(null)

    const titleId = useId()
    const descriptionId = useId()

    const clearCloseTimeout = () => {
        if (!closeTimeoutRef.current) return

        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
    }

    const handleClose = () => {
        if (isClosing) return

        setIsClosing(true)
        clearCloseTimeout()

        closeTimeoutRef.current = setTimeout(() => {
            setIsRendered(false)
            setIsClosing(false)
            onClose()
        }, ANIMATION_DURATION)
    }

    const handleOverlayClick = (
        event: MouseEvent<HTMLDivElement>,
    ) => {
        if (event.target !== event.currentTarget) return

        handleClose()
    }

    useEffect(() => {
        if (!open) return

        clearCloseTimeout()
        setIsRendered(true)
        setIsClosing(false)
    }, [open])

    useEffect(() => {
        if (!isRendered) return

        const previousOverflow = document.body.style.overflow

        document.body.style.overflow = 'hidden'
        actionButtonRef.current?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isRendered, isClosing])

    useEffect(() => {
        return clearCloseTimeout
    }, [])

    if (!isRendered) return null

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.closing : ''
                }`}
            role="presentation"
            onMouseDown={handleOverlayClick}
        >
            <section
                className={styles.modal}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div
                    className={styles.backgroundGlow}
                    aria-hidden="true"
                />

                <header className={styles.header}>
                    <span
                        className={styles.icon}
                        aria-hidden="true"
                    >
                        <FiAlertTriangle />
                    </span>

                    <div>
                        <span className={styles.eyebrow}>
                            Comunicado da FlixNext
                        </span>

                        <h2 id={titleId}>
                            Estamos melhorando nossa infraestrutura
                        </h2>
                    </div>
                </header>

                <div
                    id={descriptionId}
                    className={styles.content}
                >
                    <p>
                        Estamos migrando nossos serviços para uma nova
                        infraestrutura, com mais desempenho, estabilidade e
                        capacidade para ampliar o catálogo.
                    </p>

                    <div className={styles.notice}>
                        <strong>O que pode acontecer?</strong>

                        <p>
                            Alguns filmes, séries ou episódios podem ficar
                            temporariamente indisponíveis enquanto seus
                            arquivos são transferidos.
                        </p>
                    </div>

                    <p className={styles.message}>
                        O acesso será restabelecido gradualmente. Agradecemos
                        sua compreensão durante esse processo.
                    </p>
                </div>

                <footer className={styles.footer}>
                    <span>
                        Esta instabilidade é temporária.
                    </span>

                    <button
                        ref={actionButtonRef}
                        type="button"
                        onClick={handleClose}
                        disabled={isClosing}
                    >
                        <FiCheck aria-hidden="true" />
                        Entendi
                    </button>
                </footer>
            </section>
        </div>
    )
}

export default DailyWarningModal
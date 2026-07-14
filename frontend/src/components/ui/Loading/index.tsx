/*import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { text } from '@/utils/Variaveis'
import * as Spinners from 'react-spinners'

export default function Loading() {
    const [randomText, setRandomText] = useState<string>("")
    const [index, setIndex] = useState<number>(0)

    const shuffleStrings = (arr: string[]) => {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    useEffect(() => {
        let current = shuffleStrings(text)
        setRandomText(current[0])
        const timer = setInterval(() => {
            setIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex >= text.length) {
                    current = shuffleStrings(text)
                    //setShuffledTexts(current)
                    newIndex = 0
                }
                setRandomText(current[newIndex])
                return newIndex
            })
        }, 4000)

        return () => clearInterval(timer)
    }, [])
    return (
        <div className={styles.loadingContainer}>
            <div>
                <h1><span>Flix</span>Next</h1>
            </div>
            <div className={styles.spinner}>
                <Spinners.PacmanLoader
                    size={25}//15
                    color='#fff'
                    speedMultiplier={1}//0.6
                />
            </div>
            <div>
                {randomText &&
                    <h2 className={styles.randomText}>{randomText}</h2>
                }
            </div>
        </div>
    )
}*/

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { text } from '@/utils/Variaveis'

const shuffleStrings = (items: string[]) => {
    return [...items]
        .map((value) => ({
            value,
            sort: Math.random()
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

export default function Loading() {
    const [shuffledTexts, setShuffledTexts] = useState<string[]>(text)
    const [messageIndex, setMessageIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChangingMessage, setIsChangingMessage] = useState(false)

    const currentMessage =
        shuffledTexts[messageIndex] ?? 'Preparando sua experiência'

    useEffect(() => {
        setShuffledTexts(shuffleStrings(text))
    }, [])

    useEffect(() => {
        const progressTimer = window.setInterval(() => {
            setProgress((currentProgress) => {
                if (currentProgress >= 94) {
                    window.clearInterval(progressTimer)
                    return 94
                }

                const increment =
                    currentProgress < 40
                        ? Math.random() * 7
                        : currentProgress < 75
                            ? Math.random() * 4
                            : Math.random() * 1.5

                return Math.min(currentProgress + increment, 94)
            })
        }, 350)

        return () => {
            window.clearInterval(progressTimer)
        }
    }, [])

    useEffect(() => {
        if (shuffledTexts.length <= 1) return

        let transitionTimer: number | undefined

        const messageTimer = window.setInterval(() => {
            setIsChangingMessage(true)

            transitionTimer = window.setTimeout(() => {
                setMessageIndex((currentIndex) => {
                    const nextIndex = currentIndex + 1

                    if (nextIndex >= shuffledTexts.length) {
                        setShuffledTexts(shuffleStrings(text))
                        return 0
                    }

                    return nextIndex
                })

                setIsChangingMessage(false)
            }, 300)
        }, 4000)

        return () => {
            window.clearInterval(messageTimer)

            if (transitionTimer) {
                window.clearTimeout(transitionTimer)
            }
        }
    }, [shuffledTexts.length])

    return (
        <main
            className={styles.loadingContainer}
            aria-busy="true"
            aria-live="polite"
        >
            <div className={styles.background}>
                <div className={styles.light} />
                <div className={styles.noise} />
            </div>

            <section className={styles.content}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logo}>
                        <span>Flix</span>
                        Next
                    </h1>

                    <div
                        className={styles.logoReflection}
                        aria-hidden="true"
                    >
                        <span>Flix</span>
                        Next
                    </div>
                </div>

                <div className={styles.loader}>
                    <div className={styles.progressHeader}>
                        <span>Carregando</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>

                    <div className={styles.progressTrack}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${progress}%`
                            }}
                        >
                            <div className={styles.progressGlow} />
                        </div>
                    </div>
                </div>

                <div className={styles.messageContainer}>
                    <span className={styles.messageIndicator} />

                    <p
                        className={`${styles.message} ${isChangingMessage
                            ? styles.messageHidden
                            : ''
                            }`}
                    >
                        {currentMessage}
                    </p>
                </div>
            </section>

            <div className={styles.bottomLine} />
        </main>
    )
}
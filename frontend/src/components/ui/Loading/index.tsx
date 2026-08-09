import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { text } from '@/utils/Variaveis'

const shuffleStrings = (items: string[]) => {
  return [...items]
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function Loading() {
  const [shuffledTexts, setShuffledTexts] = useState<string[]>(text)
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChangingMessage, setIsChangingMessage] = useState(false)

  const currentMessage = shuffledTexts[messageIndex] ?? 'Preparando sua experiência'

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
    <main className={styles.loadingContainer} aria-busy="true" aria-live="polite">
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

          <div className={styles.logoReflection} aria-hidden="true">
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
                width: `${progress}%`,
              }}
            >
              <div className={styles.progressGlow} />
            </div>
          </div>
        </div>

        <div className={styles.messageContainer}>
          <span className={styles.messageIndicator} />

          <p className={`${styles.message} ${isChangingMessage ? styles.messageHidden : ''}`}>
            {currentMessage}
          </p>
        </div>
      </section>

      <div className={styles.bottomLine} />
    </main>
  )
}

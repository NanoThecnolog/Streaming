import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

const NavigationProgress = () => {
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(false)

    const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null)
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const clearTimers = () => {
            if (progressTimer.current) {
                clearInterval(progressTimer.current)
                progressTimer.current = null
            }

            if (hideTimer.current) {
                clearTimeout(hideTimer.current)
                hideTimer.current = null
            }
        }

        const handleStart = () => {
            clearTimers()

            setVisible(true)
            setProgress(12)

            progressTimer.current = setInterval(() => {
                setProgress(current => {
                    if (current >= 90) return current

                    const increment = Math.max((90 - current) * 0.1, 1)

                    return Math.min(current + increment, 90)
                })
            }, 150)
        }

        const handleComplete = () => {
            if (progressTimer.current) {
                clearInterval(progressTimer.current)
                progressTimer.current = null
            }

            setProgress(100)

            hideTimer.current = setTimeout(() => {
                setVisible(false)
                setProgress(0)
            }, 250)
        }

        Router.events.on('routeChangeStart', handleStart)
        Router.events.on('routeChangeComplete', handleComplete)
        Router.events.on('routeChangeError', handleComplete)

        return () => {
            clearTimers()

            Router.events.off('routeChangeStart', handleStart)
            Router.events.off('routeChangeComplete', handleComplete)
            Router.events.off('routeChangeError', handleComplete)
        }
    }, [])

    return (
        <div
            className={`${styles.container} ${visible ? styles.visible : ''
                }`}
            aria-hidden={!visible}
        >
            <div
                className={styles.progress}
                style={{
                    transform: `scaleX(${progress / 100})`,
                }}
            />
        </div>
    )
}

export default NavigationProgress
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { text } from '@/utils/Variaveis'

export default function Loading() {
    const [randomText, setRandomText] = useState<string>("")
    const [shuffledTexts, setShuffledTexts] = useState<string[]>([])
    const [index, setIndex] = useState<number>(0)

    const shuffleArray = (arr: string[]) => {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    useEffect(() => {
        let current = shuffleArray(text)
        setShuffledTexts(current)
        setRandomText(current[0])

        const timer = setInterval(() => {
            setIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex >= text.length) {
                    current = shuffleArray(text)
                    setShuffledTexts(current)
                    newIndex = 0
                }
                setRandomText(current[newIndex])
                return newIndex
            })
            //const shuffling = text[Math.floor(Math.random() * text.length)]
            //setRandomText(shuffling)

        }, 4000)

        return () => clearInterval(timer)
    }, [])
    return (
        <div className={styles.loadingContainer}>
            <div>
                <h1>Flix<span>Next</span></h1>
            </div>
            <div className={styles.spinner}></div>
            <div>
                <h2>{randomText}</h2>
            </div>
        </div>
    )
}
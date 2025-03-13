import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { text } from '@/utils/Variaveis'

export default function Loading() {
    const [randomText, setRandomText] = useState<string>("")
    //const [shuffledTexts, setShuffledTexts] = useState<string[]>([])
    const [index, setIndex] = useState<number>(0)

    const shuffleArray = (arr: string[]) => {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    useEffect(() => {
        let current = shuffleArray(text)
        setRandomText(current[0])
        const timer = setInterval(() => {
            setIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex >= text.length) {
                    current = shuffleArray(text)
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
            <div className={styles.spinner}></div>
            <div>
                {randomText &&
                    <h2 className={styles.randomText}>{randomText}</h2>
                }
            </div>
        </div>
    )
}
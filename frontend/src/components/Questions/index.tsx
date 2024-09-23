import { FAQ } from '@/pages/faq'
import styles from './styles.module.scss'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Questions({ question, answer }: FAQ) {
    const [ativo, setAtivo] = useState<boolean>(false)

    function handleButtonClick() {
        setAtivo(!ativo)

    }
    return (
        <div className={styles.container}>
            <div className={styles.question}>
                <h3>{question}</h3>
            </div>
            <div className={styles.icon} onClick={handleButtonClick}><ChevronDown size={30} /></div>
            <div className={`${styles.answer} ${ativo && styles.ativo}`}>
                <p>{answer}</p>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}
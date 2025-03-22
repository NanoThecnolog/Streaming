import { FAQ } from '@/pages/faq'
import styles from './styles.module.scss'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function Questions({ question, answer }: FAQ) {
    const [ativo, setAtivo] = useState<boolean>(false)

    function handleButtonClick() {
        setAtivo(!ativo)

    }
    return (
        <div className={styles.container} onClick={handleButtonClick}>
            <div className={styles.question}>
                <h3>{question}</h3>
            </div>
            <div className={styles.icon}>{ativo ? <ChevronUp size={30} /> : <ChevronDown size={30} />}</div>
            <div className={`${styles.answer} ${ativo && styles.ativo}`}>
                <p dangerouslySetInnerHTML={{ __html: answer }}></p>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}
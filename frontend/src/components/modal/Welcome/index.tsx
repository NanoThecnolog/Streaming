import { X } from 'lucide-react'
import styles from './styles.module.scss'

export default function WelcomeModal() {
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.content}>
                <X size={35} />
                <div className={styles.brandContainer}>
                    <h1>
                        <span className={styles.red}>Flix</span>
                        <span className={styles.white}>Next</span>
                    </h1>
                </div>
                <div>
                    <h2>Bem Vindo a nossa Plataforma</h2>
                </div>
                <div>
                    <h4>Torne-se um membro doador da comunidade FlixNext</h4>
                </div>
            </div>
        </section>
    )
}
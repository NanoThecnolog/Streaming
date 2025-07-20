import { faqPlans } from '@/utils/Variaveis'
import styles from './styles.module.scss'
import Questions from '@/components/Questions'


export default function PromoFAQ() {
    return (
        <section className={styles.faqContainer}>
            <div className={styles.faq}>
                <div className={styles.title}>
                    <h1>perguntas frequentes</h1>
                </div>
                <div className={styles.questionsContainer}>
                    {faqPlans.map((item, index) => (
                        <Questions
                            key={index}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
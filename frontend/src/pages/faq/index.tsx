import Questions from '@/components/Questions'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import { faq } from '@/utils/Variaveis'

export interface FAQ {
    question: string,
    answer: string
}

export default function FAQ() {


    return (
        <>
            <SEO title='FAQ | FlixNext' description='Perguntas frequêntes dos nossos usuários' />
            <Header />
            <section className={styles.container}>
                <div className={styles.faqContainer}>
                    <div className={styles.title}>
                        <h1>{"perguntas frequentes - faq".toUpperCase()}</h1>
                    </div>
                    <div className={styles.questionsContainer}>
                        {faq.map((item, index) => (
                            <Questions
                                key={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
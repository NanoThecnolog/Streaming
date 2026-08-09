import { FiHelpCircle } from 'react-icons/fi'

import Questions from '@/components/Questions'
import { faqPlans } from '@/utils/Variaveis'

import styles from './styles.module.scss'

const PromoFAQ = () => {
  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <FiHelpCircle aria-hidden="true" />
            Tire suas dúvidas
          </span>

          <h2 id="faq-title">Perguntas frequentes</h2>

          <p>
            Encontre respostas sobre os planos, pagamentos, acesso à plataforma e funcionamento da
            FlixNext.
          </p>
        </header>

        <div className={styles.questions}>
          {faqPlans.map((item) => (
            <Questions key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

        <footer className={styles.footer}>
          <span>Não encontrou o que procurava?</span>

          <a href="mailto:contato@flixnext.com.br">Entre em contato com o suporte</a>
        </footer>
      </div>
    </section>
  )
}

export default PromoFAQ

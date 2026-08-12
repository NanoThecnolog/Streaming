import Link from 'next/link'
import { ArrowRight, Clock3, HelpCircle, Mail, MessageCircleMore } from 'lucide-react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Questions from '@/components/Questions'
import SEO from '@/components/SEO'
import { faq } from '@/utils/Variaveis'

import styles from './styles.module.scss'

const SUPPORT_EMAIL = 'suporte@flixnext.com.br'

export default function Suport() {
  return (
    <>
      <SEO
        title="Suporte | FlixNext"
        description="Acesse o suporte da FlixNext para encontrar respostas e ajuda com sua conta, assinatura e reprodução de conteúdos."
      />

      <Header />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="support-title">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Central de ajuda</span>

            <h1 id="support-title">Como podemos ajudar?</h1>

            <p className={styles.description}>
              Encontre respostas para as dúvidas mais comuns ou fale diretamente com a nossa equipe
              de suporte.
            </p>

            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <MessageCircleMore size={28} aria-hidden="true" />
              </div>

              <div className={styles.supportContent}>
                <span className={styles.supportLabel}>Fale com o suporte</span>

                <h2>Precisa de atendimento?</h2>

                <p>Descreva o problema e, se possível, informe o e-mail cadastrado na sua conta.</p>

                <div className={styles.supportDetails}>
                  <div>
                    <Mail size={17} aria-hidden="true" />

                    <span>{SUPPORT_EMAIL}</span>
                  </div>

                  <div>
                    <Clock3 size={17} aria-hidden="true" />

                    <span>Responderemos assim que possível</span>
                  </div>
                </div>
              </div>

              <Link
                href={`mailto:${SUPPORT_EMAIL}?subject=Suporte FlixNext`}
                className={styles.contactButton}
              >
                Enviar e-mail
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <p className={styles.contactHint}>
              Para agilizar o atendimento, inclua detalhes sobre o erro e o dispositivo utilizado.
            </p>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <header className={styles.faqHeader}>
            <div className={styles.faqIcon}>
              <HelpCircle size={25} aria-hidden="true" />
            </div>

            <div>
              <span className={styles.eyebrow}>Tire suas dúvidas</span>

              <h2 id="faq-title">Perguntas frequentes</h2>

              <p>Consulte as respostas antes de entrar em contato com o suporte.</p>
            </div>
          </header>

          <div className={styles.questionsContainer}>
            {faq.map((item, index) => (
              <Questions
                key={`${item.question}-${index}`}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

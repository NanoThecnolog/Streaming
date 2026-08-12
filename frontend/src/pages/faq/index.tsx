import Link from 'next/link'
import { ArrowRight, CircleHelp, Headphones, Mail } from 'lucide-react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Questions from '@/components/Questions'
import SEO from '@/components/SEO'
import { faq } from '@/utils/Variaveis'

import styles from './styles.module.scss'

export interface FAQ {
  question: string
  answer: string
}

const SUPPORT_EMAIL = 'suporte@flixnext.com.br'

export default function FAQ() {
  return (
    <>
      <SEO
        title="Perguntas frequentes | FlixNext"
        description="Tire suas dúvidas sobre planos, pagamentos, acesso e como assistir filmes e séries na plataforma FlixNext."
      />

      <Header />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="faq-title">
          <div className={styles.heroIcon}>
            <CircleHelp size={32} aria-hidden="true" />
          </div>

          <span className={styles.eyebrow}>Central de ajuda</span>

          <h1 id="faq-title">Perguntas frequentes</h1>

          <p>
            Encontre respostas rápidas para as principais dúvidas sobre sua conta, assinatura,
            pagamentos e uso da FlixNext.
          </p>
        </section>

        <section className={styles.faqSection} aria-label="Lista de perguntas frequentes">
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Tire suas dúvidas</span>

              <h2>Como podemos ajudar?</h2>
            </div>

            <span className={styles.questionCount}>
              {faq.length} {faq.length === 1 ? 'pergunta' : 'perguntas'}
            </span>
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

        <section className={styles.supportCard} aria-labelledby="support-title">
          <div className={styles.supportIcon}>
            <Headphones size={26} aria-hidden="true" />
          </div>

          <div className={styles.supportContent}>
            <span className={styles.supportLabel}>Atendimento</span>

            <h2 id="support-title">Não encontrou sua resposta?</h2>

            <p>Entre em contato com o suporte e descreva sua dúvida ou problema.</p>
          </div>

          <div className={styles.supportActions}>
            <Link href="/suporte" className={styles.secondaryButton}>
              Central de suporte
            </Link>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Suporte FlixNext`}
              className={styles.contactButton}
            >
              <Mail size={17} aria-hidden="true" />
              Enviar e-mail
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

import Head from 'next/head'
import styles from '../styles.module.scss'
import Link from 'next/link'
import { useFlix } from '@/contexts/FlixContext'

export default function SuccessCreditPage() {
  const { user } = useFlix()
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Pagamento confirmado!</h1>

          <p className={styles.thanks}>Obrigado pelo seu apoio!</p>

          <p className={styles.info}>
            Seu pagamento foi processado com sucesso.
            <br />A cobrança foi realizada e sua assinatura já está ativa.
          </p>

          <div className={styles.section}>
            <h3>Detalhes do pagamento</h3>

            <p className={styles.paymentInfo}>
              • Forma de pagamento: <strong>Cartão de crédito</strong>
              <br />• Modalidade: <strong>À vista</strong>
              <br />• Status: <strong className={styles.success}>Aprovado</strong>
            </p>
          </div>

          <div className={styles.section}>
            <p>
              Você receberá um e-mail com:
              <br />• A confirmação do pagamento
              <br />• Os detalhes da assinatura
              <br />• O link para acessar sua conta, caso ainda não esteja logado
            </p>
          </div>

          <div className={styles.section}>
            <p>
              Em caso de dúvidas, entre em contato através do e-mail:{' '}
              <strong className="red">suporte@flixnext.com.br</strong>
            </p>
          </div>

          <div className={styles.links}>
            {user ? <Link href="/me">Minha conta</Link> : <Link href="/login">Entrar</Link>}
            <Link href="/termos-de-uso">Termos de uso</Link>
            <Link href="/privacidade">Política de privacidade</Link>
            <Link href="/suporte">Suporte</Link>
          </div>
        </div>
      </main>
    </>
  )
}

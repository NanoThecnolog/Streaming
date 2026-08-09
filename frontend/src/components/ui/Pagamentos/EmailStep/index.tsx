import { ChangeEvent, FormEvent } from 'react'

import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { Payments } from '@/classes/Payments'
import { debug } from '@/classes/DebugLogger'

interface EmailStepProps {
  email: string
  onEmailChange: (email: string) => void
  onContinue: () => void
}

export function EmailStep({ email, onEmailChange, onContinue }: EmailStepProps) {
  const pagamentos = new Payments()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) return

    try {
      const hasEmail = await pagamentos.verificarEmail(email)
      if (hasEmail.result) {
        toast.warning('Este Email já está vinculado a uma conta! Faça login para continuar.')
        return
      }
    } catch (err) {
      debug.log('Erro ao verificar existencia de email')
    }

    onContinue()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value)
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Comece sua assinatura</span>

        <h1>Qual é o seu e-mail?</h1>

        <p>Vamos verificar se já existe uma conta ou uma assinatura pendente associada a ele.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>

        <div className={styles.inputWrapper}>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="voce@exemplo.com"
            autoComplete="email"
            required
          />
        </div>

        <button type="submit" disabled={!email.trim()}>
          Continuar
        </button>
      </form>

      <div className={styles.login}>
        <span>Já possui uma conta?</span>

        <a href="/login">Entrar</a>
      </div>

      <div className={styles.information}>
        <span>i</span>

        <p>Seu e-mail também será usado para enviar a confirmação do pagamento.</p>
      </div>
    </section>
  )
}

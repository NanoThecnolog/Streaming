import { FormEvent, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import SEO from '@/components/SEO'
import { SetupAPIClient } from '@/services/api'

import styles from './styles.module.scss'

const MIN_PASSWORD_LENGTH = 8

interface RecoverErrorResponse {
  error?: string
  message?: string
}

export default function RecoverPage() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const token = useMemo(() => {
    if (!isMounted || !router.isReady) return null

    const tokenQuery = router.query.token

    if (Array.isArray(tokenQuery)) {
      return tokenQuery[0] ?? null
    }

    return tokenQuery ?? null
  }, [isMounted, router.isReady, router.query.token])

  const passwordRules = {
    minimumLength: password.length >= MIN_PASSWORD_LENGTH,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  }

  const passwordIsValid = Object.values(passwordRules).every(Boolean)

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  const canSubmit = Boolean(token) && passwordIsValid && passwordsMatch && !loading

  const changePassword = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!token) {
      toast.error('O link de recuperação é inválido.')
      return
    }

    if (!passwordIsValid) {
      toast.error('A senha não atende aos requisitos.')
      return
    }

    if (!passwordsMatch) {
      toast.error('As senhas não correspondem.')
      return
    }

    setLoading(true)

    try {
      const client = new SetupAPIClient()

      await client.api.put('/recover', {
        token,
        password,
      })

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')

      toast.success('Senha alterada com sucesso!')
    } catch (error: unknown) {
      console.error('Erro ao alterar a senha:', error)

      if (isAxiosError<RecoverErrorResponse>(error)) {
        const errorMessage = error.response?.data?.error ?? error.response?.data?.message

        toast.error(errorMessage ?? 'Não foi possível alterar a senha. Tente novamente.')

        return
      }

      toast.error('Não foi possível alterar a senha. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (): void => {
    router.push('/login')
  }

  const handleRequestNewLink = (): void => {
    router.push('/forgot-password')
  }

  if (!isMounted || !router.isReady) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <SEO
          title="Recuperação de senha | FlixNext"
          description="Defina uma nova senha para sua conta FlixNext."
        />

        <main className={styles.page}>
          <section className={styles.feedback} aria-live="polite">
            <LoaderCircle className={styles.spinner} size={34} aria-hidden="true" />

            <strong>Validando seu link</strong>

            <p>Aguarde um instante.</p>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <SEO
        title="Recuperação de senha | FlixNext"
        description="Defina uma nova senha para sua conta FlixNext."
      />

      <main className={styles.page}>
        <div className={styles.background} aria-hidden="true" />

        <section className={styles.card} aria-labelledby="recover-title">
          {success ? (
            <div className={styles.success} aria-live="polite">
              <div className={styles.successIcon}>
                <CheckCircle2 size={36} aria-hidden="true" />
              </div>

              <span className={styles.eyebrow}>Alteração concluída</span>

              <h1 id="recover-title">Sua senha foi alterada</h1>

              <p>Você já pode entrar na sua conta utilizando a nova senha.</p>

              <button type="button" className={styles.primaryButton} onClick={handleLogin}>
                Fazer login
              </button>
            </div>
          ) : !token ? (
            <div className={styles.invalidToken}>
              <div className={styles.invalidIcon}>
                <KeyRound size={34} aria-hidden="true" />
              </div>

              <span className={styles.eyebrow}>Link indisponível</span>

              <h1 id="recover-title">Link inválido ou expirado</h1>

              <p>Solicite um novo link de recuperação para continuar com segurança.</p>

              <button type="button" className={styles.primaryButton} onClick={handleRequestNewLink}>
                Solicitar novo link
              </button>

              <button type="button" className={styles.secondaryButton} onClick={handleLogin}>
                Voltar para o login
              </button>
            </div>
          ) : (
            <>
              <header className={styles.header}>
                <div className={styles.headerIcon}>
                  <LockKeyhole size={28} aria-hidden="true" />
                </div>

                <span className={styles.eyebrow}>Recuperação de conta</span>

                <h1 id="recover-title">Crie uma nova senha</h1>

                <p>Escolha uma senha segura e diferente das utilizadas anteriormente.</p>
              </header>

              <form className={styles.form} onSubmit={changePassword} noValidate>
                <div className={styles.field}>
                  <label htmlFor="password">Nova senha</label>

                  <div className={styles.passwordInput}>
                    <LockKeyhole size={18} aria-hidden="true" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      placeholder="Digite a nova senha"
                      autoComplete="new-password"
                      minLength={MIN_PASSWORD_LENGTH}
                      required
                      onChange={(event) => setPassword(event.target.value)}
                    />

                    <button
                      type="button"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? (
                        <EyeOff size={19} aria-hidden="true" />
                      ) : (
                        <Eye size={19} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="confirm-password">Confirme a nova senha</label>

                  <div
                    className={`${styles.passwordInput} ${
                      confirmPassword && !passwordsMatch ? styles.inputError : ''
                    }`}
                  >
                    <LockKeyhole size={18} aria-hidden="true" />

                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      placeholder="Digite a senha novamente"
                      autoComplete="new-password"
                      required
                      aria-invalid={confirmPassword.length > 0 && !passwordsMatch}
                      aria-describedby="password-match"
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword ? 'Ocultar confirmação' : 'Mostrar confirmação'
                      }
                      aria-pressed={showConfirmPassword}
                      onClick={() => setShowConfirmPassword((current) => !current)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} aria-hidden="true" />
                      ) : (
                        <Eye size={19} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {confirmPassword && (
                    <span
                      id="password-match"
                      className={passwordsMatch ? styles.matchSuccess : styles.matchError}
                    >
                      {passwordsMatch ? 'As senhas correspondem' : 'As senhas não correspondem'}
                    </span>
                  )}
                </div>

                <div className={styles.requirements}>
                  <strong>Sua senha deve possuir:</strong>

                  <ul>
                    <li className={passwordRules.minimumLength ? styles.validRule : ''}>
                      <Check size={14} aria-hidden="true" />
                      Pelo menos 8 caracteres
                    </li>

                    <li className={passwordRules.hasLetter ? styles.validRule : ''}>
                      <Check size={14} aria-hidden="true" />
                      Pelo menos uma letra
                    </li>

                    <li className={passwordRules.hasNumber ? styles.validRule : ''}>
                      <Check size={14} aria-hidden="true" />
                      Pelo menos um número
                    </li>
                  </ul>
                </div>

                <button type="submit" className={styles.primaryButton} disabled={!canSubmit}>
                  {loading ? (
                    <>
                      <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />
                      Alterando senha...
                    </>
                  ) : (
                    'Alterar senha'
                  )}
                </button>
              </form>

              <footer className={styles.security}>
                <ShieldCheck size={17} aria-hidden="true" />

                <span>Sua senha será enviada por uma conexão segura.</span>
              </footer>
            </>
          )}
        </section>
      </main>
    </>
  )
}

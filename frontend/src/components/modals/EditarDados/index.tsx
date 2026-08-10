import axios, { AxiosError } from 'axios'
import { FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import { Check, Eye, EyeOff, UserRound, X } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa6'
import { destroyCookie, setCookie } from 'nookies'
import { toast } from '@/components/ui/Notifications'

import { UserContext, UserCookiesProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import { cookieOptions } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface EditarDadosProps {
  handleClose: () => void
}

interface UpdateUserPayload {
  name?: string
  password?: string
}

interface ApiErrorResponse {
  message?: string
}

interface PasswordRuleProps {
  valid: boolean
  label: string
}

const PasswordRule = ({ valid, label }: PasswordRuleProps) => {
  return (
    <li className={valid ? styles.valid : undefined}>
      <span aria-hidden="true">{valid ? <Check size={15} /> : <X size={15} />}</span>

      {label}
    </li>
  )
}

export default function EditarDados({ handleClose }: EditarDadosProps) {
  const { user, setUser } = useFlix()

  const [name, setName] = useState('')
  //const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const originalName = user?.name?.trim() ?? ''
  //const originalBirthday = formatBirthdayForInput(user?.birthday)

  useEffect(() => {
    if (!user) return

    setName(originalName)
    //setBirthday(originalBirthday)
  }, [user, originalName])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !loading) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose, loading])

  const trimmedName = name.trim()
  const hasNameChanged = trimmedName !== originalName
  //const hasBirthdayChanged = birthday !== originalBirthday
  const hasPasswordChanged = password.length > 0

  const hasChanges = hasNameChanged || hasPasswordChanged

  const passwordRules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    passwordsMatch:
      password.length > 0 && confirmPassword.length > 0 && password === confirmPassword,
  }

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasUppercase &&
    passwordRules.hasLowercase &&
    passwordRules.hasNumber &&
    passwordRules.passwordsMatch

  const passwordIsValid = !hasPasswordChanged || isPasswordValid

  const canSubmit = useMemo(() => {
    if (loading || !hasChanges) return false
    if (trimmedName.length < 3) return false

    return passwordIsValid
  }, [hasChanges, loading, passwordIsValid, trimmedName])

  const updateUserCookie = (updatedUser: UserContext): void => {
    const userCookie: UserCookiesProps = {
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      verified: updatedUser.verified,
      news: updatedUser.news,
      createdAt: updatedUser.createdAt,
      subscription: updatedUser.subscription,
      donator: updatedUser.donator,
    }

    destroyCookie(null, 'flix-user')

    setCookie(null, 'flix-user', JSON.stringify(userCookie), cookieOptions)
  }

  const getUpdatePayload = (): UpdateUserPayload => {
    return {
      ...(hasNameChanged && {
        name: trimmedName,
      }),
      ...(hasPasswordChanged && {
        password,
      }),
    }
  }

  const handleDados = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!user) {
      toast.error('Dados do usuário indisponíveis.')
      return
    }

    if (trimmedName.length < 3) {
      toast.warning('Informe um nome válido.')
      return
    }

    if (hasPasswordChanged && !isPasswordValid) {
      toast.warning('A nova senha não atende a todos os requisitos.')

      return
    }

    if (!hasChanges) {
      toast.info('Nenhuma alteração foi realizada.')
      return
    }

    try {
      setLoading(true)

      await axios.put('/api/user/update', getUpdatePayload())

      const { data: updatedUser } = await axios.get<UserContext>('/api/user')

      setUser(updatedUser)
      updateUserCookie(updatedUser)

      toast.success('Dados alterados com sucesso.')
      handleClose()
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      console.error('Erro ao alterar dados:', error)

      toast.error(axiosError.response?.data?.message ?? 'Erro ao alterar seus dados.')
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget && !loading) {
      handleClose()
    }
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={handleOverlayClick}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-data-title"
      >
        <header className={styles.header}>
          <div className={styles.titleContainer}>
            <span className={styles.icon}>
              <UserRound size={22} />
            </span>

            <div>
              <span className={styles.eyebrow}>Minha conta</span>

              <h2 id="edit-data-title">Editar dados</h2>

              <p>Atualize suas informações pessoais ou altere sua senha.</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fechar modal"
            disabled={loading}
            onClick={handleClose}
          >
            <X size={22} />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleDados}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Dados pessoais</h3>

              <p>Informações utilizadas na sua conta.</p>
            </div>

            <div className={styles.fields}>
              <label className={styles.field}>
                <span>Nome completo</span>

                <input
                  type="text"
                  value={name}
                  autoComplete="name"
                  placeholder="Informe seu nome"
                  disabled={loading}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Alterar senha</h3>

              <p>Deixe os campos vazios para manter sua senha atual.</p>
            </div>

            <div className={`${styles.fields} ${styles.passwordFields}`}>
              <label className={styles.field}>
                <span>Nova senha</span>

                <div className={styles.passwordInput}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Mínimo de 8 caracteres"
                    disabled={loading}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </label>

              <label className={styles.field}>
                <span>Confirmar nova senha</span>

                <div className={styles.passwordInput}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    autoComplete="new-password"
                    placeholder="Repita a nova senha"
                    disabled={loading}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <small className={styles.error}>As senhas não coincidem.</small>
                )}
              </label>
            </div>
            {hasPasswordChanged && (
              <div className={styles.passwordChecker} aria-live="polite">
                <p>Sua nova senha deve possuir:</p>

                <ul>
                  <PasswordRule valid={passwordRules.minLength} label="Pelo menos 8 caracteres" />

                  <PasswordRule valid={passwordRules.hasUppercase} label="Uma letra maiúscula" />

                  <PasswordRule valid={passwordRules.hasLowercase} label="Uma letra minúscula" />

                  <PasswordRule valid={passwordRules.hasNumber} label="Um número" />

                  <PasswordRule valid={passwordRules.passwordsMatch} label="Senhas iguais" />
                </ul>
              </div>
            )}
          </div>

          <footer className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              disabled={loading}
              onClick={handleClose}
            >
              Cancelar
            </button>

            <button type="submit" className={styles.submitButton} disabled={!canSubmit}>
              {loading ? (
                <>
                  <FaSpinner className={styles.spinner} size={17} />
                  Salvando...
                </>
              ) : (
                'Salvar alterações'
              )}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

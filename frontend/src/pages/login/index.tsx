import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {
  Eye,
  EyeOff,
  Laptop,
  LockKeyhole,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  X,
} from 'lucide-react'
import { FaSpinner } from 'react-icons/fa'
import axios, { isAxiosError } from 'axios'
import { DeviceVerificationRequired, ProfileProps } from '@/@types/user'
import { toast } from '@/components/ui/Notifications'

import ForgetPass from '@/components/modals/ForgetPassword'
import ProfileManager from '@/components/modals/ProfileManager'
import SEO from '@/components/SEO'
import { useFlix } from '@/contexts/FlixContext'

import styles from './styles.module.scss'

interface LoginCredentials {
  email: string
  password: string
}

interface ReplacementDevice {
  id: string
  name: string
  lastSeenAt: string
}

interface DeviceLimitResponse {
  code: 'DEVICE_LIMIT_REACHED'
  limit: number
  devices: ReplacementDevice[]
}

export default function Login() {
  const { signIn, completeLogin, cancelPendingLogin } = useFlix()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [replacementDevices, setReplacementDevices] = useState<ReplacementDevice[]>([])
  const [deviceLimit, setDeviceLimit] = useState(0)
  const [replacingId, setReplacingId] = useState<string | null>(null)
  const [verification, setVerification] = useState<DeviceVerificationRequired | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [showProfileManager, setShowProfileManager] = useState(false)
  const pendingSelectionRef = useRef(false)
  const committedRef = useRef(false)

  const normalizedEmail = email.trim().toLowerCase()

  const canSubmit = useMemo(() => {
    return normalizedEmail.length > 0 && password.length > 0 && !loading
  }, [loading, normalizedEmail, password])

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!canSubmit) return

    const credentials: LoginCredentials = {
      email: normalizedEmail,
      password,
    }
    try {
      setLoading(true)
      const result = await signIn(credentials)
      if (result && 'verificationRequired' in result) {
        setVerification(result)
        setResendIn(result.resendAfterSeconds)
      } else if (result && 'profileSelectionRequired' in result) {
        pendingSelectionRef.current = true
        committedRef.current = false
        setShowProfileManager(true)
      }
    } catch (error) {
      if (isAxiosError<DeviceLimitResponse>(error) && error.response?.data.code) {
        setReplacementDevices(error.response.data.devices)
        setDeviceLimit(error.response.data.limit)
        return
      }
      console.error('Erro ao realizar login.')
    } finally {
      setLoading(false)
    }
  }

  const replaceDevice = async (deviceId: string): Promise<void> => {
    if (replacingId) return
    setReplacingId(deviceId)

    try {
      const result = await signIn({ email: normalizedEmail, password, replaceDeviceId: deviceId })
      if (result && 'verificationRequired' in result) {
        setReplacementDevices([])
        setVerification(result)
        setResendIn(result.resendAfterSeconds)
      } else if (result && 'profileSelectionRequired' in result) {
        setReplacementDevices([])
        pendingSelectionRef.current = true
        committedRef.current = false
        setShowProfileManager(true)
      }
    } finally {
      setReplacingId(null)
    }
  }

  useEffect(() => {
    if (!verification || resendIn <= 0) return
    const timer = window.setInterval(() => setResendIn((current) => Math.max(current - 1, 0)), 1000)
    return () => window.clearInterval(timer)
  }, [resendIn, verification])

  const verifyDevice = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!verification || !/^\d{6}$/.test(verificationCode) || verifying) return
    setVerifying(true)

    try {
      await axios.post('/api/login/device/verify', {
        challengeId: verification.challengeId,
        code: verificationCode,
      })
      // Após verificação bem-sucedida, exibir Profile Manager
      // em vez de redirecionar (evita que usuário digite credenciais novamente)
      setShowProfileManager(true)
      setVerification(null)
      setVerificationCode('')
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : 'Não foi possível confirmar o dispositivo.'
      toast.error(message ?? 'Não foi possível confirmar o dispositivo.')
    } finally {
      setVerifying(false)
    }
  }

  const resendCode = async (): Promise<void> => {
    if (!verification || resendIn > 0) return

    try {
      const { data } = await axios.post<Pick<DeviceVerificationRequired, 'resendAfterSeconds'>>(
        '/api/login/device/resend',
        { challengeId: verification.challengeId },
      )
      setResendIn(data.resendAfterSeconds)
      toast.success('Um novo código foi enviado.')
    } catch (error) {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined
      toast.error(message ?? 'Não foi possível reenviar o código.')
    }
  }

  useEffect(() => {
    if (!showProfileManager) return

    const revokePending = () => {
      if (committedRef.current) return
      pendingSelectionRef.current = false
      setShowProfileManager(false)
      void cancelPendingLogin()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') revokePending()
    }

    const handleRouteChange = () => {
      if (pendingSelectionRef.current && !committedRef.current) revokePending()
    }

    const handlePageHide = () => {
      if (pendingSelectionRef.current && !committedRef.current) {
        fetch('/api/user/logout', { method: 'POST', keepalive: true }).catch(() => {})
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    Router.events.on('routeChangeStart', handleRouteChange)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      Router.events.off('routeChangeStart', handleRouteChange)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [cancelPendingLogin, showProfileManager])

  const handleProfileSelect = (profile: ProfileProps) => {
    if (committedRef.current) return
    committedRef.current = true
    pendingSelectionRef.current = false
    completeLogin(profile)
    toast.success(`Bem-vindo(a), ${profile.name}!`)
    Router.push('/')
  }

  return (
    <>
      <SEO
        title="Login | FlixNext"
        description="Entre na sua conta FlixNext e continue assistindo aos seus conteúdos."
      />

      <main className={styles.page}>
        <div className={styles.backgroundOverlay} />

        <section className={styles.loginCard} aria-labelledby="login-title">
          <header className={styles.header}>
            <Link href="/" className={styles.logo} aria-label="Ir para a página inicial">
              <span>FLIX</span>
              <strong>NEXT</strong>
            </Link>

            <div className={styles.heading}>
              <span className={styles.eyebrow}>Bem-vindo</span>

              <h1 id="login-title">Acesse sua conta</h1>

              <p>Entre para continuar de onde parou.</p>
            </div>
          </header>

          <form className={styles.form} onSubmit={handleLogin}>
            <label className={styles.field}>
              <span>E-mail</span>

              <div className={styles.inputContainer}>
                <Mail size={19} aria-hidden="true" />

                <input
                  type="email"
                  value={email}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  inputMode="email"
                  disabled={loading}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </label>

            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <label>Senha</label>

                <button
                  type="button"
                  className={styles.forgotPassword}
                  disabled={loading}
                  onClick={() => setModalVisible(true)}
                >
                  Esqueceu a senha?
                </button>
              </div>

              <div className={styles.inputContainer}>
                <LockKeyhole size={19} aria-hidden="true" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                  onChange={(event) => {
                    ;(event.stopPropagation(), setPassword(event.target.value))
                  }}
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                  disabled={loading}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={!canSubmit}>
              {loading ? (
                <>
                  <FaSpinner size={17} className={styles.spinner} />
                  Entrando...
                </>
              ) : (
                'Acessar'
              )}
            </button>
          </form>

          <footer className={styles.footer}>
            <span>Ainda não possui uma conta?</span>

            <Link href="/planos">Conheça nossos planos</Link>
          </footer>
        </section>
      </main>

      {modalVisible && <ForgetPass handleClose={() => setModalVisible(false)} />}

      {showProfileManager && <ProfileManager onSelect={handleProfileSelect} requireSelection={true} />}

      {replacementDevices.length > 0 && (
        <div className={styles.deviceLimitOverlay} role="dialog" aria-modal="true">
          <section className={styles.deviceLimitModal} aria-labelledby="device-limit-title">
            <button
              type="button"
              className={styles.closeDeviceModal}
              onClick={() => setReplacementDevices([])}
              aria-label="Fechar"
              disabled={Boolean(replacingId)}
            >
              <X size={20} />
            </button>

            <div className={styles.deviceLimitIcon}>
              <MonitorSmartphone size={28} />
            </div>

            <h2 id="device-limit-title">Limite de dispositivos atingido</h2>
            <p>
              Sua conta permite até {deviceLimit} dispositivos. Escolha qual aparelho deseja
              desconectar para continuar neste dispositivo.
            </p>

            <div className={styles.replacementList}>
              {replacementDevices.map((device) => (
                <button
                  type="button"
                  key={device.id}
                  onClick={() => replaceDevice(device.id)}
                  disabled={Boolean(replacingId)}
                >
                  <Laptop size={21} />

                  <span>
                    <strong>{device.name}</strong>
                    <small>
                      Última atividade:{' '}
                      {new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(device.lastSeenAt))}
                    </small>
                  </span>

                  {replacingId === device.id ? (
                    <FaSpinner size={17} className={styles.spinner} />
                  ) : (
                    <span className={styles.replaceLabel}>Substituir</span>
                  )}
                </button>
              ))}
            </div>

            <small className={styles.deviceLimitNotice}>
              O aparelho escolhido perderá o acesso e precisará entrar novamente.
            </small>
          </section>
        </div>
      )}

      {verification && (
        <div className={styles.deviceLimitOverlay} role="dialog" aria-modal="true">
          <section className={styles.verificationModal} aria-labelledby="verification-title">
            <button
              type="button"
              className={styles.closeDeviceModal}
              onClick={() => setVerification(null)}
              aria-label="Fechar"
              disabled={verifying}
            >
              <X size={20} />
            </button>

            <div className={styles.verificationIcon}>
              <ShieldCheck size={29} />
            </div>

            <h2 id="verification-title">Confirme este dispositivo</h2>
            <p>
              Enviamos um código de seis dígitos para <strong>{verification.maskedEmail}</strong>.
            </p>

            <form onSubmit={verifyDevice}>
              <label htmlFor="device-code">Código de confirmação</label>
              <input
                id="device-code"
                type="text"
                value={verificationCode}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                autoFocus
                disabled={verifying}
                onChange={(event) =>
                  setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                }
              />

              <button type="submit" disabled={verificationCode.length !== 6 || verifying}>
                {verifying ? <FaSpinner size={17} className={styles.spinner} /> : null}
                {verifying ? 'Confirmando...' : 'Confirmar dispositivo'}
              </button>
            </form>

            <button
              type="button"
              className={styles.resendButton}
              onClick={resendCode}
              disabled={resendIn > 0 || verifying}
            >
              {resendIn > 0 ? `Reenviar código em ${resendIn}s` : 'Reenviar código'}
            </button>

            <small>O código expira em 10 minutos e pode ser tentado até cinco vezes.</small>
          </section>
        </div>
      )}
    </>
  )
}

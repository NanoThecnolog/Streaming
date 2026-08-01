import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa'

import ForgetPass from '@/components/modals/ForgetPassword'
import SEO from '@/components/SEO'
import { useFlix } from '@/contexts/FlixContext'

import styles from './styles.module.scss'

interface LoginCredentials {
    email: string
    password: string
}

export default function Login() {
    const { signIn } = useFlix()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const normalizedEmail = email.trim().toLowerCase()

    const canSubmit = useMemo(() => {
        return (
            normalizedEmail.length > 0 &&
            password.length > 0 &&
            !loading
        )
    }, [loading, normalizedEmail, password])

    const handleLogin = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault()

        if (!canSubmit) return

        const credentials: LoginCredentials = {
            email: normalizedEmail,
            password,
        }

        try {
            setLoading(true)
            await signIn(credentials)
        } catch (error) {
            console.error('Erro ao realizar login:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO
                title="Login | FlixNext"
                description="Entre na sua conta FlixNext e continue assistindo aos seus conteúdos."
            />

            <main className={styles.page}>
                <div className={styles.backgroundOverlay} />

                <section
                    className={styles.loginCard}
                    aria-labelledby="login-title"
                >
                    <header className={styles.header}>
                        <Link
                            href="/"
                            className={styles.logo}
                            aria-label="Ir para a página inicial"
                        >
                            <span>FLIX</span>
                            <strong>NEXT</strong>
                        </Link>

                        <div className={styles.heading}>
                            <span className={styles.eyebrow}>
                                Bem-vindo
                            </span>

                            <h1 id="login-title">
                                Acesse sua conta
                            </h1>

                            <p>
                                Entre para continuar de onde parou.
                            </p>
                        </div>
                    </header>

                    <form
                        className={styles.form}
                        onSubmit={handleLogin}
                    >
                        <label className={styles.field}>
                            <span>E-mail</span>

                            <div className={styles.inputContainer}>
                                <Mail
                                    size={19}
                                    aria-hidden="true"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    placeholder="seuemail@exemplo.com"
                                    autoComplete="email"
                                    inputMode="email"
                                    disabled={loading}
                                    required
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>
                        </label>

                        <label className={styles.field}>
                            <div className={styles.fieldHeader}>
                                <span>Senha</span>

                                <button
                                    type="button"
                                    className={styles.forgotPassword}
                                    disabled={loading}
                                    onClick={() =>
                                        setModalVisible(true)
                                    }
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>

                            <div className={styles.inputContainer}>
                                <LockKeyhole
                                    size={19}
                                    aria-hidden="true"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={password}
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    aria-label={
                                        showPassword
                                            ? 'Ocultar senha'
                                            : 'Mostrar senha'
                                    }
                                    aria-pressed={showPassword}
                                    disabled={loading}
                                    onClick={() =>
                                        setShowPassword(
                                            (current) => !current,
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </label>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!canSubmit}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner
                                        size={17}
                                        className={styles.spinner}
                                    />

                                    Entrando...
                                </>
                            ) : (
                                'Acessar'
                            )}
                        </button>
                    </form>

                    <footer className={styles.footer}>
                        <span>Ainda não possui uma conta?</span>

                        <Link href="/planos">
                            Conheça nossos planos
                        </Link>
                    </footer>
                </section>
            </main>

            {modalVisible && (
                <ForgetPass
                    handleClose={() => setModalVisible(false)}
                />
            )}
        </>
    )
}
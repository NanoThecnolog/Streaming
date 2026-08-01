import {
    FormEvent,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { isAxiosError } from 'axios'
import {
    ArrowRight,
    KeyRound,
    LoaderCircle,
    Mail,
    ShieldCheck,
    X,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { SetupAPIClient } from '@/services/api'

import styles from './styles.module.scss'

interface ForgetPassProps {
    handleClose: () => void
}

interface RecoverTokenErrorResponse {
    error?: string
    message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgetPass({
    handleClose,
}: ForgetPassProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const normalizedEmail = email.trim().toLowerCase()

    const emailIsValid = useMemo(
        () => EMAIL_REGEX.test(normalizedEmail),
        [normalizedEmail],
    )

    const canSubmit = emailIsValid && !loading

    useEffect(() => {
        const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
            if (event.key === 'Escape' && !loading) {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleClose, loading])

    const handleOverlayClick = (
        event: MouseEvent<HTMLDivElement>,
    ): void => {
        if (event.target === event.currentTarget && !loading) {
            handleClose()
        }
    }

    const sendRedefineToken = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault()

        if (!emailIsValid) {
            toast.error('Digite um endereço de e-mail válido.')
            return
        }

        setLoading(true)

        try {
            const client = new SetupAPIClient()

            await client.api.post('/recovertoken', {
                email: normalizedEmail,
            })

            toast.info(
                'Se o email estiver cadastrado, enviaremos o link de recuperação.',
            )

            handleClose()
        } catch (error: unknown) {
            console.error(
                'Erro ao solicitar a recuperação da senha:',
                error,
            )

            if (isAxiosError<RecoverTokenErrorResponse>(error)) {
                const message =
                    error.response?.data?.error ??
                    error.response?.data?.message

                toast.error(
                    message ??
                    'Não foi possível enviar o link. Tente novamente.',
                )

                return
            }

            toast.error(
                'Não foi possível enviar o link. Tente novamente.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={handleOverlayClick}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="recover-modal-title"
                aria-describedby="recover-modal-description"
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    aria-label="Fechar recuperação de senha"
                    disabled={loading}
                    onClick={handleClose}
                >
                    <X size={20} aria-hidden="true" />
                </button>

                <header className={styles.header}>
                    <div className={styles.icon}>
                        <KeyRound size={27} aria-hidden="true" />
                    </div>

                    <span className={styles.eyebrow}>
                        Recuperação de acesso
                    </span>

                    <h2 id="recover-modal-title">
                        Esqueceu sua senha?
                    </h2>

                    <p id="recover-modal-description">
                        Informe o e-mail da sua conta e enviaremos um
                        link para você criar uma nova senha.
                    </p>
                </header>

                <form
                    className={styles.form}
                    onSubmit={sendRedefineToken}
                    noValidate
                >
                    <div className={styles.field}>
                        <label htmlFor="recover-email">
                            E-mail da conta
                        </label>

                        <div className={styles.inputContainer}>
                            <Mail size={18} aria-hidden="true" />

                            <input
                                id="recover-email"
                                name="email"
                                type="email"
                                value={email}
                                placeholder="seuemail@exemplo.com"
                                autoComplete="email"
                                autoFocus
                                required
                                disabled={loading}
                                aria-invalid={
                                    email.length > 0 && !emailIsValid
                                }
                                onChange={event =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>

                        {email.length > 0 && !emailIsValid && (
                            <span className={styles.fieldError}>
                                Digite um endereço de e-mail válido.
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!canSubmit}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle
                                    className={styles.spinner}
                                    size={18}
                                    aria-hidden="true"
                                />

                                Enviando link...
                            </>
                        ) : (
                            <>
                                Enviar link de recuperação

                                <ArrowRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </button>
                </form>

                <footer className={styles.security}>
                    <ShieldCheck size={16} aria-hidden="true" />

                    <span>
                        O link de recuperação possui tempo limitado.
                    </span>
                </footer>
            </section>
        </div>
    )
}
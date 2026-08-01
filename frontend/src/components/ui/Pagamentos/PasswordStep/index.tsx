import {
    FormEvent,
    useMemo,
    useState,
} from 'react'

import styles from './styles.module.scss'

interface PasswordStepProps {
    email: string
    onBack: () => void
    onFinish: (password: string) => void
}

export function PasswordStep({
    email,
    onBack,
    onFinish,
}: PasswordStepProps) {
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] =
        useState('')

    const [showPassword, setShowPassword] =
        useState(false)

    const requirements = useMemo(() => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            matches:
                password.length > 0 &&
                password === confirmation,
        }
    }, [password, confirmation])

    const canFinish = Object.values(
        requirements,
    ).every(Boolean)

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (!canFinish) return

        onFinish(password)
    }

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Última etapa
                </span>

                <h1>Crie sua senha</h1>

                <p>
                    Sua assinatura já está confirmada. Defina uma
                    senha para acessar sua conta.
                </p>
            </header>

            <div className={styles.account}>
                <span>Conta</span>
                <strong>{email}</strong>
            </div>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.field}>
                    <label htmlFor="password">
                        Senha
                    </label>

                    <div className={styles.passwordInput}>
                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? 'text'
                                    : 'password'
                            }
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value,
                                )
                            }
                            placeholder="Digite uma senha segura"
                            autoComplete="new-password"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    (current) => !current,
                                )
                            }
                        >
                            {showPassword
                                ? 'Ocultar'
                                : 'Mostrar'}
                        </button>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="confirmation">
                        Confirmar senha
                    </label>

                    <input
                        id="confirmation"
                        name="confirmation"
                        type={
                            showPassword
                                ? 'text'
                                : 'password'
                        }
                        value={confirmation}
                        onChange={(event) =>
                            setConfirmation(
                                event.target.value,
                            )
                        }
                        placeholder="Digite a senha novamente"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <ul className={styles.requirements}>
                    <Requirement
                        valid={requirements.length}
                        label="Pelo menos 8 caracteres"
                    />

                    <Requirement
                        valid={requirements.uppercase}
                        label="Uma letra maiúscula"
                    />

                    <Requirement
                        valid={requirements.lowercase}
                        label="Uma letra minúscula"
                    />

                    <Requirement
                        valid={requirements.number}
                        label="Um número"
                    />

                    <Requirement
                        valid={requirements.matches}
                        label="As senhas são iguais"
                    />
                </ul>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.back}
                        onClick={onBack}
                    >
                        Voltar
                    </button>

                    <button
                        type="submit"
                        className={styles.finish}
                        disabled={!canFinish}
                    >
                        Finalizar cadastro
                    </button>
                </div>
            </form>
        </section>
    )
}

interface RequirementProps {
    valid: boolean
    label: string
}

function Requirement({
    valid,
    label,
}: RequirementProps) {
    return (
        <li
            className={
                valid
                    ? styles.requirementValid
                    : ''
            }
        >
            <span>{valid ? '✓' : '○'}</span>
            {label}
        </li>
    )
}
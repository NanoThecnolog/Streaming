import { FormEvent, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import SEO from '@/components/SEO'
import { Validate } from '@/classes/validater'
import { NewUserProps } from '@/@types/userTypes/signUp'
import { userMethod } from '@/classes/userMethods'
import { debug } from '@/classes/DebugLogger'
import { FaKey } from 'react-icons/fa6'
import { generate } from '@/classes/Generate'




export default function Signup() {
    const [passVisible, setPassVisible] = useState<boolean>(false)

    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const login = "/login";
    const [user, setUser] = useState<NewUserProps>({ name: '', birthday: '', email: '', password: '', cpf: '' })

    const validate = new Validate()
    function formatDate(date: unknown): string {
        const parsed = typeof date === 'string' ? new Date(date) : date;
        if (parsed instanceof Date && !isNaN(parsed.getTime())) {
            return parsed.toISOString().substring(0, 10);
        }
        return "";
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        const campos = [
            { value: user.name, message: "Digite seu nome!" },
            { value: user.birthday, message: "Coloque sua data de nascimento!" },
            { value: user.email, message: "Digite seu email!" },
            { value: user.password, message: "Digite uma senha para cadastrar!" },
            { value: confirmPassword, message: "Confirme a senha para cadastrar!" }
        ]

        for (const campo of campos) {
            if (!campo.value) {
                toast.warning(campo.message)
                return;
            }
        }
        if (!validate.email(user.email)) {
            toast.warning("Email inválido!")
            return;
        }

        if (!validate.samePassword(user.password, confirmPassword)) {
            toast.warning("As senhas não são iguais.")
            return;
        }

        try {
            setLoading(true)
            const registerUser = await userMethod.signUp(user)
            toast.success("Conta criada com sucesso.")
            debug.log("Conta criada com sucesso", registerUser)
            Router.push(login)

        } catch (err) {
            console.log("Erro ao registrar", err)
            toast.error("Erro ao criar conta. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }

    const generatePassword = () => {
        const senhaGerada = generate.password(12)
        setUser((prev) => ({ ...prev, password: senhaGerada }))
        setConfirmPassword(senhaGerada)
    }

    return (
        <>
            <SEO title='Criar conta | FlixNext' description='Crie sua conta e começe a assistir hoje mesmo!' />
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1><span className={styles.white}>FLIX</span><span className={styles.red}>NEXT</span></h1>
                    <form onSubmit={handleRegister} className={styles.formulario}>
                        <div className={styles.inputContainer}>
                            <div>
                                <div className={styles.nameContainer}>
                                    <h2>Nome:</h2>
                                    <input
                                        type='text'
                                        required
                                        value={user.name}
                                        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>
                                <div className={styles.cpfContainer}>
                                    <h2>CPF:</h2>
                                    <input
                                        type='text'
                                        required
                                        value={user.cpf}
                                        onChange={(e) => setUser((prev) => ({ ...prev, cpf: e.target.value }))}
                                    />
                                </div>
                                <div className={styles.birthdayContainer}>
                                    <h2>Data de Nascimento:</h2>
                                    <input
                                        type='date'
                                        required
                                        value={formatDate(user.birthday)}
                                        onChange={(e) => {
                                            setUser((prev) => ({
                                                ...prev,
                                                birthday: e.target.value
                                            }))
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={styles.emailContainer}>
                                    <h2>Email:</h2>
                                    <input
                                        type='email'
                                        required
                                        value={user.email}
                                        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className={styles.passwordContainer}>
                                    <h2>Senha:</h2>
                                    <input
                                        type={passVisible ? "password" : "text"}
                                        required
                                        value={user.password}
                                        onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                    <div className={styles.reveal} onClick={() => setPassVisible(!passVisible)}>
                                        {
                                            passVisible ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                    <div className={styles.generatePass} title='Gerar senha aleatória' onClick={generatePassword}>
                                        <FaKey />
                                    </div>
                                </div>
                                <div className={styles.passwordConfirmContainer}>
                                    <h2>Confirmar senha:</h2>
                                    <input
                                        type={passVisible ? "password" : "text"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className={styles.buttonContainer}>
                            <button type='submit' disabled={loading}>{loading ? <FaSpinner size={20} /> : "Registrar"}</button>
                        </div>
                    </form>
                    <div className={styles.linksContainer}>
                        <Link href={login}><h3>Entrar com uma conta</h3></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
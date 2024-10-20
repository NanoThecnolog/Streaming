import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { FaSpinner } from 'react-icons/fa'


export default function Signup() {
    //refatorar esse componente
    const [name, setName] = useState<string>('')
    const [birthday, setBirthday] = useState<Date>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const login = "/login";

    useEffect(() => {
        async function wakeUpServer() {
            try {
                const acordar = await api.get('/acordar');
                //console.log(acordar.data.status)

                return acordar
            } catch (err) {
                //console.log(err)             
                return err
            }
        }
        wakeUpServer()
        const manterAcordado = setInterval(() => {
            wakeUpServer()
        }, 40000)
        return () => clearInterval(manterAcordado)
    }, [])

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        function emailValido(email: string): boolean {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        const campos = [
            { value: name, message: "Digite seu nome!" },
            { value: birthday, message: "Coloque sua data de nascimento!" },
            { value: email, message: "Digite seu email!" },
            { value: password, message: "Digite uma senha para cadastrar!" },
            { value: confirmPassword, message: "Confirme a senha para cadastrar!" }
        ]

        for (const campo of campos) {
            if (!campo.value) {
                toast.warning(campo.message)
                return;
            }
        }
        if (!birthday) {
            toast.warning("Coloque uma data de nascimento válida!");
            return;
        }
        if (!emailValido(email)) {
            toast.warning("Email inválido!")
            return;
        }

        if (password !== confirmPassword) {
            toast.warning("As senhas não são iguais.")
            return;
        }


        try {
            setLoading(true)
            const userData = {
                name,
                email,
                birthday: birthday?.toISOString() || '',
                password
            }

            const response = await api.post('/user', userData)

            const data = response.data;
            toast.success("Conta criada com sucesso.")
            console.log("Conta criada com sucesso", data)
            Router.push(login)

        } catch (err) {
            console.log("Erro ao registrar", err)
            toast.error("Erro ao criar conta. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }


    }
    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1><span className={styles.white}>FLIX</span><span className={styles.red}>NEXT</span></h1>
                <form onSubmit={handleRegister} className={styles.formulario}>
                    <div className={styles.nameContainer}>
                        <h2>Nome:</h2>
                        <input
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.birthdayContainer}>
                        <h2>Data de Nascimento:</h2>
                        <input
                            type='date'
                            required
                            value={birthday ? birthday.toISOString().substring(0, 10) : ""}
                            onChange={(e) => setBirthday(new Date(e.target.value))}
                        />
                    </div>
                    <div className={styles.emailContainer}>
                        <h2>Email:</h2>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.passwordContainer}>
                        <h2>Senha:</h2>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.passwordContainer}>
                        <h2>Confirmar senha:</h2>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
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
    )
}
import Link from 'next/link'
import styles from './styles.module.scss'
import { FormEvent, FormEventHandler, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import Head from 'next/head';
//import { cookies } from 'next/headers';



export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const forgetLink = "/";
    const newAccount = "/signup";

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        try {
            setLoading(true)
            const response = await api.post('/login', {
                email: email,
                password: password
            })
            if (!response.data.token) return;
            //console.log(response.data)
            if (!response.data.verified) {
                alert(
                    "Sua conta ainda não foi ativada.\n\n" +
                    "Um link de ativação foi enviado para o seu e-mail durante o cadastro.\n\n" +
                    "Por favor, verifique sua caixa de entrada ou a pasta de spam e clique no link de ativação " +
                    "para liberar o acesso ao conteúdo."
                );
                return;
            }
            const expressTime = 15 * 24 * 60 * 60 * 1000;
            const userData = JSON.stringify(response.data)
            document.cookie = `flixnext=${userData}; path=/; max-age=${expressTime}`
            //salvar a resposta Data nos cookies
            toast.success("Bem vindo!")
            Router.push('/');
        } catch (err) {
            if (err instanceof ErrorEvent) {
                return toast.error(err.message)
            }
            console.log(err)
            return toast.error("Erro ao tentar realizar login")
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <Head>
                <title>Página de Login | FlixNext</title>
                <meta name="description" content="Página de login da plataforma" />
            </Head>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1><span className={styles.white}>FLIX</span><span className={styles.red}>NEXT</span></h1>
                    <form onSubmit={handleLogin} className={styles.formulario}>
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
                        <div className={styles.buttonContainer}>
                            <button type='submit' disabled={loading}>{loading ? (
                                <span>carregando... <FaSpinner /></span>
                            ) : "Acessar"}</button>
                        </div>
                    </form>
                    <div className={styles.linksContainer}>
                        <Link href={forgetLink}><h3>Esqueceu sua senha?</h3></Link>
                        <Link href={newAccount}><h3>Criar conta</h3></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
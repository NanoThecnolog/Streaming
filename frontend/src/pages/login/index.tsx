import Link from 'next/link'
import styles from './styles.module.scss'
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { serverStatus } from '@/services/verifyStatusServer';
import ForgetPass from '@/components/modals/ForgetPassword';
import { Verified } from 'lucide-react';
import setData from '@/services/setDataOnStorage';
import SEO from '@/components/SEO';
//import { cookies } from 'next/headers';



export default function Login() {
    //refatorar esse componente
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const newAccount = "/signup";

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
            //salvar a resposta Data nos cookies e localStorage
            const expressTime = 15 * 24 * 60 * 60 * 1000;
            const userData = JSON.stringify(response.data)
            const user = JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                avatar: response.data.avatar,
                Verified: response.data.verified,
                birthday: response.data.birthday,
                token: response.data.token,
                news: response.data.news
            })
            localStorage.setItem('flixnext', userData)
            await setData();
            document.cookie = `flixnext=${userData}; path=/; max-age=${expressTime}`
            document.cookie = `userData=${user}; path=/; max-age=${expressTime}`
            toast.success("Bem vindo!")
            Router.push('/');
        } catch (err) {
            if (err instanceof ErrorEvent) {
                return toast.error(err.message)
            }
            console.log(err)
            return toast.error("Erro ao tentar realizar login. Verifique seu email e sua senha e tente novamente")
        } finally {
            setLoading(false)
        }

    }
    function handleOpen() {
        setModalVisible(true)
    }
    function handleClose() {
        setModalVisible(false)
    }
    return (
        <>
            <SEO title='Login | FlixNext' description='Faça login na nossa plataforma e aproveite os nossos conteúdos!' />
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
                        <button type='button' onClick={handleOpen}><h3>Esqueceu sua senha?</h3></button>
                        <Link href={newAccount}><h3>Criar conta</h3></Link>
                    </div>
                </div>
                {modalVisible && <ForgetPass
                    handleClose={handleClose}
                />
                }

            </div>
        </>
    )
}

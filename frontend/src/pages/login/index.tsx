import Link from 'next/link'
import styles from './styles.module.scss'
import { FormEvent, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import ForgetPass from '@/components/modals/ForgetPassword';
import SEO from '@/components/SEO';
import { useFlix } from '@/contexts/FlixContext';
import { debug } from '@/classes/DebugLogger';

export default function Login() {
    //refatorar esse componente
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const newAccount = "/signup";
    const { signIn } = useFlix()

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        if (loading) return
        try {
            setLoading(true)
            const credentials = { email, password }
            await signIn(credentials)
        } catch (err) {
            console.log('Erro ao realizar login', err)
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
                {
                    modalVisible &&
                    <ForgetPass handleClose={handleClose} />
                }
            </div>
        </>
    )
}

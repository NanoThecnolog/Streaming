import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa6';
import SEO from '@/components/SEO';

export default function RecoverPage() {
    const router = useRouter()
    const { token } = router.query;
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function changePassword() {
        if (password != confirmPassword) {
            toast.error("Senhas não são correspondentes")
            return
        }
        if (!token) return
        setLoading(true)
        try {
            const response = await api.put('/recover', {
                token: token,
                password: password
            })
            toast.success("Senha Alterada com sucesso!")
            setSuccess(true)
            router.replace("/recover")
        } catch (err: any) {
            console.log("Erro", err)
            if (err.response.data) {
                const errorMessage = err.response.data.error
                toast.error(errorMessage)
            } else {
                toast.error("Erro ao tentar alterar senha. Tente novamente!")
            }
        } finally {
            setLoading(false)
        }
    }
    function handleLogin() {
        return router.push('/login')
    }
    return (
        <>
            <SEO title='Recuperação | Flixnext' description='Recupere sua conta aqui!' />
            <div className={styles.container}>
                <div className={styles.recoverContainer}>
                    <div className={styles.recover}>
                        {
                            success ? <>
                                <h2>Senha Alterada com sucesso!</h2>
                                <button type='button' onClick={handleLogin}>Fazer Login</button>
                            </>
                                : <>
                                    <h2>Digite uma nova senha para a sua conta:</h2>
                                    <input type="password" value={password} placeholder='Digite a nova senha' onChange={(e) => setPassword(e.target.value)} />
                                    <input type="password" value={confirmPassword} placeholder='Repita a senha' onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <button type='submit' disabled={loading} onClick={changePassword}>
                                        {loading ? (
                                            <span>carregando... <FaSpinner /></span>
                                        ) : "Alterar Senha"}
                                    </button>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
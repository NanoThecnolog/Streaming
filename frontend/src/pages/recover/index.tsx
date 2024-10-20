import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa6';

export default function RecoverPage() {
    //refatorar esse componente
    const router = useRouter()
    const { token } = router.query;
    //const [token, setToken] = useState<string>()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)

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
    return (
        <div className={styles.container}>
            <div className={styles.recoverContainer}>
                <div className={styles.recover}>
                    <h2>Digite uma nova senha para a sua conta:</h2>
                    <input type="password" value={password} placeholder='Digite a nova senha' onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" value={confirmPassword} placeholder='Repita a senha' onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button type='submit' disabled={loading} onClick={changePassword}>{loading ? (
                        <span>carregando... <FaSpinner /></span>
                    ) : "Alterar Senha"}</button>
                </div>
            </div>
        </div>
    )
}
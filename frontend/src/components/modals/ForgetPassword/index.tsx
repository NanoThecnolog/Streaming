import { X } from 'lucide-react'
import styles from './styles.module.scss'
import { useState } from 'react';
import Router from 'next/router';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa6';

interface ForgetPassProps {
    handleClose: () => void;
}


export default function ForgetPass({ handleClose }: ForgetPassProps) {
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    async function sendRedefineToken() {
        try {
            setLoading(true)
            const sending = await api.post('/recovertoken', {
                email: email
            })
            console.log(sending)
            toast.success("Email enviado com o link de redefinição de senha! Verifique seu email.")
        } catch (err) {
            console.log("Erro ao enviar token", err)
            toast.error("Verifique o email e tente novamente.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.recoverContainer}>
                <X onClick={handleClose} className={styles.closeButton} />
                <h2>Digite seu email para recuperar seu acesso</h2>
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit' disabled={loading} onClick={sendRedefineToken}>{loading ? (
                    <span>carregando... <FaSpinner /></span>
                ) : "Recuperar"}</button>

            </div>
        </div>
    )
}
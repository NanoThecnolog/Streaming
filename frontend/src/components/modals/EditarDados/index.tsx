import { FormEvent, useState } from 'react'
import styles from './styles.module.scss'
import { FaSpinner } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { api } from '@/services/api'
import Router from 'next/router'
import { X } from 'lucide-react'
import { getCookieClient } from '@/services/cookieClient'
import { UserProps } from '@/@types/user'

interface EditarDadosProps {
    handleClose: () => void;
}


export default function EditarDados({ handleClose }: EditarDadosProps) {
    const [name, setName] = useState<string>('')
    const [birthday, setBirthday] = useState<Date | null>(null)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function handleDados(event: FormEvent) {
        event.preventDefault();

        if (password && password !== confirmPassword) {
            toast.warning("As senhas não são iguais.")
            return;
        }
        try {
            setLoading(true)
            const user: UserProps = getCookieClient();
            if (!user) {
                toast.error("Erro ao tentar editar dados do usuario.")
                return
            }
            const userData: Record<string, any> = {
                id: user.id,
                ...(name && { name }),
                ...(birthday && { birthday: birthday?.toISOString() }),
                ...(password && { password })
            }

            const response = await api.put('/user', userData)
            const data = response.data;
            toast.success("Dados alterados com sucesso.")
            console.log("Dados alterados com sucesso", data)
            const atualizarUsuario = await api.get('/user', {
                params: {
                    id: user.id
                }
            })
            const expressTime = 15 * 24 * 60 * 60 * 1000;
            const userJson = JSON.stringify(atualizarUsuario.data)
            document.cookie = `flixnext=${userJson}; path=/; max-age=${expressTime}`

        } catch (err) {
            console.log("Erro ao alterar dados", err)
            toast.error("Erro ao alterar seus dados.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <X size={30} className={styles.closeButton} onClick={handleClose} />

                <form onSubmit={handleDados} className={styles.formulario}>
                    <div className={styles.labelContainer}>
                        <h3>Nome:</h3>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.labelContainer}>
                        <h3>Data de Nascimento:</h3>
                        <input
                            type='date'
                            value={birthday ? birthday.toISOString().substring(0, 10) : ""}
                            onChange={(e) => setBirthday(e.target.value ? new Date(e.target.value) : null)}
                        />
                    </div>
                    <div className={styles.labelContainer}>
                        <h3>Senha:</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.labelContainer}>
                        <h3>Confirmar senha:</h3>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type='submit' disabled={loading}>{loading ? <FaSpinner size={20} /> : "Alterar"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
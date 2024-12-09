import { api } from '@/services/api'
import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface HelpProps {
    handleHelpModal: () => void
    userId: string | undefined,
    tmdbId: number

}

export default function HelpModal({ handleHelpModal, userId, tmdbId }: HelpProps) {
    const [loading, setLoading] = useState(false)

    const flags = [
        {
            title: "O vídeo pediu permissão para acessar",
            description: "O vídeo solicitou permissão de acesso"
        },
        {
            title: "Número de reproduções excedido",
            description: "O vídeo não reproduziu e apresentou a mensagem dizendo que o número de reproduções foi excedido."
        },
        {
            title: "Vídeo não reproduziu",
            description: "Apresentou mensagem informando que o arquivo não reproduziu porque ele viola os termos de serviço do Google Drive"
        },
        {
            title: "Vídeo com problema",
            description: "O vídeo não carregou por motivo desconhecido."
        }
    ]

    async function handleClick(title: string, description: string) {
        try {
            setLoading(true)
            await api.post('/send', {
                title,
                description,
                userId: userId === undefined ? 'Indefinido' : userId,
                tmdbId: tmdbId === null || undefined ? 'Indefinido' : tmdbId
            })
            toast.success("Obrigado! Vamos cuidar do problema. Sua notificação ajuda a tornar a nossa plataforma ainda melhor!")
        } catch (err) {
            console.error(err)
            toast.warning("Relatório não enviado. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={styles.helpContainer}>
            <div className={styles.background} onClick={handleHelpModal}></div>
            <div className={styles.help} data-loading={loading}>
                <h1>Qual é o problema?</h1>
                {flags.map((flag, index) => (
                    <div
                        onClick={() => handleClick(flag.title, flag.description)}
                        key={index}
                        className={styles.flag}
                        data-loading={loading}
                    >
                        <h2>{flag.title}</h2>
                        <p>{flag.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
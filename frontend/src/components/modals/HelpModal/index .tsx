import { api } from '@/services/api'
import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { SeriesProps } from '@/@types/series'
import { apiEmail } from '@/services/apiMessenger'
import { debug } from '@/classes/DebugLogger'

interface HelpProps {
    handleHelpModal: () => void
    userId: string | undefined,
    tmdbId: number
    serie?: SeriesProps | null
    season?: number,
    episode?: number,
}

export default function HelpModal({ handleHelpModal, userId, tmdbId, serie, season, episode }: HelpProps) {
    const [loading, setLoading] = useState(false)
    //console.log(`tmbdID do componente modal: ${tmdbId}`)

    const flags = [
        {
            title: "Vídeo não reproduziu",
            description: "Apresentou mensagem informando que há algo de errado com o arquivo do vídeo"
        },
        {
            title: "Número de reproduções excedido",
            description: "O vídeo não reproduziu e apresentou a mensagem dizendo que o número de reproduções foi excedido."
        },
        {
            title: "Problema com o audio",
            description: "O som do vídeo está com problemas de sincronismo ou está falhando."
        },
        {
            title: "Problema com imagem",
            description: "A imagem do vídeo está com problemas."
        },
        {
            title: "Legenda ausente!",
            description: "A legenda não está disponível para o vídeo."
        },
        {
            title: "Não sei qual é o problema!",
            description: "O vídeo não carregou por algum motivo desconhecido."
        },

    ]

    async function handleClick(title: string, description: string) {

        try {
            setLoading(true)
            const response = await apiEmail.post('/system/problem', {
                title,
                description,
                userId: userId === undefined ? 'Indefinido' : userId,
                tmdbId: serie ? serie.tmdbID : tmdbId ? tmdbId : 'Indefinido',
                season: season ? season : 0,
                episode: episode ? episode : 0
            })
            debug.log(response.data)
            toast.success("Obrigado! Vamos cuidar do problema.")
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
                <div className={styles.flagContainer}>
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
        </div>
    )
}
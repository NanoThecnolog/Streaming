import { RequestCardProps } from '@/@types/RequestCard';
import styles from './styles.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Loading/spinner';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { apiEmail } from '@/services/apiMessenger';
import { useFlix } from '@/contexts/FlixContext';
import { debug } from '@/classes/DebugLogger';
interface RequestCard {
    card: RequestCardProps;
}
export default function RequestCard({ card }: RequestCard) {
    const router = useRouter()
    const [poster, setPoster] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { user } = useFlix()
    useEffect(() => {
        if (card.poster_path) {
            const urlPoster = `https://image.tmdb.org/t/p/original${card.poster_path}`
            setPoster(urlPoster)
        }
    }, [card])
    async function handleClick(card: RequestCardProps) {
        if (loading) return
        setLoading(true)
        try {
            //const response = await apiEmail.get('/')
            const response = await apiEmail.post('/system/request', {
                tmdbId: card.id,
                title: card.title ?? card.name ?? card.original_name,
                subtitle: card.subtitle ?? "---",
                userId: user?.id,
                userName: user?.name
            })
            const data = response;
            debug.log(data)
            toast.success("Conteúdo Solicitado!")
        } catch (err) {
            console.log(err)
            toast.error("Não conseguimos solicitar o conteúdo. Tente novamente mais tarde!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>{
            poster &&
            <div className={styles.card}>
                <Image
                    src={poster}
                    alt={card.title ?? 'poster image'}
                    fill
                    placeholder="blur"
                    blurDataURL="/blurImage.png"
                    quality={35}
                    className={styles.backgroundImage}
                    priority
                    sizes="100%"
                />
                <div className={`${styles.buttonContainer} ${loading && styles.loading}`}>
                    <div>
                        {
                            loading ? <Spinner /> : <button onClick={() => handleClick(card)}>Solicitar</button>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
}
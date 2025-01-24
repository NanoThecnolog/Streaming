import { RequestCardProps } from '@/@types/RequestCard';
import styles from './styles.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Loading/spinner';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
interface RequestCard {
    card: RequestCardProps;
}
export default function RequestCard({ card }: RequestCard) {
    const router = useRouter()
    const [poster, setPoster] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (card.poster_path) {
            const urlPoster = `https://image.tmdb.org/t/p/original${card.poster_path}`
            setPoster(urlPoster)
        }
    }, [card])
    async function handleClick(tmdbId: number) {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.post('/request/content', {
                tmdbId
            })
            const data = response.data;
            console.log(data)
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
                            loading ? <Spinner /> : <button onClick={() => handleClick(card.id)}>Solicitar</button>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
}
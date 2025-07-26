import { TMDBSeries } from '@/@types/series'
import styles from './styles.module.scss'
import { MovieTMDB } from '@/@types/Cards'
import { uniqueKey } from '@/utils/UtilitiesFunctions'
import { useRouter } from 'next/navigation'

interface ModalProps {
    content: (MovieTMDB | TMDBSeries)[]
}
export default function NotificationModal({ content }: ModalProps) {
    if (!content) return
    const router = useRouter()
    const handleClick = (link: string) => {
        router.push(link)
    }
    return (
        <>
            {
                content.length > 0 &&
                <div className={styles.modalContainer}>
                    {content.map(ctn => {
                        if ('seasons' in ctn) return (
                            <div className={styles.modalItem} key={uniqueKey(ctn, 'serie-notification')} onClick={() => handleClick(`/series/serie/${ctn.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500${ctn?.poster_path}`} alt={ctn.name} />
                                <p>{ctn.name}</p>
                            </div>
                        )
                        else return (
                            <div className={styles.modalItem} key={uniqueKey(ctn, 'movie-notification')} onClick={() => handleClick(`/movie/${ctn.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500${ctn?.poster_path}`} alt={ctn.title} />
                                <p>{ctn.title}</p>
                            </div>
                        )
                    }
                    )}
                </div>
            }
        </>
    )
}
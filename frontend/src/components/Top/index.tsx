import { cards } from '@/data/cards'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserProps } from '@/@types/user';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { getUserCookieData } from '@/services/cookieClient';
import { MovieTMDB } from '@/@types/Cards';
import Adult from '../ui/Adult';
import { releaseCards } from '@/data/release';
import { useTMDB } from '@/contexts/TMDBContext';

interface TopProps {
    width?: number;
}

export default function Top({ width }: TopProps) {
    const router = useRouter()
    const [cardOn, setCardOn] = useState(0)
    const card = cards[cardOn]
    //const releaseSet = new Set(releaseCards.map(item => item.tmdbId))
    //const release = cards.filter(card => releaseSet.has(card.tmdbId))
    const [fade, setFade] = useState('fadeIn')
    const [user, setUser] = useState<UserProps | null>(null)
    const [TMDBImages, setTMDBImages] = useState<{ backdrop: string | null; poster: string | null }>({
        backdrop: null,
        poster: null
    })
    const { allData } = useTMDB()
    const [TMDBMovie, setTMDBMovie] = useState<MovieTMDB | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')
            setTimeout(async () => {
                setCardOn(prevCardOn => (prevCardOn + 1) % cards.length);
                setFade('fadeIn')
            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserCookieData();
            if (user) setUser(user)
        }
        fetchUserData()
    }, [])
    useEffect(() => {
        const data = allData.find(data => data.id === card.tmdbId)
        if (data) {
            const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
            const posterUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
            setTMDBMovie(data)
            setTMDBImages({ backdrop: backdropUrl, poster: posterUrl })
        }
    }, [allData, cardOn, card.tmdbId])

    const getBackgroundImage = () => {
        return width && width <= 980
            ? TMDBImages.poster ?? card.overlay
            : TMDBImages.backdrop ?? card.background
    }

    function handleMoreInfo() {
        router.push(`/movie/${card.tmdbId}`)
    }
    function handleWatch() {
        const { tmdbId } = card
        const play: string = `/watch/${tmdbId}`
        router.push(play)
    }

    return (
        <div className={`${styles.top_container} ${styles[fade]}`}
            style={{ backgroundImage: `url(${getBackgroundImage()})` }}
            id="inicio"
        >
            <div className={styles.image_container} id="inicio">
                <div className={styles.left_side}>
                    <h1 className={styles.titulo_principal}>
                        {card.title ?? card.title}
                    </h1>
                    {card.subtitle && (
                        <h3 className={styles.subtitulo_principal}>{card.subtitle}</h3>
                    )}
                    <div className={styles.gen}>
                        <p>
                            {TMDBMovie ? TMDBMovie.genres.map(genre => genre.name === "Action & Adventure"
                                ? "Ação e Aventura" : genre.name === "Sci-Fi & Fantasy"
                                    ? "Ficção Científica e Fantasia" : genre.name === "Thriller"
                                        ? "Suspense"
                                        : genre.name).join(', ')
                                : card.genero.join(', ')}
                        </p>
                        <Adult faixa={card.faixa} />
                    </div>
                    <div className={styles.description}>
                        <p>{card.description}</p>
                    </div>
                    <div className={styles.button_section}>
                        <div className={styles.watch} onClick={handleWatch}>
                            <FaPlay size={35} />
                            <h3>Assistir</h3>
                        </div>
                        <div className={styles.queue} onClick={handleMoreInfo}>
                            <FaInfoCircle size={25} />
                            <h3>Mais Informações</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
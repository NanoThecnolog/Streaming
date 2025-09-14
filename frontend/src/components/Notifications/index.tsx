import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import styles from './styles.module.scss'
import { MovieTMDB } from '@/@types/Cards'
import { TMDBSeries } from '@/@types/series';
import { debug } from '@/classes/DebugLogger';
import { useFlix } from '@/contexts/FlixContext';
import { useEffect, useMemo, useState } from 'react';
import NotificationModal from '../modals/NotificationModal';
import { mongoService } from '@/classes/MongoContent';

interface NotificationProps {
    moviesTMDB: MovieTMDB[];
    seriesTMDB: TMDBSeries[];
}
export default function Notifications({ moviesTMDB, seriesTMDB }: NotificationProps) {
    const { movies, setMovies, series, setSeries } = useFlix()
    const [modalVisible, setModalVisible] = useState(false)
    const tmdbMovieMap = useMemo(() => new Map(moviesTMDB.map(movie => [movie.id, movie])), [moviesTMDB])
    const tmdbSerieMap = useMemo(() => new Map(seriesTMDB.map(serie => [serie.id, serie])), [seriesTMDB])
    const [notificationContent, setNotificationContent] = useState<(MovieTMDB | TMDBSeries)[]>([])
    useEffect(() => {
        const fetchContent = async () => {
            if (series.length === 0) {
                const content = await mongoService.fetchSerieData()
                setSeries(content)
            }
            if (movies.length === 0) {
                const content = await mongoService.fetchMovieData()
                setMovies(content)
            }
        }
        fetchContent()
    }, [])

    const lastMovies = useMemo(() =>
        [...movies]
            .sort((a, b) => b.index - a.index)
            .map(movie => tmdbMovieMap.get(movie.tmdbId))
            .filter((item): item is MovieTMDB => item !== undefined)
            .slice(0, 5)
        , [movies, tmdbMovieMap])

    const lastSeries = useMemo(() =>
        [...series]
            .sort((a, b) => b.index - a.index)
            .map(serie => tmdbSerieMap.get(serie.tmdbID))
            .filter((item): item is TMDBSeries => item !== undefined)
            .slice(0, 5)
        , [series, tmdbSerieMap])

    //debug.log("Ultimos filmes:", lastMovies, 'Ultimas series:', lastSeries)

    const mergedContent = useMemo(() => {
        return [...lastMovies, ...lastSeries]
    }, [lastMovies, lastSeries])

    //debug.log('conteudo fundido: ', mergedContent)
    useEffect(() => {
        setNotificationContent(mergedContent)
    }, [mergedContent])

    return (
        <div className={styles.container}>
            <button onClick={() => setModalVisible(!modalVisible)}>
                {
                    notificationContent.length > 0
                        ? <IoIosNotifications size={30} />
                        : <IoIosNotificationsOutline size={30} />
                }
            </button>
            {modalVisible && <NotificationModal content={notificationContent} />}
        </div>
    )
}
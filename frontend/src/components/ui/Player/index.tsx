import { memo } from 'react'
import styles from './styles.module.scss'
import Spinner from '../Loading/spinner'
import NoFile from '../NoFile'

interface MoviePlayerProps {
    loading: boolean
    shared: boolean
    src: string
    title: string
}

function Player({
    loading,
    shared,
    src,
    title
}: MoviePlayerProps) {
    if (loading) {
        return <Spinner />
    }

    if (!shared) {
        return <NoFile type="movie" />
    }

    return (
        <iframe
            title={title}
            src={src}
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-presentation"
            width="100%"
            height="100%"
            className={styles.player}
        />
    )
}

export const MoviePlayer = memo(Player)

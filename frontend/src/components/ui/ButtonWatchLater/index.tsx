import { FaCheck } from 'react-icons/fa';
import Spinner from '../Loading/spinner';
import styles from './styles.module.scss'
import { FiPlus } from 'react-icons/fi';

interface WatchLaterProps {
    onClick: () => void;
    loading: boolean,
    onWatchLater: boolean
}

export default function WatchLaterContainer({ onClick, loading, onWatchLater }: WatchLaterProps) {

    return (
        <div className={styles.buttonWatchLater}>
            <button type='button' onClick={onClick}>
                {loading ? <Spinner /> : onWatchLater ? (
                    <>
                        <p><FaCheck /></p>
                        <p>Adicionado à Lista</p>
                    </>
                ) : (
                    <>
                        <p><FiPlus /></p>
                        <p>Minha Lista</p>
                    </>
                )}
            </button>
        </div>
    )
}
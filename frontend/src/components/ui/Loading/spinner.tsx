import styles from './styles.module.scss'
import PropagateLoader from "react-spinners/PropagateLoader"

export default function Spinner() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
                <PropagateLoader
                    size={15}
                    color='#fff'
                    speedMultiplier={0.6}
                />
            </div>
        </div>
    )
}
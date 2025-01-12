import styles from './styles.module.scss'

export default function Spinner() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
        </div>
    )
}
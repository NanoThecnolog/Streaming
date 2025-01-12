import styles from './styles.module.scss'

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div>
                <h1>Flix<span>Next</span></h1>
            </div>
            <div className={styles.spinner}></div>
            <div>
                <h2>Carregando...</h2>
            </div>
        </div>
    )
}
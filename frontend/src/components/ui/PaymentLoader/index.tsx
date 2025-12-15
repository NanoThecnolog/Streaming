import styles from './styles.module.scss'
import Loader from "react-spinners/GridLoader"

export default function PaymentLoader() {
    return (
        <div className={styles.loadingContainer}>
            <div>
                <h1>Processando...</h1>
            </div>
            <div className={styles.spinner}>
                <Loader
                    size={15}
                    color='#fff'
                    speedMultiplier={0.6}
                />
            </div>
        </div>
    )
}
import styles from './styles.module.scss'

export function CheckoutHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <a
                    href="/"
                    className={styles.logo}
                    aria-label="Voltar para o início"
                >
                    <span className={styles.white}>FLiX</span>
                    <span className={styles.red}>NEXT</span>
                </a>

                <div className={styles.security}>
                    <span className={styles.securityIcon}>
                        ✓
                    </span>

                    <div>
                        <strong>Checkout seguro</strong>
                        <span>Seus dados estão protegidos</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
import Link from 'next/link'
import { FiArrowLeft, FiCompass, FiHome } from 'react-icons/fi'

import styles from '../styles/404.module.scss'

const NotFound = () => {
    return (
        <main className={styles.page}>
            <div
                className={styles.backgroundGlow}
                aria-hidden="true"
            />

            <section
                className={styles.content}
                aria-labelledby="not-found-title"
            >
                <span className={styles.errorCode}>
                    404
                </span>

                <div className={styles.icon}>
                    <FiCompass aria-hidden="true" />
                </div>

                <span className={styles.eyebrow}>
                    Página não encontrada
                </span>

                <h1 id="not-found-title">
                    Parece que esta página não existe
                </h1>

                <p>
                    O endereço pode estar incorreto, ter sido alterado ou a
                    página não está mais disponível.
                </p>

                <div className={styles.actions}>
                    <Link
                        href="/"
                        className={styles.primaryAction}
                    >
                        <FiHome aria-hidden="true" />
                        Página inicial
                    </Link>

                    <button
                        type="button"
                        className={styles.secondaryAction}
                        onClick={() => window.history.back()}
                    >
                        <FiArrowLeft aria-hidden="true" />
                        Voltar
                    </button>
                </div>
            </section>

            <span className={styles.brand}>
                FlixNext
            </span>
        </main>
    )
}

export default NotFound
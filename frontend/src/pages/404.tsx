import Link from 'next/link'
import styles from '../styles/404.module.scss'

export default function NotFound() {
    return (
        <>
            <main className={styles.mainContainer}>
                <section className={styles.sectionContainer}>
                    <h1>Erro 404</h1>
                    <h3>Página não encontrada</h3>
                    <p>
                        A página que você tentou acessar não existe
                    </p>
                    <Link href='/'>Voltar para página principal</Link>
                </section>
            </main>
        </>
    )
}
import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Suport(status: string) {
    return (
        <>
            <SEO title='Suporte | FlixNext' description='Página do suporte FlixNext' />
            <Header />
            <section className={styles.container}>
                <div className={styles.suporteContainer}>
                    <div>
                        <h1>Suporte <span className={styles.brand}><span className={styles.red}>FLIX</span>NEXT</span></h1>
                    </div>
                    <div>
                        <h3>Está com problemas?</h3>
                        <p>Fale conosco através do email: contato@ericssongomes.com</p>
                        <p>Descreva o problema da melhor forma possível.</p>
                        <p>Estamos sempre buscando melhor atende-lo e seu email é muito importante para nós.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
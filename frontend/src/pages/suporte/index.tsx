import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'

export default function Suport() {
    return (
        <>
            <Header />
            <section className={styles.container}>
                <div className={styles.suporteContainer}>
                    <div>
                        <h1>Suporte <span className={styles.brand}><span className={styles.red}>FLIX</span>NEXT</span></h1>
                    </div>
                    <div>
                        <h3>Problemas com reprodução do filme</h3>
                        <p>
                            Os filmes são incorporados de hospedagens de terceiros. Como não possuímos os filmes incorporados na plataforma, pode ocorrer algum erro no momento da reprodução do filme.
                        </p>
                        <p>
                            Caso esteja enfrentando problemas para ver seu filme, envie um email com o assunto: PROBLEMAS COM REPRODUÇÃO DE FILME, explicando com suas palavras o ocorrido e informando o nome do filme para nossa equipe no email: dev@ericssongomes.com
                        </p>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}
import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import { serverStatus } from '@/services/verifyStatusServer'
import { GetServerSideProps } from 'next'
import SEO from '@/components/SEO'

export default function Suport(status: string) {
    return (
        <>
            <SEO title='Suporte | FlixNext' description='Página do suporte FlixNext' />
            <Header status={status} />
            <section className={styles.container}>
                <div className={styles.suporteContainer}>
                    <div>
                        <h1>Suporte <span className={styles.brand}><span className={styles.red}>FLIX</span>NEXT</span></h1>
                    </div>
                    <div>
                        <h3>Problemas com reprodução do filme</h3>
                        <p>
                            Os arquivos de filmes e séries são incorporados utilizando hospedagens de terceiros. Como não possuímos controle sobre os arquivos incorporados na plataforma, podem ocorrer problemas no momento da reprodução.
                        </p>
                        <p>
                            Caso esteja enfrentando problemas para ver seu filme, envie um email com o assunto: PROBLEMAS COM REPRODUÇÃO DE FILME, explicando com suas palavras o ocorrido e informando o nome do filme para nossa equipe no email: contato@ericssongomes.com
                        </p>
                        <p>Avisaremos assim que o problema for resolvido</p>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    async function fetchServerStatus() {
        const status = await serverStatus();
        return status
    }
    const status = await fetchServerStatus()
    return {
        props: {
            status
        }
    }
}
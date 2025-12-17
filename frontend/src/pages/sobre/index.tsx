import Head from 'next/head'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
    return (
        <>
            <Head>
                <title></title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            <main className={styles.container}>
                <section className={styles.aboutContainer}>
                    <div className={styles.content}>
                        <h1>Sobre o projeto</h1>

                        <p className={styles.intro}>
                            Este projeto nasceu de forma simples e despretensiosa. No início, era uma
                            iniciativa pessoal, voltada para amigos e familiares, com a ideia de organizar
                            e manter acessíveis obras audiovisuais que, ao longo do tempo, se tornaram
                            difíceis de encontrar nos serviços de streaming disponíveis no Brasil.
                        </p>

                        <p>
                            Sempre houve um cuidado especial com esse acervo — filmes e séries antigos,
                            raros ou pouco conhecidos — que fazem parte da história do audiovisual, mas que
                            acabam ficando esquecidos ou indisponíveis para o público.
                        </p>

                        <h2>Crescimento e novos desafios</h2>

                        <p>
                            De forma inesperada, o projeto começou a alcançar mais pessoas. O número de
                            contas cadastradas cresceu além do que havia sido imaginado inicialmente, e
                            esse crescimento trouxe novos desafios técnicos e operacionais.
                        </p>

                        <p>
                            Manter a plataforma funcionando envolve custos contínuos com servidores,
                            armazenamento, infraestrutura e manutenção. Com isso, tornou-se inviável
                            manter o projeto funcionando de forma totalmente gratuita.
                        </p>

                        <h2>Por que existe uma cobrança</h2>

                        <p>
                            A cobrança de acesso não surgiu como um objetivo, mas como uma necessidade para
                            garantir a continuidade do projeto.
                        </p>

                        <p>
                            Os valores arrecadados são utilizados para cobrir custos operacionais, manter
                            a infraestrutura ativa e permitir melhorias constantes na plataforma. Não se
                            trata de lucro pessoal, mas de sustentabilidade.
                        </p>

                        <h2>A natureza da plataforma</h2>
                        <p>
                            Este projeto não se posiciona como um serviço comercial de streaming e não tem
                            como objetivo competir com grandes plataformas do mercado.
                        </p>
                        <p>
                            Ele funciona como um acervo digital organizado e curado, com foco em obras que
                            não estão facilmente disponíveis em outros serviços no Brasil.
                        </p>
                        <p>
                            A plataforma existe para facilitar o acesso, a organização e a preservação
                            desse acervo, dentro de suas limitações técnicas e operacionais.
                        </p>

                        <h2>Apoio e continuidade</h2>
                        <p>
                            Ao contribuir com o projeto, o usuário ajuda diretamente a manter a plataforma
                            funcionando e em evolução.
                        </p>

                        <p>
                            A contribuição não representa a compra de conteúdo nem garante a
                            disponibilidade permanente de títulos. Ela existe como uma forma de apoio
                            coletivo para que o projeto continue existindo.
                        </p>

                        <h2>Transparência e diálogo</h2>

                        <p>
                            Desde o início, a proposta sempre foi manter uma comunicação transparente com
                            quem faz parte da plataforma. O projeto está em constante evolução, e o diálogo
                            com a comunidade é parte fundamental desse processo.
                        </p>

                        <p className={styles.finalText}>
                            Este projeto só é possível graças às pessoas que acreditam na ideia e ajudam a
                            manter esse acervo vivo e acessível.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
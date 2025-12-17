import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function PageUserTerms() {
    return (
        <>
            <SEO
                title='Termos de Uso | FlixNext'
                description='Termos de uso da plataforma FlixNext'
            />
            <Header />
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1>Termos de Uso</h1>

                    <p className={styles.intro}>
                        Estes Termos de Uso regulam a utilização da plataforma FlixNext. Ao acessar ou
                        utilizar a plataforma, você declara que leu, compreendeu e concorda com as
                        disposições aqui descritas.
                    </p>

                    <p>
                        A FlixNext é uma plataforma mantida de forma independente e comunitária, voltada
                        à organização e disponibilização de um acervo digital curado, com foco em obras
                        audiovisuais antigas, raras ou de difícil acesso nos serviços de streaming
                        disponíveis no Brasil.
                    </p>

                    <h2>1. Natureza do serviço</h2>

                    <p>
                        A FlixNext não se caracteriza como um serviço comercial de streaming tradicional
                        e não possui como finalidade a exploração comercial de obras audiovisuais.
                    </p>

                    <p>
                        A plataforma existe com o objetivo de facilitar a organização, preservação e o
                        acesso a um acervo digital, dentro de suas limitações técnicas e operacionais.
                    </p>

                    <h2>2. Cadastro e acesso</h2>

                    <p>
                        Para utilizar a FlixNext, é necessário criar uma conta e fornecer informações
                        verdadeiras e atualizadas. O acesso à conta é pessoal e intransferível.
                    </p>

                    <p>
                        O usuário é responsável por todas as atividades realizadas em sua conta, bem
                        como pela confidencialidade de suas credenciais de acesso.
                    </p>

                    <h2>3. Contribuição e sustentabilidade</h2>

                    <p>
                        A FlixNext adota um modelo de contribuição financeira com o objetivo exclusivo
                        de viabilizar a continuidade, manutenção e evolução da plataforma.
                    </p>

                    <p>
                        A contribuição não representa a compra de conteúdo, não garante a
                        disponibilidade permanente de títulos e não caracteriza relação de consumo
                        nos moldes de serviços comerciais tradicionais.
                    </p>

                    <p>
                        Os valores arrecadados são destinados a custos de infraestrutura, servidores,
                        manutenção técnica e melhorias contínuas da plataforma.
                    </p>

                    <h2>4. Cancelamento</h2>

                    <p>
                        O usuário pode encerrar sua contribuição a qualquer momento por meio do painel
                        da conta. O acesso permanecerá ativo até o final do período vigente.
                    </p>

                    <p>
                        Não há reembolso de valores já pagos, uma vez que a contribuição está vinculada
                        à manutenção contínua do projeto.
                    </p>

                    <h2>5. Uso permitido</h2>

                    <p>
                        O acesso ao acervo é destinado exclusivamente para uso pessoal e não comercial.
                        É vedada qualquer forma de redistribuição, exibição pública ou exploração do
                        conteúdo.
                    </p>

                    <ul>
                        <li>Não reproduzir ou redistribuir o conteúdo</li>
                        <li>Não tentar contornar mecanismos de segurança</li>
                        <li>Não utilizar ferramentas automatizadas para coleta de dados</li>
                        <li>Não interferir no funcionamento da plataforma</li>
                    </ul>

                    <h2>6. Disponibilidade do conteúdo</h2>

                    <p>
                        O acervo da FlixNext é dinâmico e pode sofrer alterações sem aviso prévio.
                        Não há garantia de permanência de títulos específicos na plataforma.
                    </p>

                    <h2>7. Limitação de responsabilidade</h2>

                    <p>
                        A FlixNext é fornecida “no estado em que se encontra”, sem garantias de
                        funcionamento ininterrupto ou livre de erros. A plataforma não se
                        responsabiliza por falhas decorrentes de fatores externos, como conexão
                        à internet ou dispositivos do usuário.
                    </p>

                    <h2>8. Alterações nos termos</h2>

                    <p>
                        Estes Termos de Uso podem ser atualizados periodicamente. Recomenda-se a
                        revisão regular deste documento.
                    </p>

                    <p className={styles.date}>
                        Estes Termos de Uso entram em vigor a partir de 13 de junho de 2025.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}
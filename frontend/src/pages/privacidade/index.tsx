import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Privacy() {
    return (
        <>
            <SEO title="Política de Privacidade | FlixNext" description='Políticas de Privacidade da plataforma' />
            <Header />
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1>Política de Privacidade</h1>

                    <p className={styles.intro}>
                        Esta Política de Privacidade tem como objetivo explicar, de forma clara e
                        transparente, como as informações dos usuários são coletadas, utilizadas
                        e protegidas dentro da plataforma.
                    </p>

                    <p>
                        A FlixNext é um projeto independente, mantido de forma comunitária, e adota
                        como princípio o uso mínimo e responsável de dados pessoais, apenas o
                        estritamente necessário para o funcionamento do serviço.
                    </p>

                    <h2>1. Informações coletadas</h2>

                    <p>
                        Ao criar uma conta na plataforma, podem ser solicitadas as seguintes
                        informações:
                    </p>

                    <ul>
                        <li>Nome: utilizado para identificação básica do usuário</li>
                        <li>E-mail: utilizado para autenticação, comunicação e suporte</li>
                        <li>Data de nascimento: utilizada para verificação de idade mínima</li>
                        <li>Telefone: utilizado para contato em situações específicas de suporte</li>
                        <li>CPF: utilizado para validação de identidade e controle de acesso</li>
                    </ul>

                    <p>
                        Informações de pagamento, quando necessárias, são processadas diretamente
                        por provedores de pagamento externos e não são armazenadas pela plataforma.
                    </p>

                    <h2>2. Uso das informações</h2>

                    <p>
                        Os dados coletados são utilizados exclusivamente para:
                    </p>

                    <ul>
                        <li>Gerenciamento e autenticação da conta do usuário</li>
                        <li>Funcionamento adequado das funcionalidades da plataforma</li>
                        <li>Comunicações essenciais relacionadas ao uso do serviço</li>
                        <li>Cumprimento de obrigações legais e regulatórias</li>
                    </ul>

                    <p>
                        A FlixNext não utiliza dados pessoais para fins de marketing comercial e
                        não realiza venda ou monetização de informações de usuários.
                    </p>

                    <h2>3. Armazenamento e segurança</h2>

                    <p>
                        As informações são armazenadas em ambientes protegidos, com adoção de
                        medidas técnicas e organizacionais voltadas à segurança dos dados.
                    </p>

                    <p>
                        Os dados pessoais são mantidos apenas pelo tempo necessário para a
                        prestação do serviço ou cumprimento de obrigações legais.
                    </p>

                    <h2>4. Compartilhamento de dados</h2>

                    <p>
                        Os dados dos usuários não são compartilhados com terceiros, exceto quando
                        estritamente necessário para:
                    </p>

                    <ul>
                        <li>Operação técnica da plataforma (hospedagem e infraestrutura)</li>
                        <li>Processamento de pagamentos por intermediadores externos</li>
                        <li>Cumprimento de determinações legais ou judiciais</li>
                    </ul>

                    <p>
                        Sempre que houver compartilhamento, este ocorrerá de forma limitada e
                        alinhada às finalidades descritas nesta política.
                    </p>

                    <h2>5. Direitos dos usuários</h2>

                    <p>
                        O usuário pode, a qualquer momento:
                    </p>

                    <ul>
                        <li>Acessar e atualizar seus dados cadastrais</li>
                        <li>Solicitar a exclusão de sua conta e informações associadas</li>
                        <li>Esclarecer dúvidas sobre o uso de seus dados</li>
                    </ul>

                    <h2>6. Alterações nesta política</h2>

                    <p>
                        Esta Política de Privacidade pode ser atualizada periodicamente para
                        refletir ajustes operacionais ou exigências legais. Recomenda-se a
                        consulta regular deste documento.
                    </p>

                    <h2>7. Contato</h2>

                    <p>
                        Em caso de dúvidas ou solicitações relacionadas à privacidade e proteção
                        de dados, o contato pode ser feito por meio do e-mail de suporte
                        disponibilizado na plataforma.
                    </p>

                    <p className={styles.date}>
                        Esta Política de Privacidade entra em vigor a partir de 22 de março de 2025.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}
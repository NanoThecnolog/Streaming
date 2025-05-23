import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Privacy() {
    return (
        <>
            <SEO title="Política de Privacidade | FlixNext" description='Políticas de Privacidade da plataforma' />
            <Header />
            <section className={styles.container}>
                <div className={styles.privacyContainer}>
                    <div>
                        <div>
                            <h1>Declaração sobre Privacidade</h1>
                        </div>
                        <div>
                            <p>Esta declaração de privacidade visa explicar de forma clara como coletamos, utilizamos e protegemos as informações pessoais dos nossos usuários.</p>
                        </div>
                    </div>
                    <div>
                        <h3>Informações Coletadas</h3>
                        <p>Ao criar uma conta em nossa plataforma, coletamos os seguintes dados pessoais:</p>
                        <ul>
                            <li>Nome completo: Para personalizar sua experiência na plataforma.</li>
                            <li>E-mail: Utilizado para a criação da conta, envio de comunicações importantes sobre o serviço, e, caso você opte, recebimento de novidades e atualizações.</li>
                            <li>Data de Nascimento: Necessária para confirmar que o usuário atende aos requisitos de idade mínima para utilizar o serviço.</li>
                            <li>Telefone: Para contato e suporte ao usuário.</li>
                            <li>Endereço: Necessário para faturamento e questões contratuais.</li>
                            <li>CPF: Para validação da identidade do usuário.</li>
                        </ul>
                        <p>Se o usuário optar pelo pagamento via cartão de crédito, serão solicitadas as informações do cartão, que são processadas diretamente pelo nosso gateway de pagamento e não são armazenadas pela plataforma.</p>
                    </div>
                    <div>
                        <h3>Uso das Informações</h3>
                        <p>As informações fornecidas serão utilizadas para:</p>
                        <ul>
                            <li>Gerenciar e personalizar sua conta de usuário.</li>
                            <li>Melhorar a experiência de uso da plataforma com base em dados gerais de nossos usuários.</li>
                            <li>Processar pagamentos e gerenciar assinaturas do serviço.</li>
                            <li>Enviar comunicados importantes, como atualizações ou notificações relacionadas à conta.</li>
                            <li>Cumprir requisitos regulatórios e fiscais.</li>
                        </ul>
                        <p>Não utilizamos suas informações para fins de marketing sem o seu consentimento expresso.</p>
                    </div>
                    <div>
                        <h3>Armazenamento e Segurança</h3>
                        <p>Adotamos medidas de segurança adequadas para proteger as informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui o uso de criptografia e outras tecnologias de segurança modernas.</p>
                        <p>Os dados pessoais serão armazenados pelo tempo necessário para a prestação dos nossos serviços e cumprimento de obrigações legais. Já os dados do cartão de crédito <strong>NÃO</strong> são armazenados pela plataforma, sendo processados diretamente pelo gateway de pagamento.</p>
                    </div>
                    <div>
                        <h3>Compartilhamento de Informações</h3>
                        <p>Não compartilhamos seus dados pessoais com terceiros, exceto quando:</p>
                        <ul>
                            <li>For necessário para a prestação dos serviços (como provedores de hospedagem, segurança e processadores de pagamento).</li>
                            <li>Formos obrigados por lei a divulgar informações para autoridades competentes.</li>
                        </ul>
                        <p>Garantimos que quaisquer terceiros com os quais compartilhamos dados sigam os mesmos padrões de proteção e privacidade.</p>
                    </div>
                    <div>
                        <h3>Direitos dos Usuários</h3>
                        <p>Você tem o direito de:</p>
                        <ul>
                            <li>Acessar, corrigir ou atualizar seus dados pessoais a qualquer momento através das configurações de sua conta.</li>
                            <li>Solicitar a exclusão de seus dados, o que resultará na exclusão da sua conta na plataforma.</li>
                            <li>Optar por não receber mais comunicações de marketing, ajustando suas preferências no painel de configurações ou através do link de cancelamento presente nos e-mails.</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Alterações à Política de Privacidade</h3>
                        <p>Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossos serviços ou em requisitos legais. Notificaremos os usuários sobre qualquer alteração substancial por meio de comunicação direta ou por meio de avisos na plataforma.</p>
                    </div>
                    <div>
                        <h3>Contato</h3>
                        <p>Se tiver qualquer dúvida ou preocupação sobre nossa Política de Privacidade, entre em contato conosco através do email de suporte fornecido em nossa plataforma.</p>
                    </div>
                    <div>
                        <h4>Esta Política de Privacidade entra em vigor a partir de 22/03/2025.</h4>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
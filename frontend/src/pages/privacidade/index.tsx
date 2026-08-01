import {
    Cookie,
    Database,
    Eye,
    FileText,
    LockKeyhole,
    Mail,
    Scale,
    Server,
    ShieldCheck,
    UserRound,
} from 'lucide-react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'

import styles from './styles.module.scss'

interface PrivacySection {
    id: string
    title: string
}

const sections: PrivacySection[] = [
    {
        id: 'dados-coletados',
        title: 'Dados coletados',
    },
    {
        id: 'finalidades',
        title: 'Como utilizamos os dados',
    },
    {
        id: 'bases-legais',
        title: 'Bases legais',
    },
    {
        id: 'pagamentos',
        title: 'Pagamentos',
    },
    {
        id: 'compartilhamento',
        title: 'Compartilhamento',
    },
    {
        id: 'cookies',
        title: 'Cookies e tecnologias',
    },
    {
        id: 'seguranca',
        title: 'Segurança e retenção',
    },
    {
        id: 'direitos',
        title: 'Direitos do titular',
    },
    {
        id: 'alteracoes',
        title: 'Alterações',
    },
    {
        id: 'contato',
        title: 'Contato',
    },
]

export default function Privacy() {
    return (
        <>
            <SEO
                title="Política de Privacidade | FlixNext"
                description="Saiba como a FlixNext coleta, utiliza, armazena e protege seus dados pessoais."
            />

            <Header />

            <main className={styles.page}>
                <header className={styles.hero}>
                    <span className={styles.eyebrow}>
                        Privacidade e proteção de dados
                    </span>

                    <div className={styles.heroIcon}>
                        <ShieldCheck
                            size={32}
                            aria-hidden="true"
                        />
                    </div>

                    <h1>Política de Privacidade</h1>

                    <p>
                        Este documento explica como a FlixNext coleta,
                        utiliza, armazena e protege os dados pessoais
                        tratados durante o uso da plataforma.
                    </p>

                    <div className={styles.update}>
                        <FileText
                            size={15}
                            aria-hidden="true"
                        />

                        <span>
                            Atualizada em{' '}
                            <time dateTime="2026-07-31">
                                31 de julho de 2026
                            </time>
                        </span>
                    </div>
                </header>

                <div className={styles.layout}>
                    <aside className={styles.navigation}>
                        <div className={styles.navigationHeader}>
                            <span>Neste documento</span>
                            <strong>Conteúdo da política</strong>
                        </div>

                        <nav aria-label="Seções da Política de Privacidade">
                            <ol>
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`}>
                                            <span>
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>

                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </aside>

                    <article className={styles.content}>
                        <section className={styles.introduction}>
                            <h2>Nosso compromisso</h2>

                            <p>
                                A FlixNext procura tratar somente os dados
                                necessários para disponibilizar a plataforma,
                                administrar contas, processar assinaturas,
                                oferecer suporte e cumprir obrigações legais.
                            </p>

                            <p>
                                O tratamento de dados pessoais observa os
                                princípios de finalidade, necessidade,
                                transparência, segurança e prevenção
                                estabelecidos pela Lei Geral de Proteção de
                                Dados Pessoais.
                            </p>
                        </section>

                        <section
                            id="dados-coletados"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <UserRound
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 01</small>
                                    <h2>Dados pessoais coletados</h2>
                                </div>
                            </div>

                            <p>
                                Os dados coletados dependem da forma como o
                                usuário interage com a plataforma e dos
                                recursos utilizados.
                            </p>

                            <h3>Dados cadastrais</h3>

                            <ul>
                                <li>Nome e endereço de e-mail;</li>
                                <li>Senha armazenada de forma protegida;</li>
                                <li>
                                    CPF e telefone, quando
                                    necessários para cadastro ou pagamento;
                                </li>
                                <li>
                                    Endereço de cobrança, quando exigido pelo
                                    método de pagamento.
                                </li>
                            </ul>

                            <h3>Dados de utilização</h3>

                            <ul>
                                <li>
                                    Conteúdos acessados, favoritos e itens
                                    adicionados à lista;
                                </li>
                                <li>
                                    Progresso de filmes e episódios assistidos;
                                </li>
                                <li>
                                    Preferências de idioma, áudio, legenda e
                                    reprodução;
                                </li>
                                <li>
                                    Datas, horários e registros relacionados ao
                                    acesso à conta.
                                </li>
                            </ul>

                            <h3>Dados técnicos</h3>

                            <ul>
                                <li>
                                    Endereço IP, tipo de navegador e
                                    dispositivo;
                                </li>
                                <li>
                                    Registros de erro, segurança e desempenho;
                                </li>
                                <li>
                                    Cookies, tokens de autenticação e
                                    identificadores de sessão.
                                </li>
                            </ul>
                        </section>

                        <section
                            id="finalidades"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Eye
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 02</small>
                                    <h2>Como utilizamos os dados</h2>
                                </div>
                            </div>

                            <p>
                                Os dados pessoais podem ser utilizados para:
                            </p>

                            <ul>
                                <li>Criar e administrar a conta do usuário;</li>
                                <li>
                                    Autenticar acessos e prevenir utilização
                                    indevida da conta;
                                </li>
                                <li>
                                    Processar pagamentos, cobranças e
                                    assinaturas;
                                </li>
                                <li>
                                    Registrar favoritos, preferências e
                                    progresso de reprodução;
                                </li>
                                <li>
                                    Personalizar funcionalidades relacionadas
                                    ao uso da plataforma;
                                </li>
                                <li>
                                    Enviar comunicações essenciais sobre a
                                    conta, assinatura ou segurança;
                                </li>
                                <li>
                                    Prestar suporte e responder às solicitações
                                    dos usuários;
                                </li>
                                <li>
                                    Identificar falhas, melhorar o desempenho e
                                    proteger a infraestrutura;
                                </li>
                                <li>
                                    Cumprir obrigações legais, regulatórias ou
                                    judiciais.
                                </li>
                            </ul>

                            <div className={styles.notice}>
                                <ShieldCheck
                                    size={20}
                                    aria-hidden="true"
                                />

                                <p>
                                    A FlixNext não vende dados pessoais. O uso
                                    das informações é limitado às finalidades
                                    descritas nesta política.
                                </p>
                            </div>
                        </section>

                        <section
                            id="bases-legais"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Scale
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 03</small>
                                    <h2>Bases legais do tratamento</h2>
                                </div>
                            </div>

                            <p>
                                Conforme a finalidade, o tratamento poderá ser
                                realizado com fundamento nas seguintes bases
                                legais:
                            </p>

                            <ul>
                                <li>
                                    Execução de contrato ou de procedimentos
                                    relacionados à contratação do serviço;
                                </li>
                                <li>
                                    Cumprimento de obrigação legal ou
                                    regulatória;
                                </li>
                                <li>
                                    Exercício regular de direitos em processos;
                                </li>
                                <li>
                                    Legítimo interesse, observados os direitos e
                                    as expectativas do titular;
                                </li>
                                <li>
                                    Consentimento, quando ele for necessário.
                                </li>
                            </ul>
                        </section>

                        <section
                            id="pagamentos"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <LockKeyhole
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 04</small>
                                    <h2>Dados de pagamento</h2>
                                </div>
                            </div>

                            <p>
                                Os pagamentos são processados com o auxílio de
                                intermediadores especializados. Esses
                                prestadores podem receber os dados necessários
                                para validar o pagador, processar cobranças e
                                prevenir fraudes.
                            </p>

                            <p>
                                A FlixNext pode armazenar identificadores da
                                cobrança, método utilizado, situação do
                                pagamento, valores e datas da transação.
                                Dados completos do cartão, como número e código
                                de segurança, não são armazenados pela
                                plataforma em nenhuma etapa.
                            </p>
                        </section>

                        <section
                            id="compartilhamento"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Server
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 05</small>
                                    <h2>Compartilhamento de dados</h2>
                                </div>
                            </div>

                            <p>
                                Os dados poderão ser compartilhados, de maneira
                                limitada, com prestadores necessários à
                                operação, incluindo:
                            </p>

                            <ul>
                                <li>
                                    Serviços de hospedagem, banco de dados e
                                    armazenamento;
                                </li>
                                <li>
                                    Intermediadores de pagamento e mecanismos
                                    de prevenção a fraudes;
                                </li>
                                <li>
                                    Serviços de envio de e-mails e suporte;
                                </li>
                                <li>
                                    Prestadores de monitoramento, segurança e
                                    desempenho;
                                </li>
                                <li>
                                    Autoridades públicas, quando houver
                                    obrigação legal ou determinação válida.
                                </li>
                            </ul>

                            <p>
                                Cada prestador recebe somente as informações
                                necessárias à execução de sua atividade,
                                observadas as obrigações aplicáveis de
                                privacidade e segurança.
                            </p>
                        </section>

                        <section
                            id="cookies"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Cookie
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 06</small>
                                    <h2>Cookies e tecnologias semelhantes</h2>
                                </div>
                            </div>

                            <p>
                                A plataforma utiliza cookies e armazenamento
                                local para manter sessões autenticadas,
                                preservar preferências, garantir segurança e
                                permitir o funcionamento de recursos
                                essenciais.
                            </p>

                            <p>
                                A desativação de cookies essenciais poderá
                                impedir o acesso à conta ou o funcionamento de
                                determinadas funcionalidades.
                            </p>
                        </section>

                        <section
                            id="seguranca"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Database
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 07</small>
                                    <h2>Segurança e retenção</h2>
                                </div>
                            </div>

                            <p>
                                A FlixNext adota medidas técnicas e
                                administrativas destinadas a reduzir riscos de
                                acesso não autorizado, perda, alteração ou
                                divulgação indevida de dados.
                            </p>

                            <p>
                                Nenhum sistema é completamente imune a
                                incidentes. Caso seja identificado um evento
                                relevante envolvendo dados pessoais, serão
                                adotadas as providências exigidas pela
                                legislação aplicável.
                            </p>

                            <p>
                                Os dados são mantidos durante o período
                                necessário para prestar o serviço, cumprir
                                obrigações legais, exercer direitos ou atender
                                às demais finalidades legítimas desta política.
                                Após esse período, poderão ser excluídos ou
                                anonimizados.
                            </p>
                        </section>

                        <section
                            id="direitos"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <UserRound
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 08</small>
                                    <h2>Direitos do titular</h2>
                                </div>
                            </div>

                            <p>
                                Nos termos da LGPD, o titular poderá solicitar,
                                quando aplicável:
                            </p>

                            <ul>
                                <li>
                                    Confirmação da existência de tratamento;
                                </li>
                                <li>Acesso aos dados pessoais;</li>
                                <li>
                                    Correção de dados incompletos, inexatos ou
                                    desatualizados;
                                </li>
                                <li>
                                    Anonimização, bloqueio ou eliminação de
                                    dados desnecessários ou irregulares;
                                </li>
                                <li>
                                    Informações sobre o compartilhamento de
                                    dados;
                                </li>
                                <li>
                                    Portabilidade, conforme regulamentação
                                    aplicável;
                                </li>
                                <li>
                                    Eliminação de dados tratados com
                                    consentimento, quando cabível;
                                </li>
                                <li>
                                    Revogação do consentimento e oposição ao
                                    tratamento, quando aplicável;
                                </li>
                                <li>
                                    Revisão de decisões tomadas exclusivamente
                                    com base em tratamento automatizado.
                                </li>
                            </ul>

                            <p>
                                Algumas informações poderão ser mantidas mesmo
                                após uma solicitação de exclusão quando sua
                                conservação for necessária para cumprir
                                obrigação legal, regulatória ou exercer
                                direitos.
                            </p>
                        </section>

                        <section
                            id="alteracoes"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <FileText
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 09</small>
                                    <h2>Alterações nesta política</h2>
                                </div>
                            </div>

                            <p>
                                Esta política poderá ser atualizada para
                                refletir mudanças na plataforma, nos
                                prestadores utilizados ou na legislação. A data
                                da revisão mais recente será informada no
                                início do documento.
                            </p>

                            <p>
                                Quando uma alteração for relevante, a FlixNext
                                poderá comunicá-la por meio da própria
                                plataforma ou pelo endereço de e-mail
                                cadastrado.
                            </p>
                        </section>

                        <section
                            id="contato"
                            className={styles.section}
                        >
                            <div className={styles.sectionTitle}>
                                <span>
                                    <Mail
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </span>

                                <div>
                                    <small>Seção 10</small>
                                    <h2>Contato sobre privacidade</h2>
                                </div>
                            </div>

                            <p>
                                Para exercer seus direitos ou esclarecer
                                dúvidas relacionadas ao tratamento de dados
                                pessoais, entre em contato pelo endereço:
                            </p>

                            <a
                                className={styles.contact}
                                href="mailto:contato@flixnext.com.br?subject=Privacidade e proteção de dados"
                            >
                                <Mail
                                    size={19}
                                    aria-hidden="true"
                                />

                                <span>
                                    <small>Canal de privacidade</small>
                                    <strong>
                                        contato@flixnext.com.br
                                    </strong>
                                </span>
                            </a>
                        </section>

                        <footer className={styles.documentFooter}>
                            <ShieldCheck
                                size={18}
                                aria-hidden="true"
                            />

                            <p>
                                Esta Política de Privacidade entra em vigor em
                                31 de julho de 2026 e substitui versões
                                anteriores.
                            </p>
                        </footer>
                    </article>
                </div>
            </main>

            <Footer />
        </>
    )
}
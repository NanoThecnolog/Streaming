import {
  Ban,
  CircleDollarSign,
  CircleHelp,
  Copyright,
  FileText,
  Gavel,
  Library,
  LockKeyhole,
  Mail,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserRound,
  WifiOff,
} from 'lucide-react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'

import styles from './styles.module.scss'

interface TermsSection {
  id: string
  title: string
}

const sections: TermsSection[] = [
  {
    id: 'servico',
    title: 'Serviço oferecido',
  },
  {
    id: 'aceitacao',
    title: 'Aceitação dos termos',
  },
  {
    id: 'cadastro',
    title: 'Cadastro e conta',
  },
  {
    id: 'planos',
    title: 'Planos e pagamentos',
  },
  {
    id: 'cancelamento',
    title: 'Cancelamento e reembolso',
  },
  {
    id: 'uso-permitido',
    title: 'Uso permitido',
  },
  {
    id: 'conteudo',
    title: 'Conteúdo e propriedade intelectual',
  },
  {
    id: 'disponibilidade',
    title: 'Disponibilidade',
  },
  {
    id: 'suspensao',
    title: 'Suspensão e encerramento',
  },
  {
    id: 'responsabilidade',
    title: 'Responsabilidades',
  },
  {
    id: 'alteracoes',
    title: 'Alterações',
  },
  {
    id: 'legislacao',
    title: 'Legislação e contato',
  },
]

export default function PageUserTerms() {
  return (
    <>
      <SEO
        title="Termos de Uso | FlixNext"
        description="Conheça as condições para cadastro, assinatura e utilização da plataforma FlixNext."
      />

      <Header />

      <main className={styles.page}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>Condições de utilização</span>

          <div className={styles.heroIcon}>
            <FileText size={32} aria-hidden="true" />
          </div>

          <h1>Termos de Uso</h1>

          <p>
            Este documento estabelece as condições para criação de conta, contratação de planos e
            utilização dos recursos disponibilizados pela FlixNext.
          </p>

          <div className={styles.update}>
            <RefreshCw size={15} aria-hidden="true" />

            <span>
              Atualizados em <time dateTime="2026-07-31">31 de julho de 2026</time>
            </span>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.navigation}>
            <div className={styles.navigationHeader}>
              <span>Neste documento</span>
              <strong>Conteúdo dos termos</strong>
            </div>

            <nav aria-label="Seções dos Termos de Uso">
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{String(index + 1).padStart(2, '0')}</span>

                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className={styles.content}>
            <section className={styles.introduction}>
              <h2>Antes de utilizar a plataforma</h2>

              <p>
                Ao criar uma conta, contratar um plano ou utilizar a FlixNext, o usuário declara ter
                lido e concordado com estes Termos de Uso e com a Política de Privacidade.
              </p>

              <p>
                Caso não concorde com alguma condição, o usuário não deverá concluir o cadastro ou
                continuar utilizando a plataforma.
              </p>
            </section>

            <section id="servico" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <Library size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 01</small>
                  <h2>Serviço oferecido</h2>
                </div>
              </div>

              <p>
                A FlixNext é uma plataforma digital que oferece funcionalidades relacionadas à
                navegação, organização e reprodução de um catálogo de conteúdos audiovisuais.
              </p>

              <p>
                Os recursos disponíveis podem incluir criação de listas, favoritos, registro do
                progresso assistido, preferências de reprodução e recomendações de conteúdo.
              </p>

              <p>
                A quantidade de títulos, as funcionalidades, a compatibilidade com dispositivos e
                demais características do serviço podem ser alteradas ao longo do tempo.
              </p>
            </section>

            <section id="aceitacao" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <ShieldCheck size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 02</small>
                  <h2>Aceitação e capacidade</h2>
                </div>
              </div>

              <p>
                Ao aceitar estes termos, o usuário declara possuir capacidade legal para realizar o
                cadastro e contratar o serviço.
              </p>

              <p>
                Quando a legislação exigir representação ou assistência, o cadastro e a contratação
                deverão ser realizados com autorização do responsável legal.
              </p>

              <p>
                O usuário também declara que as informações fornecidas são verdadeiras e que
                utilizará a plataforma de acordo com a legislação aplicável.
              </p>
            </section>

            <section id="cadastro" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <UserRound size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 03</small>
                  <h2>Cadastro e segurança da conta</h2>
                </div>
              </div>

              <p>
                Para acessar determinadas funcionalidades, será necessário criar uma conta e
                fornecer os dados solicitados durante o cadastro.
              </p>

              <ul>
                <li>Cada usuário deverá manter apenas as contas permitidas pela plataforma;</li>

                <li>Os dados cadastrais deverão permanecer corretos e atualizados;</li>

                <li>A senha deve ser mantida em sigilo e não deve ser compartilhada;</li>

                <li>A conta é pessoal e não poderá ser cedida, comercializada ou transferida;</li>

                <li>
                  A FlixNext deverá ser informada caso exista suspeita de acesso não autorizado.
                </li>
              </ul>

              <p>
                O usuário é responsável pelas atividades realizadas por meio de sua conta enquanto
                não comunicar eventual comprometimento das credenciais.
              </p>
            </section>

            <section id="planos" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <CircleDollarSign size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 04</small>
                  <h2>Planos, cobrança e pagamentos</h2>
                </div>
              </div>

              <p>
                O acesso aos recursos indicados como pagos depende da contratação de um dos planos
                apresentados pela FlixNext.
              </p>

              <p>
                Antes da confirmação, serão informados o valor, período de vigência, forma de
                pagamento e demais condições aplicáveis ao plano escolhido.
              </p>

              <ul>
                <li>Os pagamentos poderão ser processados por intermediadores externos;</li>

                <li>A liberação do acesso poderá depender da confirmação do pagamento;</li>

                <li>Boletos e outros métodos podem possuir prazo adicional de compensação;</li>

                <li>
                  Pagamentos recusados, cancelados ou não confirmados não geram obrigação de liberar
                  ou manter o acesso;
                </li>

                <li>
                  Tributos e encargos aplicáveis estarão incluídos ou serão apresentados antes da
                  contratação.
                </li>
              </ul>

              <h3>Renovação</h3>

              <p>
                Caso o plano possua renovação automática, essa condição será apresentada antes da
                contratação. A cobrança será realizada conforme a periodicidade escolhida até que o
                usuário solicite o cancelamento.
              </p>

              <p>
                Alterações de preço serão comunicadas previamente quando exigido, permitindo que o
                usuário avalie a continuidade da assinatura.
              </p>
            </section>

            <section id="cancelamento" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <CircleHelp size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 05</small>
                  <h2>Cancelamento e reembolso</h2>
                </div>
              </div>

              <p>
                O usuário poderá solicitar o cancelamento pelos meios disponibilizados no painel da
                conta ou pelo canal de suporte.
              </p>

              <p>
                Quando houver renovação recorrente, o cancelamento impedirá cobranças futuras. Salvo
                indicação diferente durante o processo, o acesso permanecerá disponível até o
                encerramento do período já pago.
              </p>

              <p>
                Solicitações de reembolso serão avaliadas de acordo com a legislação aplicável, com
                as condições apresentadas na contratação e com as circunstâncias da solicitação.
              </p>

              <div className={styles.notice}>
                <Scale size={20} aria-hidden="true" />

                <p>
                  Nenhuma disposição destes termos limita direitos obrigatórios assegurados ao
                  consumidor, incluindo o direito de arrependimento quando legalmente aplicável.
                </p>
              </div>
            </section>

            <section id="uso-permitido" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <LockKeyhole size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 06</small>
                  <h2>Uso permitido e condutas proibidas</h2>
                </div>
              </div>

              <p>
                A conta e o conteúdo disponibilizado destinam-se ao uso pessoal e privado, dentro
                das funcionalidades oferecidas pela plataforma.
              </p>

              <p>É proibido:</p>

              <ul>
                <li>
                  Redistribuir, retransmitir, comercializar ou exibir publicamente o conteúdo;
                </li>

                <li>
                  Capturar, copiar ou baixar conteúdo por meios não disponibilizados oficialmente;
                </li>

                <li>Compartilhar, vender ou alugar credenciais de acesso;</li>

                <li>
                  Contornar controles de acesso, limitações técnicas ou mecanismos de segurança;
                </li>

                <li>Utilizar robôs, scrapers ou automações sem autorização;</li>

                <li>Realizar engenharia reversa ou explorar vulnerabilidades da plataforma;</li>

                <li>
                  Introduzir código malicioso ou interferir no funcionamento da infraestrutura;
                </li>

                <li>
                  Utilizar a plataforma para praticar atos ilícitos ou violar direitos de terceiros.
                </li>
              </ul>
            </section>

            <section id="conteudo" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <Copyright size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 07</small>
                  <h2>Conteúdo e propriedade intelectual</h2>
                </div>
              </div>

              <p>
                Marcas, identidade visual, código, interfaces, textos institucionais e demais
                elementos próprios da FlixNext são protegidos pela legislação aplicável.
              </p>

              <p>
                Obras audiovisuais, imagens, sinopses, marcas e materiais pertencentes a terceiros
                permanecem vinculados aos seus respectivos titulares.
              </p>

              <p>
                A contratação de um plano concede somente uma autorização limitada, pessoal,
                temporária, revogável e não transferível para utilização da plataforma. Nenhum
                direito de propriedade sobre o conteúdo é transferido ao usuário.
              </p>

              <p>
                Comunicações relacionadas a direitos autorais ou pedidos fundamentados de remoção
                poderão ser encaminhados ao canal de contato indicado ao final destes termos.
              </p>
            </section>

            <section id="disponibilidade" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <WifiOff size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 08</small>
                  <h2>Disponibilidade e alterações do serviço</h2>
                </div>
              </div>

              <p>
                A FlixNext procura manter a plataforma disponível e funcional, mas não garante
                funcionamento ininterrupto ou ausência completa de erros.
              </p>

              <p>
                Poderão ocorrer indisponibilidades decorrentes de manutenção, atualizações, falhas
                de fornecedores, ataques, problemas de conectividade ou eventos fora do controle
                razoável da plataforma.
              </p>

              <p>
                O catálogo é dinâmico. Títulos podem ser adicionados, substituídos ou removidos por
                questões técnicas, contratuais, operacionais ou legais, sem garantia de
                disponibilidade permanente de uma obra específica.
              </p>

              <p>
                Funcionalidades também poderão ser atualizadas, substituídas ou descontinuadas,
                preservados os direitos obrigatórios dos usuários.
              </p>
            </section>

            <section id="suspensao" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <Ban size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 09</small>
                  <h2>Suspensão e encerramento da conta</h2>
                </div>
              </div>

              <p>
                O acesso poderá ser temporariamente restringido quando necessário para proteger a
                conta, investigar possível fraude, corrigir falhas de pagamento ou impedir riscos à
                plataforma.
              </p>

              <p>
                A conta também poderá ser suspensa ou encerrada em caso de violação destes termos,
                uso ilícito, tentativa de fraude, compartilhamento indevido de acesso ou
                interferência na infraestrutura.
              </p>

              <p>
                Sempre que adequado e legalmente exigido, o usuário será informado sobre o motivo e
                poderá entrar em contato para solicitar esclarecimentos ou contestar a medida.
              </p>

              <p>
                O próprio usuário poderá solicitar a exclusão da conta. A conservação de
                determinados registros poderá ocorrer quando necessária para cumprimento de
                obrigação legal ou exercício de direitos, conforme explicado na Política de
                Privacidade.
              </p>
            </section>

            <section id="responsabilidade" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <Gavel size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 10</small>
                  <h2>Responsabilidades e garantias</h2>
                </div>
              </div>

              <p>
                O usuário é responsável por possuir conexão, dispositivo, navegador e demais
                recursos compatíveis com os requisitos técnicos da plataforma.
              </p>

              <p>
                A FlixNext não se responsabiliza por indisponibilidades causadas exclusivamente por
                equipamentos do usuário, conexão de internet, configurações locais ou serviços
                externos sobre os quais não possua controle.
              </p>

              <p>
                Nada nesta seção exclui ou restringe responsabilidades que não possam ser afastadas
                pela legislação brasileira.
              </p>
            </section>

            <section id="alteracoes" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <RefreshCw size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 11</small>
                  <h2>Alterações nestes termos</h2>
                </div>
              </div>

              <p>
                Estes termos poderão ser atualizados para refletir alterações legais, operacionais
                ou nos recursos oferecidos pela plataforma.
              </p>

              <p>
                A versão vigente e a data da última atualização permanecerão disponíveis nesta
                página. Alterações relevantes poderão ser comunicadas pela plataforma ou pelo e-mail
                cadastrado.
              </p>

              <p>
                Quando uma alteração exigir nova manifestação de concordância, o usuário será
                solicitado a aceitá-la antes de continuar utilizando o serviço.
              </p>
            </section>

            <section id="legislacao" className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>
                  <Scale size={20} aria-hidden="true" />
                </span>

                <div>
                  <small>Seção 12</small>
                  <h2>Legislação aplicável e contato</h2>
                </div>
              </div>

              <p>
                Estes termos são regidos pela legislação brasileira. Eventuais conflitos serão
                resolvidos pelos meios legalmente competentes, respeitado o foro assegurado ao
                consumidor quando aplicável.
              </p>

              <p>
                Para solicitar suporte, cancelamento, exercer direitos ou esclarecer dúvidas sobre
                estes termos, entre em contato pelo endereço:
              </p>

              <a
                className={styles.contact}
                href="mailto:contato@flixnext.com.br?subject=Termos de Uso"
              >
                <Mail size={19} aria-hidden="true" />

                <span>
                  <small>Canal de atendimento</small>
                  <strong>contato@flixnext.com.br</strong>
                </span>
              </a>
            </section>

            <footer className={styles.documentFooter}>
              <ShieldCheck size={18} aria-hidden="true" />

              <p>
                Estes Termos de Uso entram em vigor em 31 de julho de 2026 e substituem as versões
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

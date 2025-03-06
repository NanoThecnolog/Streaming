import Questions from '@/components/Questions'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export interface FAQ {
    question: string,
    answer: string
}

export default function FAQ() {

    const faq: FAQ[] = [
        {
            question: "O que é o Projeto FlixNext?",
            answer: "O projeto FlixNext foi criado com o proposito de facilitar e permitir o acesso a filmes e séries. A ideia inicial era criar algo que pudesse ser compartilhado entre família e amigos. </br></br> Hoje, o propósito é facilitar o acesso para aqueles que não possuem condições financeiras para manter os planos caríssimos de outras plataformas de streamings, ou alugar filmes e séries por aí. Além de evitar que o usuário se exponha a ataques na internet, entrando em sites maliciosos, a procura do filme ou série para baixar, a plataforma entrega de forma segura os conteúdos."
        },
        {
            question: "Como faço para criar uma conta?",
            answer: "Para criar sua conta é preciso se cadastrar na plataforma. </br></br> É rápido e fácil, só precisa preencher seus dados e usar um email válido. Após criar sua conta no nosso site, você receberá um email com um link para ativação da conta. Após ativar sua conta, basta fazer o login na plataforma e aproveitar!"
        },
        {
            question: "Por que preciso ativar minha conta?",
            answer: "Precisamos validar seu email para que sua conta fique ativa. Essa validação é um meio de segurança para que o uso não autorizado do seu email seja evitado."
        },
        {
            question: "Não consigo assistir ao filme/série, o que faço?",
            answer: `Caso esteja enfrentando problemas, entre em contato conosco através do email: <a href="mailto:contato@ericssongomes.com" style="color: red;">contato@ericssongomes.com</a> . Nosso suporte é 24h, todos os dias.`
        },
        {
            question: "De onde vêm os filmes e séries que assisto?",
            answer: "Os arquivos dos filmes são disponibilizados principalmente por terceiros. Por esse motivo, não possuímos controle total ou responsabilidade sobre os arquivos incorporados à plataforma. Porém, a nossa equipe analisa e verifica todos os arquivos que disponibilizamos, garantindo o máximo de segurança e disponibilidade."
        },
        {
            question: "Nos filmes e séries legendados, como ativar a legenda?",
            answer: "Na maioria dos filmes e séries legendados, a legenda já vem embutida e não é necessário ativá-la. Porém, nos casos em que a legenda não está ativa, pode ativá-la nos controles, abaixo da linha de duração do vídeo. Se tiver problemas, entre em contato conosco."
        },
        {
            question: "Posso pedir ou indicar que acrescente algum filme ou série específico ao catálogo?",
            answer: "Sim, você pode! Primeiro busque na plataforma para ter certeza que não tem no catálogo. Com sua conta ativa, clique no seu avatar no menu superior para abrir o menu da conta, depois clique em Solicitar Filme/Série. Busque pelo nome do filme ou série que você gostaria de ver aqui na plataforma, localize nos resultados e clique no botão de solicitar! Caso não encontre o que procura, Envie um email para contato@ericssongomes.com com as informações do filme/série (nome e ano de lançamento) e tentaremos adicioná-lo ao catálogo."
        },
        {
            question: "A plataforma é paga?",
            answer: "Sim! Você paga pelo acesso a plataforma. O valor é simbólico se comparado a tudo que você pode usurfrir na plataforma. </br></br>Por apenas <strong style='color: green'>R$10,99</strong> você tem acesso ao conteúdo que só encontramos em plataformas de streaming (as vezes nem lá...). Muitos dos filmes e séries presentes aqui não são encontrados em nenhum outro lugar, e esse é o nosso diferencial!</br></br> Temos 3 modalidades de planos (mensal, trimestral, anual). Para saber mais sobre nossos planos, <a href=''>clique aqui</a>."
        },
        {
            question: "Como posso ajudar o projeto?",
            answer: "Você pode ajudar enviando sugestões ou reclamações para nós através do email <a href='mailto:contato@ericssongomes.com'> contato@ericssongomes.com</a >. Sua opinião ajuda, e muito, o nosso trabalho."
        },
    ]
    return (
        <>
            <SEO title='FAQ | FlixNext' description='Perguntas frequêntes dos nossos usuários' />
            <Header />
            <section className={styles.container}>
                <div className={styles.faqContainer}>
                    <div className={styles.title}>
                        <h1>{"perguntas frequentes - faq".toUpperCase()}</h1>
                    </div>
                    <div className={styles.questionsContainer}>
                        {faq.map((item, index) => (
                            <Questions
                                key={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
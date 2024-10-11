import Questions from '@/components/Questions'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { serverStatus } from '@/services/verifyStatusServer'

export interface FAQ {
    question: string,
    answer: string
}

export default function FAQ(status: { status: string }) {

    const faq: FAQ[] = [
        {
            question: "O que é o Projeto FlixNext?",
            answer: "O projeto FlixNext foi criado com o proposito de facilitar e permitir o acesso a filmes e séries por pessoas que não possuem condições de pagar os valores cobrados pelos streamings polulares. A ideia era criar algo que pudesse ser compartilhado entre família e amigos."
        },
        {
            question: "Como faço para assistir um filme ou série?",
            answer: "Para assistir é preciso estar logado na sua conta. Ao escolher seu filme e clicar no botão de play, você será redirecionado para tela de login, basta fazer o login ou, se não tiver uma conta, se cadastrar na plataforma. É rápido e fácil, só precisa colocar seu nome, sua data de nascimento, um email válido e criar uma senha para sua conta. Após criar sua conta no nosso site, você receberá um email com um link para ativação da conta, ative e pronto, é só fazer o login na plataforma e clicar em play novamente!"
        },
        {
            question: "Por que preciso ativar minha conta?",
            answer: "Precisamos validar seu email para que sua conta se torne ativa. Essa validação é um meio de segurança tanto para a plataforma quanto para o usuário, para que outros não utilizem seu email para criar contas sem o seu conhecimento."
        },
        {
            question: "Não consigo assistir ao filme/série, o que faço?",
            answer: "Caso não consiga assistir um filme ou série por alguma razão, peço que entre em contato conosco através do email: dev@ericssongomes.com com o nome do filme ou episódio da série em questão e tentaremos te ajudar."
        },
        {
            question: "De onde vêm os filmes e séries que assisto?",
            answer: "Os arquivos dos filmes são disponibilizados através da plataforma Google Drive por terceiros. Por esse motivo, não possuímos controle ou responsabilidade sobre os arquivos incorporados à plataforma."
        },
        {
            question: "Posso pedir ou indicar que acrescentem algum filme específico ao catálogo?",
            answer: "Sim, você pode! Envie um email para dev@ericssongomes.com com as informações do filme/série (nome e ano de lançamento) e tentaremos adicioná-lo ao catálogo."
        },
        {
            question: "A plataforma é paga?",
            answer: "Não! Não realizamos cobranças, nem exigimos pagamentos para criar sua conta. Como os filmes e séries são disponibilizados por terceiros, não possuímos responsabilidade pelos mesmos e não temos direitos ou liçensas comerciais para tal. O propósito é justamente facilitar o acesso a conteúdos para aqueles que não possuem condições financeiras para pagar streamings ou alugar filmes e séries por aí. Ao invés de se expor a ataques na internet entrando em sites maliciosos procurando o arquivo para baixar, a plataforma entrega de forma gratuita, segura e livre os conteúdos para que todos possam assistir."
        },
        {
            question: "Como posso ajudar o projeto?",
            answer: "Você pode ajudar realizando uma doação ao projeto fazendo um pix! As chaves disponíveis são: <ul><li>email: <strong>dev@ericssongomes.com</strong></li> <li>chave-aleatória: <strong>69d28ddb-5447-44ec-997a-71be04038409</strong></li></ul> Qualquer valor é bem vindo, sinta-se livre para contribuir como quiser. Você estará me ajudando e ajudando com os custos de hospedagem do projeto."
        },
    ]
    return (
        <>
            <Head>
                <title>FAQ | FlixNext</title>
                <meta name="description" content="Perguntas frequêntes dos nossos usuários" />
            </Head>
            <Header status={status} />
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



import Questions from '@/components/Questions'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export interface FAQ {
    question: string,
    answer: string
}

export default function FAQ() {
    const faq: FAQ[] = [
        {
            question: "O que é o FlixNext?",
            answer: "O projeto FlixNext foi criado com o proposito de facilitar o acesso aos filmes que gostamos e amamos. A ideia era criar algo e compartilhar entre amigos para que eles tenham um acesso mais fácil e rápido a filmes no computador, na tv ou no celular"
        },
        {
            question: "Como faço para assistir a algum filme?",
            answer: "Para assistir é preciso estar logado na sua conta. Ao escolher seu filme e clicar no botão de play, você será redirecionado para tela de login, basta fazer o login ou, se não tiver uma conta, se cadastrar na plataforma. É rápido e fácil, só precisa colocar seu nome, sua data de nascimento, um email válido e criar uma senha para sua conta. Após criar sua conta no nosso site, você receberá um email com um link para ativação da conta, ative e pronto, é só fazer o login na plataforma e clicar em play novamente!"
        },
        {
            question: "Não consigo assistir ao filme, o que faço?",
            answer: "Caso não consiga assistir a algum filme por alguma razão, peço que entre em contato conosco através do email: dev@ericssongomes.com e explique o ocorrido."
        },
        {
            question: "De onde vêm os filmes que assisto?",
            answer: "Os arquivos dos filmes são disponibilizados através do Drive do Google por terceiros. Por esse motivo, não possuímos controle ou responsabilidade sobre os arquivos incorporados ao nosso site."
        },
        {
            question: "Posso pedir ou indicar que acrescentem algum filme específico ao catálogo?",
            answer: "Sim, você pode! Envie um email para dev@ericssongomes.com com as informações do filme (nome e ano de lançamento) e tentaremos adicioná-lo ao catálogo."
        },
        {
            question: "A plataforma é paga?",
            answer: "Não! Não realizamos cobranças, nem exigimos pagamentos para criar sua conta. Como os filmes são disponibilizados por terceiros, não possuímos responsabilidade pelos mesmos e não temos direitos ou liçensas comerciais para tal. A plataforma é gratúita e livre pra todos usurfruírem."
        },
        {
            question: "Como posso ajudar o projeto?",
            answer: "Você pode ajudar realizando uma doação ao projeto fazendo um pix! As chaves disponíveis são: email: dev@ericssongomes.com , chave-aleatória: 69d28ddb-5447-44ec-997a-71be04038409 . Qualquer valor é bem vindo, sinta-se livre para contribuir como quiser. Você estará me ajudando e ajudando com os custos de hospedagem do projeto."
        },
    ]
    return (
        <>
            <Header />
            <section className={styles.container}>
                <div className={styles.faqContainer}>
                    <div className={styles.title}>
                        <h1>Perguntas frequentes</h1>
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


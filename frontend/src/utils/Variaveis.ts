//import { cards } from "@/data/cards"
//import { series } from "@/data/series"
import { mongoService } from "@/classes/MongoContent"
import { FAQ } from "@/pages/faq"

export const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: '/',
}
export const avatares = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.rNB7dRXNr_bc-QBtmKKSOQAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=1be26557538abe169ec2a999323ac52962edfc4bad0a275ea162700699f935d9&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP._1uY1oOBX100k4M7dawzCgAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=934100d98edfc9fa6eec360c8e41ea29bf290334ead64c5116974c69cf31610e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.x7P2AOw64cuakMxtkamYGgAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=45e3eba9c95c30bdfa633a3c53d1ec392a96ece1b9f796b37395257e8032b868&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.tJyI68Iw7tzLR6W2EtlfrwAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=b5f5e921f89024cb1e4ae15b12ef14999aa1692307278315d69f5e0b5c5c0c04&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.zqNHr_Wa5RXQ_mwlw2gLJwHaHi%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=630b31e820384bd6f8648b983cf93a01611193e18c5d2fe6b8048f8fda1937d2&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.woueb.net%2Fimages%2Fmanga%2Fromain-manga.jpg&f=1&nofb=1&ipt=44ff213852ef9a7bbcf72a0c9e624c3e2a880f7e2c5852e751ff6a047b5d561e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ik64bZYvKVs%2FTqmIccMI0gI%2FAAAAAAAAAgk%2FKhs8LaJTzPg%2Fs1600%2Favatar3.PNG&f=1&nofb=1&ipt=bdf3f948941d1dcc7ff7df54560175d3a814fe3f015e2fcfdfcca9ec8cb08888&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F94%2Ff6%2Fa6%2F94f6a63dd9704cae40c3675fe8e7409f.png&f=1&nofb=1&ipt=0d9db133e6d1e4636668e15cc5f409567d72cf9d7099647434e9fe9f582198e7&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_X0x5Kbc6cU4%2FSD62SRkO0mI%2FAAAAAAAAAHM%2FWMKHvjyRlzU%2Fs200%2Fmetalozaru%2540gmail.com_20080529_75244834.jpg&f=1&nofb=1&ipt=ee67735d2f8e8e471fd3e5c6cff4ec4abbbf39701762e9d6ac216c99c1b46430&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.giardiniblog.it%2Fwp-content%2Fuploads%2F2009%2F02%2Fmangavatar.jpg&f=1&nofb=1&ipt=c75632be0173882a8ecf16fd1985f61c7b33c55adf3c39b89d4b50947fd6e879&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-3sSGU0Zkaqs%2FTenH0sC3YZI%2FAAAAAAAAAFg%2FK-NBKWorVXE%2Fs1600%2FAVATAR%2BSILVIA.jpg&f=1&nofb=1&ipt=0c92d97c1a82b264fbd78ef56dc567541e95c5d8e3e6b089c82cd6ebe8830b7e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthypix.com%2Fwp-content%2Fuploads%2F2021%2F10%2Fmanga-profile-picture-92-150x150.jpg&f=1&nofb=1&ipt=f23e792a0b68556d2a391bb33d9e80fa7dc8297aa087d42c89e7ce139f7acd8e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.polymerclaydaily.com%2Fimages%2Ftinapple_manga.jpg&f=1&nofb=1&ipt=c269e6060e950e008a2c0e2631ed18779fc93f95efab9092debd744757ae8907&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F275%2F847%2Foriginal%2Fmale-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg&f=1&nofb=1&ipt=6e0ae00a4e223ccdf20fd5deae051af89d4a4e9b1002e1ff36d6e1345a4674ea&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fdf%2F5f%2F5b%2Fdf5f5b1b174a2b4b6026cc6c8f9395c1.jpg&f=1&nofb=1&ipt=005ecb7710f06341543ada561e1d3b0ddec5f32f967be43547ed3f735127f5d4&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8a%2F55%2F99%2F8a5599792c0d7b0a02377b97fafe76a9.jpg&f=1&nofb=1&ipt=2c8805c79cab54dbdcf4399dc01a9b9841c8741e9f0b40ee273373949daf6cfb&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe3%2F63%2F16%2Fe36316cfd05ca21e44d8fabcf1a192be.jpg&f=1&nofb=1&ipt=09ccaab8cadd62e6e5b1045246049efcd0dd87b55744e33453b3e27cddf8f1a9&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F800px%2F313668&f=1&nofb=1&ipt=5669ff93e5d8b8aa18a3f36cad75a2110fc0875775e36df75800a3734514b377&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F12%2Fc9%2Fd8%2F12c9d84f6be4493161938ce036f54fcc.jpg&f=1&nofb=1&ipt=44a514170a249169bfc036fe63d0a6808447ce5b7776507423367b83db6f006a&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fteen-people-face-avatar-1%2F500%2Fhigh_99-1024.png&f=1&nofb=1&ipt=de39bc34c9a6dd311f9de6063c677b0e54b5b35f1cc771658380e0164832045b&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F494%2F963%2Fnon_2x%2Fman-boy-avatar-user-person-people-curly-hair-black-colored-outline-style-vector.jpg&f=1&nofb=1&ipt=7bba4bf362237dae90fe104070b7789adf4f51a16313b84c53e6ee94c2269c06&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd0%2F6b%2F43%2Fd06b43ef4fc9ed6d78ac7a925923b303.jpg&f=1&nofb=1&ipt=0d226e44feaa2d58f84ed2d37d01244f226b56cf4d9ee5d1953961db640fbe3d&ipo=images",
]
/**
 * config do fuse
 */
export const fuseConfig = async () => {
    const [movies, series] = await Promise.all([
        mongoService.fetchMovieData(),
        mongoService.fetchSerieData()
    ])
    return {
        dados: [...movies, ...series],
        chaves: ["title", "subtitle"],
        taxa: 0.3
    }
}

export const breakpoints = [
    { width: 560, cards: 2 },
    { width: 780, cards: 3 },
    { width: 915, cards: 4 },
    { width: 1160, cards: 5 },
    { width: 1500, cards: 6 },
    { width: 1855, cards: 7 },
    { width: Infinity, cards: 8 },
]


export const text = [
    "...Carregando filmes...",
    "...Sincronizando som e imagem...",
    "...Ajustando qualidade...",
    "...Gerando lista de episódios das séries...",
    "...Lutando contra monstros...",
    "...Expansão de domínio...",
    "...Elevação pélvica...",
    "...Extraindo romances...",
    "...Preparando filmes de ação com Jason Statham...",
    "...Ficando com medo dos filmes de terror...",
    "...Chorando com o Jack na água... Tinha espaço Rose, tinha espaço...",
    "...Rindo com As Branquelas...",
    "...Fingindo ser John Wick...",
    "...Correndo pelo labirinto...",
    "...Procurando o Nemo também...",
    "...Ameaça no Ar, que filme ruim...",
    "...Aprendendo a sobreviver ao apocalipse zumbie...",
    "...Dumbledore tinha segredos...",
    "...SHAZAM!!!",
    "...Carrie era muito estranha...",
    "...Buscando wallpapers...",
    "...Carregando arquivos...",
    '...Como o "Bodycount" da Jane era 312?...',
    "...Procurando filmes com a Ana de Armas...",
    "...Tem um filme do Plankton agora?...",
    "...Procurando filmes baseados em livros...",
    "...Matrix é o melhor filme de ficção científica e só minha opinião importa...",
    "...Ficando impressionado com os filmes do Jason Statham...",
    "...Fingindo não gostar de comédia romântica...",
    "...Pedindo para esquecer Uma Sombra na Nuvem...",
    "...Torcendo pelo Frodo...",
    "...Esperando o oitavo filme do Tom Cruise...",
    "...Crepúsculo é ruim...",
    "...DC é melhor que Marvel...",
    "...Procurando séries baseadas em livros...",
    "...Instalando legendas...",
    "...Carregando informações do TMDB...",
    "...Excedendo limites com Bradley Cooper...",
    "...Encarando as bochechas do Ben Affleck como Batman...",
    "...Robert Pattison ficou bom como Batman e ninguém pode negar..."
]

export const desconto: Record<string, number> = {
    mensal: 0,
    trimestral: 5,
    semestral: 7,
    anual: 10,
}

export const swiperBreakpoints = {
    400: { slidesPerView: 2 },
    568: { slidesPerView: 2 },
    620: { slidesPerView: 3 },
    830: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
    1250: { slidesPerView: 6 },
    1440: { slidesPerView: 7 },
    1650: { slidesPerView: 8 },
    1810: { slidesPerView: 9 },
}

export const faq: FAQ[] = [
    {
        question: 'O que é o Projeto FlixNext?',
        answer:
            'A FlixNext nasceu como um projeto pessoal, criado inicialmente para amigos e familiares, com o objetivo de facilitar o acesso a filmes e séries difíceis de encontrar. <br/><br/>Com o crescimento inesperado da plataforma, o propósito evoluiu para algo maior: preservar e disponibilizar um acervo de obras raras, muitas delas fora dos catálogos dos streamings tradicionais, de forma organizada, segura e acessível. <br/><br/>A plataforma busca oferecer uma alternativa estável e segura, evitando que usuários precisem recorrer a sites maliciosos ou inseguros em busca desse tipo de conteúdo.'
    },
    {
        question: 'Como faço para criar uma conta?',
        answer:
            'Para criar sua conta, basta realizar o cadastro na plataforma preenchendo seus dados básicos e utilizando um e-mail válido. <br/><br/>Após o cadastro, você receberá um e-mail com um link de ativação. Depois de ativar sua conta, é só fazer login e começar a explorar o catálogo.'
    },
    {
        question: 'Por que preciso ativar minha conta?',
        answer:
            'A ativação por e-mail é uma medida de segurança. Ela garante que o endereço informado realmente pertence a você e ajuda a evitar o uso indevido de dados por terceiros.'
    },
    {
        question: 'Não consigo assistir a um filme ou série. O que devo fazer?',
        answer:
            'Se você estiver enfrentando qualquer problema técnico, entre em contato conosco pelo e-mail <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>. <br/><br/>O suporte funciona todos os dias e buscamos responder o mais rápido possível.'
    },
    {
        question: 'De onde vêm os filmes e séries disponíveis na plataforma?',
        answer:
            'Os conteúdos são obtidos a partir de fontes externas e acervos digitais disponíveis publicamente. <br/><br/>Embora não sejamos os detentores dos arquivos originais, realizamos uma curadoria cuidadosa antes de disponibilizar qualquer conteúdo, priorizando qualidade, organização e segurança.'
    },
    {
        question: 'Como funcionam as legendas?',
        answer:
            'Na maioria dos conteúdos legendados, as legendas já vêm ativadas automaticamente. <br/><br/>Em alguns casos específicos, é possível ativá-las manualmente nos controles do player. Se tiver dificuldades, nossa equipe de suporte pode ajudar.'
    },
    {
        question: 'Posso sugerir filmes ou séries para o catálogo?',
        answer:
            'Sim! Com sua conta ativa, você pode solicitar novos títulos através do e-mail <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>. Nos envie o nome e ano de lançamento da obra, para que possamos verificar a disponibilidade.'
    },
    {
        question: 'A plataforma é paga?',
        answer:
            'Sim. O acesso à FlixNext é feito por meio de uma assinatura de valor simbólico, criada exclusivamente para cobrir custos de infraestrutura, armazenamento e manutenção do projeto. <br/><br/>Os planos começam a partir de <strong>R$ 10,99</strong> e variam conforme o período escolhido (mensal, trimestral, semestral ou anual).'
    },
    {
        question: 'Como posso ajudar o projeto?',
        answer:
            'Você pode contribuir enviando sugestões, feedbacks ou relatando problemas pelo e-mail <a href="mailto:contato@flixnext.com.br">contato@flixnext.com.br</a>. <br/><br/>A participação da comunidade é essencial para a evolução contínua da plataforma.'
    }
]

export const faqPlans: FAQ[] = [
    {
        question: 'O que é a FlixNext?',
        answer:
            'A FlixNext é uma plataforma de streaming independente, focada em preservar e disponibilizar filmes e séries que muitas vezes não estão presentes nos catálogos tradicionais. <br/><br/>O projeto prioriza organização, estabilidade e acesso contínuo ao acervo.'
    },
    {
        question: 'Quanto custa para assinar?',
        answer:
            'Os planos de acesso começam a partir de R$ 10,99. O valor varia de acordo com o período de assinatura escolhido e existe apenas para manter a plataforma ativa e em constante evolução.'
    },
    {
        question: 'Onde posso assistir?',
        answer:
            'Você pode assistir diretamente pelo navegador, acessando sua conta em flixnext.com.br, tanto no computador quanto no celular.'
    },
    {
        question: 'Como funciona o cancelamento?',
        answer:
            'Não há contratos ou fidelidade. Você pode cancelar sua assinatura a qualquer momento e continuará com acesso até o fim do período já pago.'
    },
    {
        question: 'O que posso assistir na FlixNext?',
        answer:
            'O catálogo conta com filmes e séries de diferentes épocas e gêneros, incluindo obras raras e difíceis de encontrar em outras plataformas.'
    },
    {
        question: 'Quais formas de pagamento são aceitas?',
        answer:
            'Atualmente, aceitamos apenas boleto bancário. Os boletos podem ser pagos via Pix dentro do prazo informado.'
    }
]



export const classification = [
    {
        etaria: "L",
        cor: "var(--green)",
        msg: "Indicado para todos os públicos."
    },
    {
        etaria: "10",
        cor: "var(--blue)",
        msg: "Pode conter linguagem e violência leve."
    },
    {
        etaria: "A12",
        cor: "var(--yellow)",
        msg: "Pode conter linguagem imprópria, violência moderada."
    },
    {
        etaria: "A14",
        cor: "var(--orange)",
        msg: "Pode conter violência, cenas de sexo e drogas."
    },
    {
        etaria: "A16",
        cor: "var(--red)",
        msg: "Pode conter violência explícita, cenas de sexo explícito e consumo explícito de drogas."
    },
    {
        etaria: "18",
        cor: "var(--black)",
        msg: "Pode conter conteúdo extremo, violência explícita, sexo explícito e apologia às drogas."
    }
]

export const blockedDomains = [
    "teste.com",
    "abc.com",
    "123.com",
    "mail.com",
    "email.com",
    "test.com",
    "t.tr",
    "example.com"
]

export const fakePatterns = [
    "teste",
    "test",
    "abc",
    "123",
    "fake"
];

export const streamingPrices = [
    { name: 'Netflix', price: 44.9 },
    { name: 'Prime Video', price: 19.9 },
    { name: 'HBO Max', price: 29.9 },
    { name: 'Disney+', price: 46.9 },
    { name: 'Sky+', price: 49.95 },
    { name: 'Apple TV+', price: 21.9 },
    { name: 'Paramount+', price: 18.9 },
    { name: 'Globoplay', price: 14.9 },
    { name: 'StarZ', price: 24.9 },
]

export const stateMap: Record<string, string> = {
    "acre": "AC",
    "alagoas": "AL",
    "amapá": "AP",
    "amazonas": "AM",
    "bahia": "BA",
    "ceará": "CE",
    "distrito federal": "DF",
    "espírito santo": "ES",
    "goiás": "GO",
    "maranhão": "MA",
    "mato grosso": "MT",
    "mato grosso do sul": "MS",
    "minas gerais": "MG",
    "pará": "PA",
    "paraíba": "PB",
    "paraná": "PR",
    "pernambuco": "PE",
    "piauí": "PI",
    "rio de janeiro": "RJ",
    "rio grande do norte": "RN",
    "rio grande do sul": "RS",
    "rondônia": "RO",
    "roraima": "RR",
    "santa catarina": "SC",
    "são paulo": "SP",
    "sergipe": "SE",
    "tocantins": "TO",
};

export const billetMap: Record<string, string> = {
    paid: "Pago",
    unpaid: "Inadimplente",
    waiting: "Aguardando Pagamento",
    new: "Boleto Gerado",
    identified: "Processando Pagamento",
    approved: "Pagamento Aprovado",
    settled: "Pagamento Processado",
    expired: "Boleto Vencido",
    canceled: "Boleto Cancelado",
    refunded: "Boleto extornado",
    contested: "Contestado",
}
export const subscriptionMap: Record<string, string> = {
    active: "Ativa",
    inactive: "Inativa",
    canceled: "Cancelada",
    new: "Criada",
    expired: "Finalizada"
}
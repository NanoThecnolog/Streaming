//import { cards } from "@/data/cards"
//import { series } from "@/data/series"
import { mongoService } from '@/classes/MongoContent'
import { FAQ } from '@/pages/faq'
import { formatPrice } from './UtilitiesFunctions'
import { IconType } from 'react-icons/lib'
import { FaCcDinersClub, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { SiAmericanexpress } from 'react-icons/si'
import { CheckoutStep, PaymentMethod } from '@/pages/payment'
import { CheckoutTrackStep } from '@/@types/checkoutEvents/types'

export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  path: '/',
}
/**
 * config do fuse
 */
export const fuseConfig = async () => {
  const [movies, series] = await Promise.all([
    mongoService.fetchMovieData(),
    mongoService.fetchSerieData(),
  ])
  return {
    dados: [...movies, ...series],
    chaves: ['title', 'subtitle'],
    taxa: 0.3,
  }
}

export const planValues = {
  mensal: 1349,
  trimestral: 3849,
  semestral: 7299,
  anual: 12949,
}

export const trendingBreakpoints = [
  { width: 560, cards: 1.8 },
  { width: 780, cards: 3 },
  { width: 915, cards: 4 },
  { width: 1160, cards: 5 },
  { width: 1500, cards: 6 },
  { width: 1855, cards: 7 },
  { width: Infinity, cards: 8 },
]

export const breakpoints = [
  { width: 560, cards: 2.15 },
  { width: 780, cards: 3 },
  { width: 915, cards: 4 },
  { width: 1160, cards: 5 },
  { width: 1500, cards: 6 },
  { width: 1855, cards: 7 },
  { width: Infinity, cards: 8 },
]
export const backdropBreakPoints = [
  { width: 560, cards: 1 },
  { width: 780, cards: 2 },
  { width: 915, cards: 3 },
  { width: 1160, cards: 4 },
  { width: 1500, cards: 4 },
  { width: 1855, cards: 4 },
  { width: Infinity, cards: 4 },
]

export const text = [
  'Carregando filmes',
  'Sincronizando som e imagem',
  'Ajustando qualidade',
  'Gerando lista de episódios das séries',
  'Lutando contra monstros',
  'Expansão de domínio, Fukuma Mizushi',
  'Expansão de domínio, Moryo Kusho',
  'Elevação pélvica',
  'Extraindo romances',
  'Preparando filmes de ação com Jason Statham',
  'Ficando com medo dos filmes de terror',
  'Chorando com o Jack na água Tinha espaço Rose, tinha espaço',
  'Rindo com As Branquelas',
  'Fingindo ser John Wick',
  'Correndo pelo labirinto',
  'Procurando o Nemo também',
  'Ameaça no Ar, que filme ruim',
  'Aprendendo a sobreviver ao apocalipse zumbie',
  'Dumbledore tinha segredos',
  'SHAZAM!!!',
  'BANKAI!',
  'Esperando o L encontrar as pistas',
  'Consultando o Oráculo',
  'Carrie era muito estranha',
  'Buscando wallpapers',
  'Carregando muitos arquivos',
  'Como o "Bodycount" da Jane era 312?',
  'Procurando filmes com a Ana de Armas',
  'Chamando o Alfred',
  'Tem um filme do Plankton agora?',
  'Procurando filmes baseados em livros',
  'Matrix é o melhor filme de ficção científica e só minha opinião importa',
  'Ficando impressionado com os filmes do Jason Statham',
  'Fingindo não gostar de comédia romântica',
  'Pedindo para esquecer Uma Sombra na Nuvem',
  'Torcendo pelo Frodo',
  'Escrevendo no Death Note',
  'Crepúsculo é ruim',
  'Ajustando o capacitor de fluxo',
  'Voltando para 1985',
  'Chamando os Ghostbusters',
  'Não cruze os feixes',
  'Preparando a armadilha de fantasmas',
  'Sobrevivendo aos Jogos Vorazes',
  'Tentando resolver um puzzle sem olhar o tutorial',
  'Distribuindo pontos de habilidade',
  'Patrulhando Gotham',
  'Entrando em dobra espacial',
  'Escaneando formas de vida',
  'Transportando a tripulação',
  'Desviando das balas',
  'Derretendo um T-1000',
  'Coletando insígnias',
  'DC é melhor que Marvel',
  'Esperando o Ash finalmente envelhecer',
  'Escolhendo o Pokémon inicial',
  'Procurando séries baseadas em livros',
  'Instalando legendas',
  'Carregando informações do TMDB',
  'Excedendo limites com Bradley Cooper',
  'Encarando as bochechas do Ben Affleck como Batman',
  'Robert Pattison ficou bom como Batman e ninguém pode negar',
  'Que a força esteja com o carregamento',
  'Estalando os dedos como o Thanos',
  'Tocando a abertura de Game of Thrones mentalmente',
  'Preparando o traje do Homem de Ferro',
  "Dizendo 'eu sou seu pai' fora de contexto",
  'Entrando no mundo invertido',
  'Carregando mais rápido que o Flash (ou tentando)',
  'Convocando os Vingadores',
  'Fazendo parkour como em Assassins Creed',
  'Aguardando o inverno que está chegando',
  'Invocando um dragão só pra acelerar',
  'Indo para Hogwarts, plataforma 9¾',
  'Sobrevivendo sem tomar uma flechada no joelho',
  'Entrando na sala do trono',
  "Dizendo 'isso é cinema' mentalmente",
  'Rodando o dado crítico',
  'Escolhendo a casa errada em Hogwarts',
  'Tentando não morrer na primeira temporada',
  'Carregando mais episódios automaticamente',
  'Preparando o discurso final do vilão',
  'Ativando modo maratona',
  'Esperando a cena pós-créditos',
  'Carregando mais rápido que um Toretto falando de família',
  'Testando se isso é real ou um sonho dentro de um sonho',
  'Entrando na cápsula antes que o titã acorde',
  'Sobrevivendo mais 5 minutos sem o Saul Goodman',
  'Rodando o portal errado de propósito',
  'Ligando o sabre de luz dramaticamente',
  'Evitando spoilers como se fossem zumbis',
  'Ignorando o chamado do herói',
  'Tentando não morrer no episódio piloto',
  'Preparando o discurso motivacional antes da batalha final',
  'Correndo do T-Rex com salto alto',
  'Esperando o CGI terminar de renderizar',
  'Entrando no ônibus errado em velocidade máxima',
  'Tentando não piscar agora',
  'Fazendo pose de herói antes do impacto',
  'Checando se o vilão morreu mesmo',
  'Sobrevivendo ao plano que sempre dá errado',
  'Repetindo a mesma missão até dar certo',
  "Ativando o modo 'isso vai dar ruim'",
  'Carregando como se fosse temporada final',
  'Esperando a reviravolta no último minuto',
  'Fingindo que entendeu o final',
  'Tentando não quebrar a quarta parede',
  'Ignorando completamente as leis da física',
  'Esperando alguém gritar ‘é agora!’',
  'Confiando num plano que não foi explicado',
  'Seja um apoiador! Mantenha esse projeto vivo',
  'É sério, o dinheiro ta acabando, preciso de apoiadores',
  'Vamos lá! Escolha seu plano',
  'Seja um apoiador. Siga o coelho branco',
  'Esperando Aquele que Permanece aparecer',
  'Atravessando o multiverso',
  'Abrindo um portal interdimensional',
  'Sincronizando linhas do tempo',
  'Chamando o Doutor Estranho',
  'Compilando teorias de fãs',
  'Esperando o episódio da praia',
  'Reunindo as Esferas do Dragão',
  'Esperando o chefe revelar a segunda forma',
  'Preparando o chefão final',
  'Farmando XP',
  'Conseguindo loot raro',
  'Calculando dano crítico',
  'Recarregando mana',
  'Preparando a poção de cura',
  'Treinando o protagonista antes do torneio',
  'Carregando poder do protagonismo',
  'Esperando o discurso sobre amizade',
  'Destravando um flashback importante',
  'Esperando a abertura terminar',
  'Pulando a abertura... ou não',
  'Preparando o próximo arco',
  'Sincronizando a cena pós-créditos',
  'Escondendo spoilers',
  'Calculando teorias para o próximo episódio',
  'Preparando a próxima temporada',
  'Esperando a renovação da série',
  'Fingindo que o final foi planejado desde o início',
  'Carregando nostalgia',
  'Rebobinando a fita VHS',
  'Esperando a cortina abrir',
  'Luzes, câmera... carregando',
  "Aguardando o diretor dizer 'ação!'",
  'Preparando a claquete',
  'Renderizando explosões desnecessárias',
  'Verificando se o cachorro sobrevive',
  'Confirmando que ninguém ficou preso no mundo invertido',
  'Descobrindo quem realmente é o vilão',
  'Esperando o alívio cômico aparecer',
  'Fazendo suspense desnecessário',
  'Preparando a trilha sonora épica',
  'Esperando o protagonista acordar',
  'Consertando um paradoxo temporal',
  'Sincronizando legendas em 0,001 segundo',
  'Remasterizando mentalmente em 4K',
  'Buscando aquela série que você esqueceu o nome',
  "Recomendando 'só mais um episódio'",
  'Carregando pipoca virtual',
  'Escolhendo o melhor lugar no sofá',
  'Silenciando quem fala durante o filme',
  'Diminuindo as luzes da sala',
]

export const desconto: Record<string, number> = {
  mensal: 0,
  trimestral: 5,
  semestral: 10,
  anual: 20,
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
      'A FlixNext nasceu como um projeto pessoal, criado inicialmente para amigos e familiares, com o objetivo de facilitar o acesso a filmes e séries difíceis de encontrar. <br/><br/>Com o crescimento inesperado da plataforma, o propósito evoluiu para algo maior: preservar e disponibilizar um acervo de obras raras, muitas delas fora dos catálogos dos streamings tradicionais, de forma organizada, segura e acessível. <br/><br/>A plataforma busca oferecer uma alternativa estável e segura, evitando que usuários precisem recorrer a sites maliciosos ou inseguros em busca desse tipo de conteúdo.',
  },
  {
    question: 'Como faço para criar uma conta?',
    answer:
      'Para criar sua conta, basta realizar o cadastro na plataforma preenchendo seus dados básicos e utilizando um e-mail válido. <br/><br/>Após o cadastro, você receberá um e-mail com um link de ativação. Depois de ativar sua conta, é só fazer login e começar a explorar o catálogo.',
  },
  {
    question: 'Por que preciso ativar minha conta?',
    answer:
      'A ativação por e-mail é uma medida de segurança. Ela garante que o endereço informado realmente pertence a você e ajuda a evitar o uso indevido de dados por terceiros.',
  },
  {
    question: 'Fiz o pagamento e ativei minha conta, mas ainda não consigo assistir!',
    answer:
      'Tente realizar o login novamente. Saia da sua conta e faça o login com seu email e senha cadastrados, e tente novamente. Se o erro persistir, entre em contato conosco pelo email <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>',
  },
  {
    question: 'Não consigo assistir a um filme ou série. O que devo fazer?',
    answer:
      'Se você estiver enfrentando qualquer problema técnico, entre em contato conosco pelo e-mail <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>. <br/><br/>O suporte funciona todos os dias e buscamos responder o mais rápido possível.',
  },
  {
    question: 'De onde vêm os filmes e séries disponíveis na plataforma?',
    answer:
      'Os conteúdos são obtidos a partir de fontes externas e acervos digitais disponíveis publicamente. <br/><br/>Embora não sejamos os detentores dos arquivos originais, realizamos uma curadoria cuidadosa antes de disponibilizar qualquer conteúdo, priorizando qualidade, organização e segurança.',
  },
  {
    question: 'Como funcionam as legendas?',
    answer:
      'Na maioria dos conteúdos legendados, as legendas já vêm ativadas automaticamente. <br/><br/>Em alguns casos específicos, é possível ativá-las manualmente nos controles do player. Se tiver dificuldades, nossa equipe de suporte pode ajudar.',
  },
  {
    question: 'Posso sugerir filmes ou séries para o catálogo?',
    answer:
      'Sim! Com sua conta ativa, você pode solicitar novos títulos através do e-mail <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>. Nos envie o nome e ano de lançamento da obra, para que possamos verificar a disponibilidade.',
  },
  {
    question: 'A plataforma é paga?',
    answer: `Sim. O acesso à FlixNext é feito por meio de uma assinatura de valor simbólico, criada exclusivamente para cobrir custos de infraestrutura, armazenamento e manutenção do projeto. <br/><br/>Os planos começam a partir de <strong>${formatPrice(planValues.mensal)}</strong> e variam conforme o período escolhido (mensal, trimestral, semestral ou anual).`,
  },
  {
    question: 'Como posso ajudar o projeto?',
    answer:
      'Você pode contribuir enviando sugestões, feedbacks ou relatando problemas pelo e-mail <a href="mailto:contato@flixnext.com.br">contato@flixnext.com.br</a>. <br/><br/>A participação da comunidade é essencial para a evolução contínua da plataforma.',
  },
]

export const faqPlans: FAQ[] = [
  {
    question: 'O que é a FlixNext?',
    answer:
      'A FlixNext é uma plataforma de streaming independente, focada em preservar e disponibilizar filmes e séries que muitas vezes não estão presentes nos catálogos tradicionais. <br/><br/>O projeto prioriza organização, estabilidade e acesso contínuo ao acervo.',
  },
  {
    question: 'Quanto custa para assinar?',
    answer: `Os planos de acesso começam a partir de ${formatPrice(planValues.mensal)}. O valor varia de acordo com o período de assinatura escolhido e existe apenas para manter a plataforma ativa e em constante evolução.`,
  },
  {
    question: 'Onde posso assistir?',
    answer:
      'Você pode assistir diretamente pelo navegador, acessando sua conta em flixnext.com.br, tanto no computador quanto no celular.',
  },
  {
    question: 'Fiz o pagamento e ativei minha conta, mas ainda não consigo assistir!',
    answer:
      'Tente realizar o login novamente. Saia da sua conta e faça o login com seu email e senha cadastrados, e tente novamente. Se o erro persistir, entre em contato conosco pelo email <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>',
  },
  {
    question: 'Como funciona o cancelamento?',
    answer:
      'Não há contratos ou fidelidade. Você pode cancelar sua assinatura a qualquer momento e continuará com acesso até o fim do período já pago.',
  },
  {
    question: 'O que posso assistir na FlixNext?',
    answer:
      'O catálogo conta com filmes e séries de diferentes épocas e gêneros, incluindo obras raras e difíceis de encontrar em outras plataformas.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Atualmente, aceitamos tanto cartão de crédito quanto boleto. Os boletos podem ser pagos via Pix e a compensação é quase imediata.',
  },
]

interface ContentClassification {
  etaria: string
  label: string
  cor: string
  textColor: string
  msg: string
}

export const classification = [
  {
    etaria: 'L',
    label: 'L',
    cor: 'var(--green)',
    textColor: '#fff',
    msg: 'Conteúdo livre para todos os públicos.',
  },
  {
    etaria: '10',
    label: '10',
    cor: 'var(--blue)',
    textColor: '#fff',
    msg: 'Não recomendado para menores de 10 anos.',
  },
  {
    etaria: 'A12',
    label: '12',
    cor: 'var(--yellow)',
    textColor: '#111',
    msg: 'Não recomendado para menores de 12 anos.',
  },
  {
    etaria: 'A14',
    label: '14',
    cor: 'var(--orange)',
    textColor: '#111',
    msg: 'Não recomendado para menores de 14 anos.',
  },
  {
    etaria: 'A16',
    label: '16',
    cor: 'var(--red)',
    textColor: '#fff',
    msg: 'Não recomendado para menores de 16 anos.',
  },
  {
    etaria: '18',
    label: '18',
    cor: 'var(--black)',
    textColor: '#fff',
    msg: 'Não recomendado para menores de 18 anos.',
  },
] satisfies ContentClassification[]

export const blockedDomains = [
  'teste.com',
  'abc.com',
  '123.com',
  'mail.com',
  'email.com',
  'test.com',
  't.tr',
  'example.com',
]

export const fakePatterns = ['teste', 'test', 'abc', '123', 'fake']

export const streamingPrices = [
  { name: 'Netflix', price: 4490 },
  { name: 'Prime Video', price: 1990 },
  { name: 'HBO Max', price: 3490 },
  { name: 'Disney+', price: 4690 },
  { name: 'Sky+', price: 4950 },
  { name: 'Apple TV+', price: 2990 },
  { name: 'Paramount+', price: 2790 },
  { name: 'Globoplay', price: 3990 },
  { name: 'StarZ', price: 5390 },
]

export const stateMap: Record<string, string> = {
  acre: 'AC',
  alagoas: 'AL',
  amapá: 'AP',
  amazonas: 'AM',
  bahia: 'BA',
  ceará: 'CE',
  'distrito federal': 'DF',
  'espírito santo': 'ES',
  goiás: 'GO',
  maranhão: 'MA',
  'mato grosso': 'MT',
  'mato grosso do sul': 'MS',
  'minas gerais': 'MG',
  pará: 'PA',
  paraíba: 'PB',
  paraná: 'PR',
  pernambuco: 'PE',
  piauí: 'PI',
  'rio de janeiro': 'RJ',
  'rio grande do norte': 'RN',
  'rio grande do sul': 'RS',
  rondônia: 'RO',
  roraima: 'RR',
  'santa catarina': 'SC',
  'são paulo': 'SP',
  sergipe: 'SE',
  tocantins: 'TO',
}

export const billetMap: Record<string, string> = {
  paid: 'Pago',
  unpaid: 'Inadimplente',
  waiting: 'Aguardando Pagamento',
  new: 'Boleto Gerado',
  identified: 'Processando Pagamento',
  approved: 'Pagamento Aprovado',
  settled: 'Pagamento Processado',
  expired: 'Boleto Vencido',
  canceled: 'Boleto Cancelado',
  refunded: 'Boleto extornado',
  contested: 'Contestado',
}
export const subscriptionMap: Record<string, string> = {
  active: 'Ativa',
  inactive: 'Inativa',
  canceled: 'Cancelada',
  new: 'Criada',
  expired: 'Finalizada',
  new_charge: 'Ativa',
}

export const creditTest = {
  brand: 'visa',
  number: '4485785674290087',
  cvv: '123',
  expiryMonth: '05',
  expiryYear: '2029',
  holderName: 'Gorbadoc Oldbuck',
  holderDocument: '94271564656',
  reuse: false,
}

export const brands: Record<string, IconType> = {
  mastercard: FaCcMastercard,
  visa: FaCcVisa,
  maestro: FaCcMastercard,
  'diners-club': FaCcDinersClub,
  'american-express': SiAmericanexpress,
}

export const checkoutStepMap: Record<CheckoutStep, CheckoutTrackStep> = {
  email: 'EMAIL',
  plan: 'PLAN',
  payment: 'PAYMENT_METHOD',
  'personal-data': 'PERSONAL_DATA',
  confirmation: 'CONFIRMATION',
}

export const paymentMethodMap: Record<PaymentMethod, 'PIX' | 'CREDIT_CARD' | 'BILLET'> = {
  pix: 'PIX',
  'credit-card': 'CREDIT_CARD',
  billet: 'BILLET',
}

import { CardsProps, MovieTMDB } from "@/@types/Cards"
import { SeriesProps, TMDBSeries } from "@/@types/series"
import { stateMap } from "./Variaveis"

/**
 * Função que transforma minutos em horas
 * @param min Minutos
 * @returns Retorna hora e os minutos formatados
 */
export const minToHour = (min: number = 0): string => {
    if (min <= 0) {
        return "--"
    }
    const hora = Math.floor(min / 60)
    const remainingMin = min % 60
    if (hora === 0) {
        return `${remainingMin}m`
    }
    return `${hora}h ${remainingMin}m`
}
/**
 * Função de tradução para os departamentos da equipe técnica
 * @param translations objeto com as traduções
 * @param str palavra a ser traduzida
 * @returns retorna a tradução correspondente no array translations ou str, caso não exista tradução.
 */
export const translate = (str: string) => {
    const translations: { [key: string]: string } = {
        "Directing": "Direção",
        "Writing": "Roteiristas",
        "Production": "Produção",
        "Editing": "Edição",
        "Sound": "Som",
        "Camera": "Câmera",
        "Art": "Arte",
        "Costume & Make-Up": "Figurino e Maquiagem",
        "Visual Effects": "Efeitos Visuais",
        "Lighting": "Iluminação",
        "Crew": "Equipe",
    }
    return translations[str] || str;
}

/**
 * Função pra garantir que a primeira letra seja maiúscula pq eu quero...
 * @param str palavra para capitalizar
 * @returns retorna a palavra com a primeira letra maiúscula
 */

export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Função para remover acentuação de palavras.
 * @param str Palavra a ser tratada
 * @returns retorna a palavra sem acentos
 */

export const normalizing = (str: string) => {
    if (!str) return ""
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Função para embaralhar a ordem de renderização dos cards nos containers utilizando o método fisher yates, pra garantir randomização sem padrões.
 * @param array Array de objetos a ser embaralhado
 * @returns Retorna o array embaralhado
 */

export const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}

/**
 * Função para formatar datas na aplicação.
 * @param date Data no formato Date ou string ("2024-09-20T21:20:54.315Z")
 * @returns Retorna uma string com a data formatada (dd/mm/aaaa)
 */

export const formatedDate = (date: string | Date) => {
    if (typeof date === 'string') date = new Date(date)

    if (isNaN(date.getTime()) || !(date instanceof Date)) return
    return date.toLocaleDateString('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    })
}

/**
 * Função para calcular desconto em cima do valor
 * @param price valor do plano (1099)
 * @param disc desconto em porcentagem (5, 7, 10)
 * @returns retorna o preço com desconto
 */
export const calculateDiscount = (price: number, disc: number) => {
    const discount = (price * disc) / 100
    const priceWithDiscount = parseFloat((price - discount).toFixed(0))
    let cents = priceWithDiscount % 100

    if (cents > 50) {
        return priceWithDiscount - cents + 99
    } else {
        return priceWithDiscount - cents + 49
    }
}
/**
 * Função para formatar o valor de acordo com a moeda
 * @param price Valor (1099)
 * @returns Retorna uma string
 */
export const formatPrice = (price: number) => {
    if (!price || isNaN(price)) return

    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(price / 100)
}

export const getparcels = (price: number, parcels: number): number => {
    return price / parcels
}

export const getDate = () => {
    const hoje = new Date()
    const data = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(hoje)
    return data
}

export const uniqueKey = (card: CardsProps | SeriesProps | MovieTMDB | TMDBSeries, context?: string): string => {
    return `${context || 'card'}-${('season' in card ? card.tmdbID : 'overview' in card ? card.id : card.tmdbId) || ('season' in card ? card.title + card.tmdbID : 'seasons' in card ? card.name : 'tmdbId' in card ? card.title + card.tmdbId : card.title + card.id)}`
}

export const expirationSlicer = (expiration: string) => {
    if (expiration.length < 4) return { month: "", year: "" }
    return {
        month: expiration.slice(0, 2),
        year: `20${expiration.slice(2, 4)}`
    }
}

export const normalizeState = (state: string): string => {
    if (!state) return "";
    const cleaned = state.trim().toLowerCase();


    if (/^[A-Z]{2}$/i.test(state)) {
        return state.toUpperCase();
    }

    return stateMap[cleaned] ?? "";
}

export const normalizeName = (name: string): string => {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/\s+/g, ' ')           // remove espaço duplicado
        .trim()
}

export const normalizeCPF = (cpf: string): string => {
    if (!cpf) return ''
    return cpf.replace(/\D/g, '').slice(11)
}

export const statusVerify = (res: PromiseSettledResult<any>): Boolean => {
    return res.status === 'fulfilled' && res.value.status === 200
}

export const getClientX = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e)
        return e.touches[0]?.clientX ?? 0

    return (e as MouseEvent).clientX
}

/**
 * Função para formatar duração do vídeo no player
 * @param time tempo a ser formatado do tipo number
 * @returns Retorna o tempo de vídeo como string (hh:mm:ss)
 */
export const formatTime = (time: number): string => {
    //if (isDrive) return ''
    if (!Number.isFinite(time)) return '00:00'

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    const hh = hours.toString().padStart(2, '0')
    const mm = minutes.toString().padStart(2, '0')
    const ss = seconds.toString().padStart(2, '0')

    return hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
}
import { CardsProps, MovieTMDB } from '@/@types/Cards'
import { SeriesProps, TMDBSeries } from '@/@types/series'
import { stateMap } from './Variaveis'
import { debug } from '@/classes/DebugLogger'
import axios from 'axios'
import { SubDataEFIReponse } from '@/@types/subscriptions/subDetails'
import { UserContext } from '@/@types/user'

/**
 * Função que transforma minutos em horas
 * @param min Minutos
 * @returns Retorna hora e os minutos formatados
 */
export const minToHour = (min: number = 0): string => {
  if (min <= 0) {
    return '--'
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
    Directing: 'Direção',
    Writing: 'Roteiristas',
    Production: 'Produção',
    Editing: 'Edição',
    Sound: 'Som',
    Camera: 'Câmera',
    Art: 'Arte',
    'Costume & Make-Up': 'Figurino e Maquiagem',
    'Visual Effects': 'Efeitos Visuais',
    Lighting: 'Iluminação',
    Crew: 'Equipe',
  }
  return translations[str] || str
}

/**
 * Função pra garantir que a primeira letra seja maiúscula pq eu quero...
 * @param str palavra para capitalizar
 * @returns retorna a palavra com a primeira letra maiúscula
 */

export const capitalize = (str: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Função para remover acentuação de palavras.
 * @param str Palavra a ser tratada
 * @returns retorna a palavra sem acentos
 */

export const normalizing = (str: string) => {
  if (!str) return ''
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Função para embaralhar a ordem de renderização dos cards nos containers utilizando o método fisher yates, pra garantir randomização sem padrões.
 * @param array Array de objetos a ser embaralhado
 * @returns Retorna o array embaralhado
 */

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
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
    timeZone: 'UTC',
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
    minimumFractionDigits: 2,
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
    day: '2-digit',
  }).format(hoje)
  return data
}

export const uniqueKey = (
  card: CardsProps | SeriesProps | MovieTMDB | TMDBSeries,
  context?: string,
): string => {
  return `${context || 'card'}-${('season' in card ? card.tmdbID : 'overview' in card ? card.id : card.tmdbId) || ('season' in card ? card.title + card.tmdbID : 'seasons' in card ? card.name : 'tmdbId' in card ? card.title + card.tmdbId : card.title + card.id)}`
}

export const expirationSlicer = (expiration: string) => {
  if (expiration.length < 4) return { month: '', year: '' }
  return {
    month: expiration.slice(0, 2),
    year: `20${expiration.slice(2, 4)}`,
  }
}

export const normalizeState = (state: string): string => {
  if (!state) return ''
  const cleaned = state.trim().toLowerCase()

  if (/^[A-Z]{2}$/i.test(state)) {
    return state.toUpperCase()
  }

  return stateMap[cleaned] ?? ''
}

export const normalizeName = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, ' ') // remove espaço duplicado
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
  if ('touches' in e) return e.touches[0]?.clientX ?? 0

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

const languageAliases: Record<string, string> = {
  PT: 'Português',
  POR: 'Português',
  POB: 'Português',
  PORTUGUES: 'Português',
  PORTUGUESE: 'Português',
  'BRAZILIAN PORTUGUESE': 'Português',
  'PORTUGUES BRASIL': 'Português',
  EN: 'Inglês',
  ENG: 'Inglês',
  ENGLISH: 'Inglês',
  INGLES: 'Inglês',
  ES: 'Espanhol',
  SPA: 'Espanhol',
  ESP: 'Espanhol',
  SPANISH: 'Espanhol',
  ESPANOL: 'Espanhol',
  JA: 'Japonês',
  JPN: 'Japonês',
  JAP: 'Japonês',
  JAPANESE: 'Japonês',
  JAPONES: 'Japonês',
  FR: 'Francês',
  FRE: 'Francês',
  FRA: 'Francês',
  FRENCH: 'Francês',
  FRANCES: 'Francês',
  DE: 'Alemão',
  GER: 'Alemão',
  DEU: 'Alemão',
  GERMAN: 'Alemão',
  ALEMAO: 'Alemão',
  IT: 'Italiano',
  ITA: 'Italiano',
  ITALIAN: 'Italiano',
  ITALIANO: 'Italiano',
  RU: 'Russo',
  RUS: 'Russo',
  RUSSIAN: 'Russo',
  RUSSO: 'Russo',
  KO: 'Coreano',
  KOR: 'Coreano',
  KOREAN: 'Coreano',
  COREANO: 'Coreano',
  ZH: 'Chinês',
  CHI: 'Chinês',
  ZHO: 'Chinês',
  CMN: 'Chinês',
  CHINESE: 'Chinês',
  CHINES: 'Chinês',
  NO: 'Norueguês',
  NOR: 'Norueguês',
  NB: 'Norueguês',
  NOB: 'Norueguês',
  NN: 'Norueguês',
  NNO: 'Norueguês',
  NORWEGIAN: 'Norueguês',
  NORUEGUES: 'Norueguês',
  AR: 'Árabe',
  ARA: 'Árabe',
  ARABIC: 'Árabe',
  ARABE: 'Árabe',
  CS: 'Tcheco',
  CZE: 'Tcheco',
  CES: 'Tcheco',
  CZECH: 'Tcheco',
  TCHECO: 'Tcheco',
  DA: 'Dinamarquês',
  DAN: 'Dinamarquês',
  DANISH: 'Dinamarquês',
  DINAMARQUES: 'Dinamarquês',
  EL: 'Grego',
  GRE: 'Grego',
  ELL: 'Grego',
  GREEK: 'Grego',
  GREGO: 'Grego',
  FI: 'Finlandês',
  FIN: 'Finlandês',
  FINNISH: 'Finlandês',
  FINLANDES: 'Finlandês',
  HE: 'Hebraico',
  HEB: 'Hebraico',
  HEBREW: 'Hebraico',
  HEBRAICO: 'Hebraico',
  HU: 'Húngaro',
  HUN: 'Húngaro',
  HUNGARIAN: 'Húngaro',
  HUNGARO: 'Húngaro',
  ID: 'Indonésio',
  IND: 'Indonésio',
  INDONESIAN: 'Indonésio',
  INDONESIO: 'Indonésio',
  NL: 'Holandês',
  DUT: 'Holandês',
  NLD: 'Holandês',
  DUTCH: 'Holandês',
  HOLANDES: 'Holandês',
  PL: 'Polonês',
  POL: 'Polonês',
  POLISH: 'Polonês',
  POLONES: 'Polonês',
  RO: 'Romeno',
  RUM: 'Romeno',
  RON: 'Romeno',
  ROMANIAN: 'Romeno',
  ROMENO: 'Romeno',
  SV: 'Sueco',
  SWE: 'Sueco',
  SWEDISH: 'Sueco',
  SUECO: 'Sueco',
  TH: 'Tailandês',
  THA: 'Tailandês',
  TAI: 'Tailandês',
  THAI: 'Tailandês',
  TAILANDES: 'Tailandês',
  TR: 'Turco',
  TUR: 'Turco',
  TURKISH: 'Turco',
  TURCO: 'Turco',
  VI: 'Vietnamita',
  VIE: 'Vietnamita',
  VIETNAMESE: 'Vietnamita',
  VIETNAMITA: 'Vietnamita',
  UK: 'Ucraniano',
  UKR: 'Ucraniano',
  UKRAINIAN: 'Ucraniano',
  UCRANIANO: 'Ucraniano',
  HI: 'Hindi',
  HIN: 'Hindi',
  HINDI: 'Hindi',
  BN: 'Bengali',
  BEN: 'Bengali',
  BENGALI: 'Bengali',
  TA: 'Tâmil',
  TAM: 'Tâmil',
  TAMIL: 'Tâmil',
  TE: 'Télugo',
  TEL: 'Télugo',
  TELUGU: 'Télugo',
  MS: 'Malaio',
  MSA: 'Malaio',
  MAY: 'Malaio',
  MALAY: 'Malaio',
  MALAIO: 'Malaio',
  FA: 'Persa',
  PER: 'Persa',
  FAS: 'Persa',
  FARSI: 'Persa',
  PERSIAN: 'Persa',
  PERSA: 'Persa',
  TL: 'Filipino',
  TGL: 'Filipino',
  FIL: 'Filipino',
  FILIPINO: 'Filipino',
  UND: 'Outro',
  UNK: 'Outro',
  UNKNOWN: 'Outro',
  DESCONHECIDO: 'Outro',
  FULL: 'Completa',
  COMPLETE: 'Completa',
  COMPLETA: 'Completa',
  FORCED: 'Forçada',
  FOR: 'Forçada',
  FORCADA: 'Forçada',
}

const normalizeLanguageKey = (value: string) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_/g, '-')
    .replace(/\s+/g, ' ')
    .toUpperCase()

export const normalizeLanguage = (language?: string | null): string => {
  if (!language?.trim()) return 'Outro'

  const normalized = normalizeLanguageKey(language)
  const exactMatch = languageAliases[normalized]

  if (exactMatch) return exactMatch

  const withoutRegion = normalized.replace(/\s*\([^)]*\)\s*$/, '')
  const regionMatch = languageAliases[withoutRegion]

  if (regionMatch) return regionMatch

  const baseCode = normalized.split('-')[0]
  const baseCodeMatch = languageAliases[baseCode]

  if (baseCodeMatch) return baseCodeMatch

  const tokens = normalized.split(/[^A-Z]+/).filter(Boolean)
  const tokenMatch = tokens
    .map((token) => languageAliases[token])
    .find((translation) => translation && translation !== 'Outro')

  return tokenMatch || 'Outro'
}

export const getThumbnailUrl = (url: string): string => {
  if (!url) return ''
  return url.replace(/master\.m3u8$/, 'thumbnails.vtt')
}

export const hasThumb = async (url: string): Promise<boolean> => {
  if (!url) return false

  try {
    const response = await fetch(url, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}

export const extractSeasonEpisode = (url: string) => {
  const match = url.match(/(?:\/|^)(?:S(\d+)E(\d+)|(\d+)x(\d+))(?:\/|$)/i)

  if (!match) return null

  const season = Number(match[1] ?? match[3])
  const episode = Number(match[2] ?? match[4])

  return {
    season,
    episode,
  }
}

/**
 * Calcula progresso do video
 * @param current progresso atual em segundos
 * @param duration duração total em minutos
 * @returns porcentagem assistida
 */
export const calculateVideoProgress = (current: number, duration: number): number => {
  //debug.log("current vindo do banco em segundos", current, "duração total do tmdb em minutos", duration)
  if (current <= 0 || duration <= 0) return 0
  const durationInSeconds = duration * 60

  if (!Number.isFinite(current) || !Number.isFinite(duration) || durationInSeconds <= 0) return 0

  const percentage = (current / durationInSeconds) * 100
  return Math.min(100, Math.round(percentage))
}

export const getDeviceType = (): 'MOBILE' | 'TABLET' | 'DESKTOP' | 'UNKNOWN' => {
  if (typeof navigator === 'undefined') {
    return 'UNKNOWN'
  }

  const userAgent = navigator.userAgent

  if (/tablet|ipad/i.test(userAgent)) {
    return 'TABLET'
  }

  if (/mobile|android|iphone/i.test(userAgent)) {
    return 'MOBILE'
  }

  return 'DESKTOP'
}
export const shouldRetry = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) {
    return false
  }

  if (error.code === 'ECONNABORTED') {
    return true
  }

  if (!error.response) {
    return true
  }

  return [429, 500, 502, 503, 504].includes(error.response.status)
}

export interface TrialInfo {
  endsAt: string
  remainingDays: number
}

const DAY_IN_MS = 24 * 60 * 60 * 1000

export const getTrialInfo = (subscription: SubDataEFIReponse): TrialInfo | null => {
  const { trial_days, payment_method, created_at } = subscription
  debug.info('subscription em getTrialInfo', subscription)

  if (payment_method !== 'credit_card' || !trial_days || trial_days <= 0) {
    return null
  }

  const createdAt = new Date(created_at)

  if (Number.isNaN(createdAt.getTime())) {
    return null
  }

  const endsAt = new Date(createdAt)

  endsAt.setUTCDate(endsAt.getUTCDate() + trial_days)

  const remainingMilliseconds = endsAt.getTime() - Date.now()

  if (remainingMilliseconds <= 0) return null

  return {
    endsAt: endsAt.toISOString(),
    remainingDays: Math.ceil(remainingMilliseconds / DAY_IN_MS),
  }
}

export const hasAccess = (user: UserContext): boolean => {
  if (user.donator) return true

  const accessUntil = user.subscription?.accessUntil
    ? new Date(user.subscription.accessUntil).getTime()
    : Number.NaN

  return Number.isFinite(accessUntil) && accessUntil > Date.now()
}

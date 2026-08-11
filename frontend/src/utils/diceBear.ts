export const diceBearStyles = [
  'lorelei',
  'lorelei-neutral',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'pixel-art',
  'pixel-art-neutral',
  'identicon',
  'shapes',
  'thumbs',
  'adventurer',
] as const

export type DiceBearStyle = (typeof diceBearStyles)[number]
export const diceBearStyleLabels: Record<DiceBearStyle, string> = {
  lorelei: 'Lorelei',
  'lorelei-neutral': 'Lorelei Neutral',
  notionists: 'Notionists',
  'notionists-neutral': 'Notionists Neutral',
  'open-peeps': 'Open Peeps',
  'pixel-art': 'Pixel Art',
  'pixel-art-neutral': 'Pixel Art Neutral',
  identicon: 'Identicon',
  shapes: 'Shapes',
  thumbs: 'Thumbs',
  adventurer: 'Adventurer',
}
type DiceBearFlip = 'none' | 'horizontal' | 'vertical' | 'both'
type FillMode = 'solid' | 'linear' | 'radial'
type ColorOrder = 'random' | 'fixed'
type RangeValue = number | readonly [number, number]
type ListValue<T> = T | readonly T[]

type LoreleiFeature =
  | 'beard'
  | 'earrings'
  | 'eyebrows'
  | 'eyes'
  | 'freckles'
  | 'glasses'
  | 'hair'
  | 'hairAccessories'
  | 'head'
  | 'mouth'
  | 'nose'

type LoreleiColorFeature =
  | 'earrings'
  | 'eyebrows'
  | 'eyes'
  | 'freckles'
  | 'glasses'
  | 'hair'
  | 'hairAccessories'
  | 'mouth'
  | 'nose'
  | 'skin'
  | 'background'

type FeatureOptions = {
  [Key in LoreleiFeature as `${Key}Variant`]?: ListValue<string>
} & {
  [Key in LoreleiFeature as `${Key}Probability`]?: number
}

type ColorOptions = {
  [Key in LoreleiColorFeature as `${Key}Color`]?: ListValue<string>
} & {
  [Key in LoreleiColorFeature as `${Key}ColorFill`]?: ListValue<FillMode>
} & {
  [Key in LoreleiColorFeature as `${Key}ColorFillStops`]?: RangeValue
} & {
  [Key in LoreleiColorFeature as `${Key}ColorAngle`]?: RangeValue
} & {
  [Key in LoreleiColorFeature as `${Key}ColorOrder`]?: ColorOrder
}

export type DiceBearOptions = FeatureOptions &
  ColorOptions & {
    size?: number
    flip?: ListValue<DiceBearFlip>
    scale?: RangeValue
    borderRadius?: RangeValue
    rotate?: RangeValue
    translateX?: RangeValue
    translateY?: RangeValue
  }

export const diceBearFixedOptions: DiceBearOptions = {
  borderRadius: 50,
  scale: 1,
  rotate: 0,
  translateX: 0,
  translateY: 0,
}

interface DiceBearAvatarConfig {
  version: '10.x'
  style: DiceBearStyle
  format: 'svg'
  quantity: number
  seedPrefix: string
  options: DiceBearOptions
}

/**
 * Personalize aqui o conjunto oferecido no seletor.
 * Valores em arrays permitem que o seed escolha uma das opções.
 * As opções de partes do rosto são específicas do estilo Lorelei.
 */
export const diceBearAvatarConfig: DiceBearAvatarConfig = {
  version: '10.x',
  style: 'adventurer', //adventurer neutral, pixel art, open peebs, thumbs
  format: 'svg',
  quantity: 24,
  seedPrefix: 'flixnext-profile',
  options: {
    ...diceBearFixedOptions,
    backgroundColor: ['d42c2c', '18181b', '27272a', '3f3f46', '7f1d1d', '991b1b'],

    // Exemplos de customização disponíveis:
    // hairVariant: ['variant01', 'variant12', 'variant28', 'variant44'],
    // hairColor: ['2c1b18', '6a4e35', 'c0c0c0'],
    // hairProbability: 100,
    // headVariant: ['variant01', 'variant02', 'variant03', 'variant04'],
    // eyesVariant: ['variant01', 'variant08', 'variant16', 'variant24'],
    // eyebrowsVariant: ['variant01', 'variant06', 'variant13'],
    // noseVariant: ['variant01', 'variant03', 'variant06'],
    //mouthVariant: ['happy01'],
    // glassesVariant: ['variant01', 'variant03', 'variant05'],
    // glassesProbability: 35,
    // beardVariant: ['variant01', 'variant02'],
    // beardProbability: 20,
    // earringsVariant: ['variant01', 'variant02', 'variant03'],
    // earringsProbability: 20,
    // frecklesProbability: 15,
    // hairAccessoriesVariant: 'flowers',
    // hairAccessoriesProbability: 10,
    // skinColor: ['f2d3b1', 'd9ae85', '9e6b4b', '694d3d'],
    //flip: 'horizontal',
  },
}

export interface DiceBearAvatarOption {
  id: string
  url: string
}

export type DiceBearCustomOptions = Record<string, string | number | readonly (string | number)[]>

export interface ParsedDiceBearAvatar {
  style: DiceBearStyle
  seed: string
  options: DiceBearCustomOptions
}

export const parseDiceBearAvatarUrl = (avatar?: string | null): ParsedDiceBearAvatar | null => {
  if (!avatar) return null

  try {
    const url = new URL(avatar)
    const path = url.pathname.match(/^\/10\.x\/([^/]+)\/svg$/)
    const style = path?.[1]
    const seed = url.searchParams.get('seed')

    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'api.dicebear.com' ||
      !style ||
      !diceBearStyles.includes(style as DiceBearStyle) ||
      !seed
    ) {
      return null
    }

    const options: Record<string, string | string[]> = {}

    url.searchParams.forEach((value, name) => {
      if (name === 'seed') return

      const current = options[name]
      if (current === undefined) {
        options[name] = value
      } else if (Array.isArray(current)) {
        current.push(value)
      } else {
        options[name] = [current, value]
      }
    })

    return {
      style: style as DiceBearStyle,
      seed,
      options,
    }
  } catch {
    return null
  }
}

export const createDiceBearAvatarUrl = (
  style: DiceBearStyle,
  seed: string,
  options: DiceBearCustomOptions = {},
): string => {
  const params = new URLSearchParams({ seed })

  Object.entries(options).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)))
      return
    }

    params.set(key, String(value))
  })

  return `https://api.dicebear.com/10.x/${style}/svg?${params.toString()}`
}

export const createDiceBearAvatarOptions = (): DiceBearAvatarOption[] => {
  const { style, quantity, seedPrefix, options } = diceBearAvatarConfig

  return Array.from({ length: quantity }, (_, index) => {
    const number = index + 1
    const seed = `${seedPrefix}-${number.toString().padStart(2, '0')}`
    return {
      id: seed,
      url: createDiceBearAvatarUrl(style, seed, options as DiceBearCustomOptions),
    }
  })
}

export const isDiceBearAvatar = (avatar?: string | null): boolean => {
  if (!avatar) return false

  try {
    const url = new URL(avatar)
    return url.protocol === 'https:' && url.hostname === 'api.dicebear.com'
  } catch {
    return false
  }
}

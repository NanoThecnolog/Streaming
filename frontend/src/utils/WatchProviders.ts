import { WithWatchProviders } from '@/@types/watchProviders'
import { stm } from './Genres'

const normalize = (value: string): string => {
  return value
    .trim()
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

const providerAliases = new Map<string, string>([
  ['netflix', stm.netflix],
  ['amazon prime video', stm.prime],
  ['prime video', stm.prime],
  ['max', stm.hbo],
  ['hbo max', stm.hbo],
  ['hbo', stm.hbo],
  ['disney plus', stm.disney],
  ['apple tv plus', stm.apple],
  ['apple tv', stm.apple],
  ['sky go', stm.sky],
  ['sky', stm.sky],
  ['starz', stm.starz],
  ['starzplay', stm.starz],
  ['paramount plus', stm.paramount],
  ['paramount+', stm.paramount],
  ['globoplay', stm.gplay],
  ['globo play', stm.gplay],
])

export const getAvailableStreamingGenres = (details: WithWatchProviders): string[] => {
  const brazil = details['watch/providers']?.results?.BR
  if (!brazil) return []

  const providers = [...(brazil.flatrate ?? []), ...(brazil.free ?? []), ...(brazil.ads ?? [])]

  return Array.from(
    new Set(
      providers.flatMap((provider) => {
        const streaming = providerAliases.get(normalize(provider.provider_name))
        return streaming ? [streaming] : []
      }),
    ),
  )
}

export const mergeStreamingGenres = (
  selectedGenres: string[],
  streamingGenres: string[],
): string[] => {
  const selected = new Set(selectedGenres.map(normalize))

  return [
    ...selectedGenres,
    ...streamingGenres.filter((streaming) => !selected.has(normalize(streaming))),
  ]
}

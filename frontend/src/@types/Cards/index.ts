import { WithWatchProviders } from '../watchProviders'

export interface CardsProps {
  background: string
  overlay: string
  tmdbId: number
  title: string
  subtitle: string
  description: string
  faixa: string
  src: string
  duration: string
  genero: string[]
  lang?: 'Dub' | 'Leg'
  index: number
}

export interface MovieTMDB extends WithWatchProviders {
  backdrop_path: string
  belongs_to_collection: CollectionProps
  budget: number
  genres: GenresProps[]
  id: number
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  title: string
  vote_average: number
  vote_count: number
}

export interface ReleaseProps {
  tmdbId: number
  name: string
}

interface CollectionProps {
  backdrop_path: string
  id: number
  name: string
  poster_path: string
}
interface GenresProps {
  id: number
  name: string
}

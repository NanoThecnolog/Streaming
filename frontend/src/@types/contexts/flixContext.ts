import { ReactNode } from 'react'
import {
  DeviceVerificationRequired,
  MyListPorps,
  SubscriptionProps,
  UserContext,
  UserCookiesProps,
  UserProps,
} from '../user'
import { ListaFavoritos } from '../favoritos'
import { SeriesProps } from '../series'
import { CardsProps } from '../Cards'

export type ContextProviderProps = {
  children: ReactNode
}
export interface ContextProps {
  user: UserContext | null | undefined
  //favorites: FavoritesContext[],
  watchLater: WatchLaterContext[]
  setUser: (user: UserContext) => void
  setWatchLater: (tmdbid: WatchLaterContext[]) => void
  //setFavorites: (id: FavoritesContext[]) => void
  signIn: (credentials: SignInProps) => Promise<DeviceVerificationRequired | void>
  signOut: (reason?: 'manual' | 'revoked', beforeLogout?: () => Promise<void>) => Promise<void>
  movies: CardsProps[]
  series: SeriesProps[]
  setMovies: (data: CardsProps[]) => void
  setSeries: (data: SeriesProps[]) => void
  subscription: SubscriptionProps | null
  setSubscription: (data: SubscriptionProps) => void
}
export type SignInProps = {
  email: string
  password: string
  replaceDeviceId?: string
}

export interface FavoritesContext {
  id: number
}
export interface WatchLaterContext {
  id: string
  tmdbid: number
}

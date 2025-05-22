import { ReactNode } from "react";
import { MyListPorps, UserContext, UserCookiesProps, UserProps } from "../user";
import { ListaFavoritos } from "../favoritos";
import { SeriesProps } from "../series";
import { CardsProps } from "../Cards";

export type ContextProviderProps = {
    children: ReactNode;
}
export interface ContextProps {
    user: UserCookiesProps | null | undefined;
    //favorites: FavoritesContext[],
    watchLater: WatchLaterContext[],
    setUser: (user: UserCookiesProps) => void
    setWatchLater: (tmdbid: WatchLaterContext[]) => void
    //setFavorites: (id: FavoritesContext[]) => void
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    movies: CardsProps[]
    series: SeriesProps[]
    setMovies: (data: CardsProps[]) => void
    setSeries: (data: SeriesProps[]) => void
}
export type SignInProps = {
    email: string,
    password: string
}

export interface FavoritesContext {
    id: number
}
export interface WatchLaterContext {
    id: string,
    tmdbid: number
}
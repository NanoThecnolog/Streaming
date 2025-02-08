import { ReactNode } from "react";
import { MyListPorps, UserContext, UserProps } from "../user";
import { ListaFavoritos } from "../favoritos";

export type ContextProviderProps = {
    children: ReactNode;
}
export interface ContextProps {
    user: UserContext | null | undefined;
    favorites: FavoritesContext[],
    watchLater: WatchLaterContext[],
    setUser: (user: UserContext) => void
    setWatchLater: (tmdbid: WatchLaterContext[]) => void
    setFavorites: (id: FavoritesContext[]) => void
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
}
export type SignInProps = {
    email: string,
    password: string
}

export interface FavoritesContext {
    id: number
}
export interface WatchLaterContext {
    id: number
}
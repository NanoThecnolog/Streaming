import { CardsProps } from "@/@types/Cards";
import { ContextProps, ContextProviderProps, SignInProps, WatchLaterContext } from "@/@types/contexts/flixContext";
import { SeriesProps } from "@/@types/series";
import { LoginProps, UserContext, UserCookiesProps } from "@/@types/user";
import { debug } from "@/classes/DebugLogger";
import { cookieOptions } from "@/utils/Variaveis";
import axios from "axios";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";


export const FlixContext = createContext({} as ContextProps)

export function FlixProvider({ children }: ContextProviderProps) {
    const [user, setUser] = useState<UserCookiesProps | null>();
    //const [favorites, setFavorites] = useState<FavoritesContext[]>([])
    const [watchLater, setWatchLater] = useState<WatchLaterContext[]>([])
    const [movies, setMovies] = useState<CardsProps[]>([])
    const [series, setSeries] = useState<SeriesProps[]>([])

    //favoritos, watch later, dados do usuário, tudo aqui
    async function signIn({ email, password }: SignInProps) {
        try {

            const response = await axios.post<LoginProps>('/api/login', {
                email,
                password
            })
            if (response.status != 200) debug.log('Erro no primeiro axios ao fazer login')
            const userData = await axios.get<UserContext>('/api/user')
            debug.log('resultado da request', userData.data)
            const data = userData.data
            const watchLaterIds = data.watchLater.map(item => ({ id: item.id, tmdbid: item.tmdbid }))

            const userCookie = {
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                birthday: data.birthday,
                news: data.news,
                verified: data.verified,
                createdAt: data.createdAt,
            }
            destroyCookie(null, 'flix-user')
            setCookie(null, 'flix-user', JSON.stringify(userCookie), cookieOptions)
            setUser(userCookie)
            destroyCookie(null, 'flix-watch')
            setCookie(null, 'flix-watch', JSON.stringify(watchLaterIds), cookieOptions)
            toast.success(`Olá, ${data.name}. Bem vindo!`)
            Router.push('/')
        } catch (err) {
            console.log("Erro ao autenticar usuário.", err)
            toast.error("Erro ao tentar realizar login. Verifique seu email e sua senha, e tente novamente")
            return
        }
    }

    async function signOut() {
        try {
            destroyCookie(null, 'flix-watch')
            destroyCookie(null, 'flix-user')
            await fetch('/api/user/logout')
            setUser(null)
            setWatchLater([])
            Router.push('/login')
        } catch (err) {
            toast.error("Erro ao deslogar.")
            console.log('Erro ao deslogar', err)
        }
    }

    return (
        <FlixContext.Provider value={{ user, watchLater, setWatchLater, setUser, signIn, signOut, movies, series, setMovies, setSeries }}>
            {children}
        </FlixContext.Provider>
    )
}
export function useFlix() {
    return useContext(FlixContext)
}
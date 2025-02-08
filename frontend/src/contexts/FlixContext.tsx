import { ContextProps, ContextProviderProps, FavoritesContext, SignInProps, WatchLaterContext } from "@/@types/contexts/flixContext";
import { ListaFavoritos } from "@/@types/favoritos";
import { MyListPorps, UserContext, UserProps } from "@/@types/user";
import { api } from "@/services/api";
import { getCookieData } from "@/services/cookieClient";
import { cookieOptions } from "@/utils/Variaveis";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";




export const FlixContext = createContext({} as ContextProps)

export function FlixProvider({ children }: ContextProviderProps) {
    const [user, setUser] = useState<UserContext | null>();
    const [favorites, setFavorites] = useState<FavoritesContext[]>([])
    const [watchLater, setWatchLater] = useState<WatchLaterContext[]>([])

    /*useEffect(() => {
        const token = getCookieData('flix-token')
        console.log("token no context", token)
        if (!token) return
        api.get

    },[])*/

    //favoritos, watch later, dados do usuário, tudo aqui
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post<UserProps>('/login', {
                email,
                password
            })

            const { avatar, birthday, id, name, token, news, verified, myList, favoritos } = response.data

            if (!response.data.verified) {
                alert(
                    "Sua conta ainda não foi ativada.\n\n" +
                    "Um link de ativação foi enviado para o seu e-mail durante o cadastro.\n\n" +
                    "Por favor, verifique sua caixa de entrada ou a pasta de spam e clique no link de ativação " +
                    "para liberar o acesso ao conteúdo."
                );
                return;
            }

            const favoriteIds = favoritos.map(item => ({ id: item.tmdbid }))
            const watchLaterIds = myList.map(item => ({ id: item.tmdbid }))


            destroyCookie(null, 'flix-token')
            setCookie(null, 'flix-token', token, cookieOptions)

            destroyCookie(null, 'flix-favorites')
            setCookie(null, 'flix-favorites', JSON.stringify(favoriteIds), cookieOptions)

            destroyCookie(null, 'flix-watch')
            setCookie(null, 'flix-watch', JSON.stringify(watchLaterIds), cookieOptions)

            setFavorites(favoriteIds)
            setWatchLater(watchLaterIds)

            const user: UserContext = {
                id,
                name,
                email,
                avatar,
                birthday,
                news,
                verified
            }
            destroyCookie(null, 'flix-user')
            setCookie(null, 'flix-user', JSON.stringify(user), cookieOptions)
            setUser(user)

            toast.success(`Olá, ${name}. Bem vindo!`)
            Router.push('/');
        } catch (err) {
            console.log("Erro ao autenticar usuário.", err)
            toast.error("Erro ao tentar realizar login. Verifique seu email e sua senha, e tente novamente")
            return
        }
    }

    function signOut() {
        try {
            destroyCookie(null, 'flix-token')
            destroyCookie(null, 'flix-favorites')
            destroyCookie(null, 'flix-watch')
            destroyCookie(null, 'flix-user')
            setUser(null)
            setFavorites([])
            setWatchLater([])
            Router.push('/login')
        } catch (err) {
            toast.error("Erro ao deslogar.")
            console.log('Erro ao deslogar', err)
        }
    }

    return (
        <FlixContext.Provider value={{ user, favorites, watchLater, setWatchLater, setFavorites, setUser, signIn, signOut }}>
            {children}
        </FlixContext.Provider>
    )
}
export function useFlix() {
    return useContext(FlixContext)
}
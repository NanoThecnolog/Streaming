import { ContextProps, ContextProviderProps, SignInProps } from "@/@types/contexts/flixContext";
import { UserProps } from "@/@types/user";
import { api } from "@/services/api";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";



export const FlixContext = createContext({} as ContextProps)

export function FlixProvider({ children }: ContextProviderProps) {
    const [user, setUser] = useState<UserProps | null>();
    const [favorites, setFavorites] = useState([])
    const [watchLater, setWatchLater] = useState([])

    //favoritos, watch later, dados do usuário, tudo aqui
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post<UserProps>('/login', {
                email: email,
                password
            })

            const { avatar, birthday, id, name, token, news, verified, myList, favoritos } = response.data

            const options = {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                path: '/'
            }
            destroyCookie(null, 'flix-token')
            setCookie(null, 'flix-token', token, options)

            destroyCookie(null, 'user-favorite')
            setCookie(null, 'user-favorite', JSON.stringify(favoritos), options)

            destroyCookie(null, 'user-watch')
            setCookie(null, 'user-watch', JSON.stringify(myList), options)

            const user: UserProps = {
                id,
                name,
                email,
                avatar,
                birthday,
                news,
                verified,
                token,
                myList,
                favoritos
            }
            setUser(user)

        } catch (err) {
            console.log("Erro ao autenticar usuário.", err)
        }
    }

    function signOut() {
        try {
            destroyCookie(null, 'flix-token')
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
        <FlixContext.Provider value={{ user, setUser, signIn, signOut }}>
            {children}
        </FlixContext.Provider>
    )
}
export function useFlixContext() {
    return useContext(FlixContext)
}
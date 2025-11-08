import { CardsProps } from "@/@types/Cards";
import { ContextProps, ContextProviderProps, SignInProps, WatchLaterContext } from "@/@types/contexts/flixContext";
import { SeriesProps } from "@/@types/series";
import { LoginProps, UserContext, UserCookiesProps } from "@/@types/user";
import { debug } from "@/classes/DebugLogger";
import { mongoService } from "@/classes/MongoContent";
import { cookieOptions } from "@/utils/Variaveis";
import axios from "axios";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
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
            debug.log("Iniciando login")
            const response = await axios.post<LoginProps>('/api/login', {
                email,
                password
            })
            debug.log("email e senha enviados")
            if (response.status != 200) debug.log('Erro no primeiro axios ao fazer login')
            debug.log("Primeiro axios ok", response.status)
            debug.log("Buscando dados do usuario")
            const userData = await axios.get<UserContext>('/api/user')
            //debug.log('resultado da request', userData.data)
            debug.log("dados buscados", userData.data)
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
            setUser(null)
            setWatchLater([])
            await destroyCookie(null, 'flix-watch')
            await destroyCookie(null, 'flix-user')
            const logout = await axios.get('/api/user/logout')
            debug.log(logout.data.message)
            Router.push('/login')
        } catch (err) {
            toast.error("Erro ao deslogar.")
            console.log('Erro ao deslogar', err)
        }
    }

    useEffect(() => {

        const fetchMoviesMongoDB = async () => {
            const moviesDB: CardsProps[] = await mongoService.fetchMovieData()
            //debug.log("movies data base", moviesDB)
            if (moviesDB.length > 0) setMovies(moviesDB)
        }
        if (movies.length === 0) fetchMoviesMongoDB()
    }, [movies])

    useEffect(() => {
        const fetchSeriesMongoDB = async () => {
            const seriesDB: SeriesProps[] = await mongoService.fetchSerieData()
            if (seriesDB.length > 0) setSeries(seriesDB)
            //setIsSerieLoading(true)
        }
        if (series.length === 0) fetchSeriesMongoDB()
    }, [series])

    return (
        <FlixContext.Provider value={{ user, watchLater, setWatchLater, setUser, signIn, signOut, movies, series, setMovies, setSeries }}>
            {children}
        </FlixContext.Provider>
    )
}
export const useFlix = () => {
    return useContext(FlixContext)
}
import { CardsProps } from '@/@types/Cards'
import {
  ContextProps,
  ContextProviderProps,
  SignInProps,
  WatchLaterContext,
} from '@/@types/contexts/flixContext'
import { SeriesProps } from '@/@types/series'
import { SubDetailsResponseProps } from '@/@types/subscriptions/subDetails'
import {
  DeviceVerificationRequired,
  LoginProps,
  SubscriptionProps,
  UserContext,
  UserCookiesProps,
} from '@/@types/user'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { cookieOptions } from '@/utils/Variaveis'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { toast } from '@/components/ui/Notifications'

export const FlixContext = createContext({} as ContextProps)

export function FlixProvider({ children }: ContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<UserContext | null>()
  //const [favorites, setFavorites] = useState<FavoritesContext[]>([])
  const [watchLater, setWatchLater] = useState<WatchLaterContext[]>([])
  const [movies, setMovies] = useState<CardsProps[]>([])
  const [series, setSeries] = useState<SeriesProps[]>([])
  const [subscription, setSubscription] = useState<SubscriptionProps | null>(null)
  const signingOutRef = useRef(false)

  //favoritos, watch later, dados do usuário, tudo aqui
  async function signIn({ email, password, replaceDeviceId }: SignInProps) {
    try {
      debug.log('Iniciando login')
      const response = await axios.post<
        { data: LoginProps; success: true } | DeviceVerificationRequired
      >('/api/login', {
        email,
        password,
        replaceDeviceId,
      })
      if (response.status != 200) debug.log('Erro no primeiro axios ao fazer login')
      if ('verificationRequired' in response.data) return response.data

      const userData = await axios.get<UserContext>('/api/user')
      // A ativação por e-mail foi descontinuada. Contas legadas com
      // `verified = false` devem seguir normalmente pelo fluxo de login.
      const data = { ...userData.data, verified: true }
      const watchLaterIds = data.watchLater.map((item) => ({ id: item.id, tmdbid: item.tmdbid }))
      setSubscription(data.subscription)
      setUser(data)

      const userCookie: UserCookiesProps = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        //birthday: data.birthday,
        news: data.news,
        verified: data.verified,
        createdAt: data.createdAt,
        subscription: data.subscription,
        donator: data.donator,
      }

      destroyCookie(null, 'flix-user')
      setCookie(null, 'flix-user', JSON.stringify(userCookie), cookieOptions)
      destroyCookie(null, 'flix-watch')
      setCookie(null, 'flix-watch', JSON.stringify(watchLaterIds), cookieOptions)
      toast.success(`Olá, ${data.name}. Bem vindo!`)
      router.push('/')
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data?.code === 'DEVICE_LIMIT_REACHED') throw err
        if (err.status === 429) {
          toast.error('Muitas tentativas de login. Tente novamente mais tarde.')
          return
        }
      }
      debug.log('Erro ao autenticar usuário.')
      toast.error(
        'Erro ao tentar realizar login. Verifique seu email e sua senha, e tente novamente',
      )
      return
    }
  }

  const signOut = useCallback(
    async (reason: 'manual' | 'revoked' = 'manual', beforeLogout?: () => Promise<void>) => {
      if (signingOutRef.current) return
      signingOutRef.current = true

      if (reason === 'revoked') {
        toast.info('Este dispositivo foi desconectado. Entre novamente para continuar.')
      }

      try {
        setUser(null)
        setWatchLater([])
        setSubscription(null)
        try {
          await beforeLogout?.()
        } catch (err) {
          debug.warn('Não foi possível concluir a ação anterior ao logout.', err)
        }
        await destroyCookie(null, 'flix-watch', cookieOptions)
        await destroyCookie(null, 'flix-user', cookieOptions)
        await axios.post('/api/user/logout')
      } catch (err) {
        debug.warn('A sessão já estava encerrada no servidor.', err)
      } finally {
        router.push('/login')
      }
    },
    [router],
  )

  useEffect(() => {
    if (user) signingOutRef.current = false
  }, [user])

  useEffect(() => {
    if (!user) return

    let validating = false

    const validateSession = async () => {
      if (validating || signingOutRef.current) return
      validating = true

      try {
        const { data } = await axios.get<UserContext>('/api/user')

        setUser(data)
        setSubscription(data.subscription)
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          await signOut('revoked')
        }
      } finally {
        validating = false
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') void validateSession()
    }

    const interval = window.setInterval(() => void validateSession(), 60_000)
    Router.events.on('routeChangeComplete', validateSession)
    window.addEventListener('focus', validateSession)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(interval)
      Router.events.off('routeChangeComplete', validateSession)
      window.removeEventListener('focus', validateSession)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [signOut, user])

  useEffect(() => {
    const fetchMoviesMongoDB = async () => {
      if (movies.length > 0) return
      const moviesDB: CardsProps[] = await mongoService.fetchMovieData()
      debug.log('movies no FlixContext', moviesDB)
      if (moviesDB.length > 0) setMovies(moviesDB)
    }
    void fetchMoviesMongoDB()
  }, [movies])

  useEffect(() => {
    const fetchSeriesMongoDB = async () => {
      if (series.length > 0) return
      const seriesDB: SeriesProps[] = await mongoService.fetchSerieData()
      debug.log('seriesDB no flixcontext', seriesDB)
      if (seriesDB.length > 0) setSeries(seriesDB)
    }
    void fetchSeriesMongoDB()
  }, [series])

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await axios.get<UserContext>('/api/user')
        if (userData) {
          setUser(userData.data)
          setSubscription(userData.data.subscription)
          await axios.post('/api/user/session/refresh')
        }
      } catch (err) {
        debug.error('Sem dados do usuário')
      }
    }
    if (!user) getUserDetails()
  }, [user])

  return (
    <FlixContext.Provider
      value={{
        user,
        watchLater,
        subscription,
        setSubscription,
        setWatchLater,
        setUser,
        signIn,
        signOut,
        movies,
        series,
        setMovies,
        setSeries,
      }}
    >
      {children}
    </FlixContext.Provider>
  )
}
export const useFlix = () => {
  return useContext(FlixContext)
}

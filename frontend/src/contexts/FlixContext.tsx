import { CardsProps } from '@/@types/Cards'
import {
  ContextProps,
  ContextProviderProps,
  ProfileSelectionRequired,
  SignInProps,
  WatchLaterContext,
} from '@/@types/contexts/flixContext'
import { SeriesProps } from '@/@types/series'
import { SubDetailsResponseProps } from '@/@types/subscriptions/subDetails'
import {
  DeviceVerificationRequired,
  GenrePreferenceProps,
  LoginProps,
  ProfileProps,
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
import { destroyCookie, parseCookies, setCookie } from 'nookies'
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
  const [profiles, setProfiles] = useState<ProfileProps[]>([])
  const [activeProfile, setActiveProfileState] = useState<ProfileProps | null>(null)
  const [genrePreferences, setGenrePreferences] = useState<GenrePreferenceProps[]>([])
  const [pendingLogin, setPendingLogin] = useState<{
    user: UserContext
    subscription: SubscriptionProps | null
  } | null>(null)
  const signingOutRef = useRef(false)

  const setActiveProfile = useCallback((profile: ProfileProps) => {
    setActiveProfileState(profile)
    if (typeof window !== 'undefined') {
      localStorage.setItem('flix-active-profile', profile.id)
    }
    destroyCookie(null, 'flix-active-profile')
    setCookie(null, 'flix-active-profile', profile.id, cookieOptions)
  }, [])

  const persistUserCookie = useCallback((data: UserContext): void => {
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
  }, [])

  const fetchProfiles = useCallback(async (): Promise<ProfileProps[]> => {
    try {
      debug.log('[FlixContext] fetchProfiles: iniciando busca')
      const { data } = await axios.get<ProfileProps[]>('/api/user/profiles')
      debug.log('[FlixContext] fetchProfiles: dados recebidos', {
        type: typeof data,
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'N/A',
        preview: JSON.stringify(data)?.slice(0, 300),
      })
      setProfiles(data)

      const storedProfileId = localStorage.getItem('flix-active-profile')
      const current = storedProfileId ? (data.find((p) => p.id === storedProfileId) ?? null) : null
      const only = current ? null : data.length === 1 ? data[0] : null
      const next = current ?? only

      if (next) {
        setActiveProfileState(next)
        localStorage.setItem('flix-active-profile', next.id)
        destroyCookie(null, 'flix-active-profile')
        setCookie(null, 'flix-active-profile', next.id, cookieOptions)
      }

      return data
    } catch (err) {
      debug.error('[FlixContext] fetchProfiles: erro ao buscar perfis', err)
      return []
    }
  }, [])

  const fetchGenrePreferences = useCallback(async (profileId: string) => {
    try {
      debug.log('[FlixContext] fetchGenrePreferences: profileId=', profileId)
      const { data } = await axios.get<GenrePreferenceProps[]>(
        `/api/user/profiles/${profileId}/preferences`,
      )
      debug.log('[FlixContext] fetchGenrePreferences: dados recebidos', {
        type: typeof data,
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'N/A',
      })
      setGenrePreferences(data)
    } catch (err) {
      debug.warn('[FlixContext] fetchGenrePreferences: erro', err)
      setGenrePreferences([])
    }
  }, [])

  useEffect(() => {
    if (activeProfile) {
      fetchGenrePreferences(activeProfile.id)
    }
  }, [activeProfile, fetchGenrePreferences])

  // Mantém a lista "Minha Lista" sincronizada com o perfil ativo.
  // A cookie flix-watch passa a refletir apenas o perfil selecionado.
  useEffect(() => {
    if (!activeProfile?.id) return

    const controller = new AbortController()

    const syncWatchLater = async () => {
      try {
        const { data } = await axios.get<{ id: string; tmdbid: number }[]>(
          '/api/user/list/getmovies',
          { signal: controller.signal },
        )
        const watchLaterIds = data.map((item) => ({ id: item.id, tmdbid: Number(item.tmdbid) }))
        setWatchLater(watchLaterIds)
        destroyCookie(null, 'flix-watch')
        setCookie(null, 'flix-watch', JSON.stringify(watchLaterIds), cookieOptions)
      } catch (err) {
        debug.warn('[FlixContext] syncWatchLater: sem dados por perfil', err)
      }
    }

    void syncWatchLater()

    return () => {
      controller.abort()
    }
  }, [activeProfile?.id])

  //favoritos, watch later, dados do usuário, tudo aqui
  async function signIn({
    email,
    password,
    replaceDeviceId,
  }: SignInProps): Promise<DeviceVerificationRequired | ProfileSelectionRequired | void> {
    try {
      debug.log('[FlixContext] Iniciando login')
      const response = await axios.post<
        { data: LoginProps; success: true } | DeviceVerificationRequired
      >('/api/login', {
        email,
        password,
        replaceDeviceId,
      })
      debug.log('[FlixContext] Resposta do /api/login:', response.status, response.data)
      if (response.status != 200) debug.log('Erro no primeiro axios ao fazer login')
      if ('verificationRequired' in response.data) return response.data

      debug.log('[FlixContext] Buscando dados do usuário em /api/user')
      const userData = await axios.get<UserContext>('/api/user')
      debug.log('[FlixContext] Dados do usuário recebidos:', userData.status)
      // A ativação por e-mail foi descontinuada. Contas legadas com
      // `verified = false` devem seguir normalmente pelo fluxo de login.
      const data = { ...userData.data, verified: true }

      const profilesList = await fetchProfiles()

      const storedProfileId = localStorage.getItem('flix-active-profile')
      const preSelected = storedProfileId
        ? (profilesList.find((p) => p.id === storedProfileId) ?? null)
        : null

      if (preSelected) {
        setActiveProfileState(preSelected)
        setUser(data)
        setSubscription(data.subscription)
        persistUserCookie(data)
        router.push('/')
        return
      }

      setPendingLogin({ user: data, subscription: data.subscription })
      return { profileSelectionRequired: true }
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
        setProfiles([])
        setActiveProfileState(null)
        setGenrePreferences([])
        localStorage.removeItem('flix-active-profile')
        destroyCookie(null, 'flix-active-profile', cookieOptions)
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

  const completeLogin = useCallback(
    async (profile: ProfileProps) => {
      setActiveProfile(profile)
      if (pendingLogin && pendingLogin.user) {
        setUser(pendingLogin.user)
        setSubscription(pendingLogin.subscription)
        persistUserCookie(pendingLogin.user)
      } else {
        try {
          const { data } = await axios.get<UserContext>('/api/user')
          setUser(data)
          setSubscription(data.subscription)
          persistUserCookie(data)
        } catch (err) {
          debug.error('Erro ao buscar dados do usuário após login', err)
        }
      }
      setPendingLogin(null)
    },
    [pendingLogin, persistUserCookie],
  )

  const cancelPendingLogin = useCallback(async () => {
    setPendingLogin(null)
    setUser(null)
    setSubscription(null)
    setProfiles([])
    setActiveProfileState(null)
    try {
      await axios.post('/api/user/logout')
    } catch (err) {
      debug.warn('[FlixContext] cancelPendingLogin: erro ao revogar sessão do login pendente', err)
    }
  }, [])

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
        debug.log('[FlixContext] getUserDetails: buscando dados do usuário')
        const userData = await axios.get<UserContext>('/api/user')
        if (userData) {
          setUser(userData.data)
          setSubscription(userData.data.subscription)
          await axios.post('/api/user/session/refresh')
          debug.log('[FlixContext] getUserDetails: chamando fetchProfiles')
          await fetchProfiles()
        }
      } catch (err) {
        debug.error('[FlixContext] getUserDetails: sem dados do usuário', err)
      }
    }
    if (!user) getUserDetails()
  }, [user, fetchProfiles])

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
        profiles,
        setProfiles,
        fetchProfiles,
        activeProfile,
        setActiveProfile,
        genrePreferences,
        setGenrePreferences,
        completeLogin,
        cancelPendingLogin,
      }}
    >
      {children}
    </FlixContext.Provider>
  )
}
export const useFlix = () => {
  return useContext(FlixContext)
}

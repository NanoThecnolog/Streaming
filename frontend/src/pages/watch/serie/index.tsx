import Router, { useRouter } from 'next/router'
import styles from '@/styles/Watch.module.scss'
import { ChevronLeft } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SEO from '@/components/SEO'
import HelpFlag from '@/components/Helpflag'
import HelpModal from '@/components/modals/HelpModal/index '
import { SeriesProps, TMDBEpisodes } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { parseCookies } from 'nookies'
import NoFile from '@/components/ui/NoFile'
import { apiGoogle } from '@/services/apiGoogle'
import { CheckFileProps } from '@/@types/googleRequest'
import Spinner from '@/components/ui/Loading/spinner'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { tmdb } from '@/classes/TMDB'
import { apiEmail } from '@/services/apiMessenger'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import axios, { AxiosError } from 'axios'
import { SubscriptionProps, UserContext } from '@/@types/user'
import { MoviePlayer } from '@/components/ui/Player'
import { MoviePlayerHLS } from '@/components/ui/PlayerHLS'
import { hasAccess } from '@/utils/UtilitiesFunctions'
import { useStillWatching } from '@/hooks/useStillWatching'
import StillWatchingModal from '@/components/ui/StillWatchingModal'
import { createPortal } from 'react-dom'

interface EpisodeProps {
  title: string
  subtitle: string
  episode: number
  src: string
  season: number
}

interface EpisodeNavigationTarget {
  season: number
  episode: number
  src: string
}

interface WatchSerieProps {
  userContext: UserContext
}

export default function WatchSerie({ userContext }: WatchSerieProps) {
  const router = useRouter()

  const { episode, season, tmdbID, startTime } = router.query

  const [episodio, setEpisodio] = useState<EpisodeProps | null>(null)
  const [episodeMeta, setEpisodeMeta] = useState<TMDBEpisodes | null>(null)
  const [serie, setSerie] = useState<SeriesProps | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [shared, setShared] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const [modalContainer, setModalContainer] = useState<Element | null>(null)

  const [shouldAutoPlay, setShouldAutoPlay] = useState<boolean>(false)

  const pendingNextEpisodeRef = useRef(false)

  const { user, setUser } = useFlix()
  const {
    showStillWatching,
    registerPlaybackStarted,
    registerUserPause,
    registerUserInteraction,
    registerEpisodeFinished,
    confirmWatching,
  } = useStillWatching({ maxEpisodes: 5, maxContinuousPlaybackMs: 90 * 60 * 1000 })

  useEffect(() => {
    debug.log('tempo inicial', startTime)
  }, [startTime])

  useEffect(() => {
    if (!user) {
      if (!userContext) return
      setUser(userContext)
    }
  }, [userContext])

  useEffect(() => {
    if (user && !user.donator) router.push('/me/escolher-plano')
  }, [user])

  const isHLS = useMemo(() => {
    if (!episodio?.src) return false

    //if (src.includes('.m3u8')) return true
    return episodio.src.includes('.m3u8')
  }, [episodio?.src])

  const isDrive = useMemo(() => {
    if (!episodio?.src) return null
    try {
      return !new URL(episodio.src).hostname.includes('backblazeb2.com')
    } catch {
      return null
    }
  }, [episodio?.src])

  useEffect(() => {
    const getSerieMongoData = async () => {
      const serieDb = await mongoService.findOneSerieById(parseInt(tmdbID as string))
      debug.log('serieDb: ', serieDb)
      if (!serieDb) return debug.log('serieDb vazia ou null')

      setSerie(serieDb)

      const currentSeason = serieDb.season.find((s) => s.s === parseInt(season as string))
      const currentEpisode = currentSeason?.episodes.find(
        (ep) => ep.ep === parseInt(episode as string),
      )

      setEpisodio({
        title: serieDb.title,
        subtitle: serieDb.subtitle ?? '',
        episode: parseInt(episode as string),
        src: currentEpisode?.src ?? '',
        season: parseInt(season as string),
      })
    }
    if (tmdbID && episode && season) {
      getSerieMongoData()
    }
  }, [router, episode, season, tmdbID])

  useEffect(() => {
    if (!tmdbID || !episodio) {
      setEpisodeMeta(null)
      return
    }

    let active = true

    const loadEpisodeMeta = async () => {
      try {
        const episodes = await tmdb.fetchEpisodeData(parseInt(tmdbID as string), episodio.season)

        if (!active) return

        const meta = episodes?.find((ep) => ep.episode_number === episodio.episode) ?? null
        setEpisodeMeta(meta)
      } catch (error) {
        debug.error('Erro ao buscar metadados do episódio', error)
        if (active) setEpisodeMeta(null)
      }
    }

    void loadEpisodeMeta()

    return () => {
      active = false
    }
  }, [episodio?.season, episodio?.episode, tmdbID])

  useEffect(() => {
    async function getSignedStreamUrl() {
      if (isDrive !== false || !episodio) return
      const stream = await mongoService.getSerieEpisodeStreamUrl(
        parseInt(tmdbID as string),
        episodio.season,
        episodio.episode,
      )
      setStreamUrl(stream?.url ?? null)
      setExpiresAt(stream?.expiresAt ?? null)
    }
    getSignedStreamUrl()
  }, [isDrive, episodio?.season, episodio?.episode, tmdbID])

  const renewStreamUrl = useCallback(async (): Promise<string | null> => {
    if (isDrive !== false || !episodio) return null
    const stream = await mongoService.getSerieEpisodeStreamUrl(
      parseInt(tmdbID as string),
      episodio.season,
      episodio.episode,
    )
    if (!stream) return null
    setExpiresAt(stream.expiresAt)
    return stream.url
  }, [isDrive, episodio, tmdbID])

  const handleBack = useCallback(() => {
    router.push(`/series/serie/${tmdbID}`)
  }, [router, tmdbID])

  const handleHelpModal = useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  const handleOpenHelpModal = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    debug.log('episódio ao verificar: ', episodio)
    debug.log('teste de HLS', isHLS)
    if (!episodio?.src || isDrive === null) return
    if (isDrive === false) {
      setShared(true)
      return
    }
    shareVerify(episodio.src)
  }, [episodio, isDrive])

  useEffect(() => {
    const updateModalContainer = () => {
      setModalContainer(document.fullscreenElement ?? document.body)
    }

    updateModalContainer()

    document.addEventListener('fullscreenchange', updateModalContainer)

    return () => {
      document.removeEventListener('fullscreenchange', updateModalContainer)
    }
  }, [])

  const shareVerify = async (link: string) => {
    if (loading) return

    setLoading(true)

    try {
      const { data } = await apiGoogle.get(`/${encodeURIComponent(link)}`)
      debug.log('arquivo verificado: ', data)
      const fileCheck: CheckFileProps = data

      setShared(!!fileCheck.shared)
    } catch (error: any) {
      const status = error?.response?.status

      debug.error('Erro ao verificar arquivo', status)

      if (status === 400 || status === 403 || status === 404) {
        try {
          await apiEmail.post('/notification/problem', {
            title: episodio?.title,
            description: 'Problema com arquivo',
            tmdbId: serie?.tmdbID,
            season: episodio?.season ?? '-',
            episode: episodio?.episode ?? '-',
            email: user?.email,
          })
        } catch (mailError) {
          debug.warn('Falha ao enviar notificação', mailError)
        }
      }

      setShared(false)
    } finally {
      setLoading(false)
    }
  }

  const previousEpisode = useMemo((): EpisodeNavigationTarget | null => {
    if (!serie || !episodio) return null

    const currentSeason = serie.season[episodio.season - 1]
    if (!currentSeason) return null

    if (episodio.episode > 1) {
      const previous = currentSeason.episodes[episodio.episode - 2]

      if (previous) {
        return {
          season: currentSeason.s,
          episode: previous.ep,
          src: previous.src,
        }
      }
    }

    const previousSeason = serie.season[episodio.season - 2]
    const previous = previousSeason?.episodes.at(-1)

    if (!previousSeason || !previous) return null

    return {
      season: previousSeason.s,
      episode: previous.ep,
      src: previous.src,
    }
  }, [serie, episodio])

  const nextEpisode = useMemo((): EpisodeNavigationTarget | null => {
    if (!serie || !episodio) return null

    const ep = episodio.episode
    const s = episodio.season

    const currentSeason = serie.season[s - 1]
    if (!currentSeason) return null

    if (currentSeason.episodes.length > ep)
      return {
        season: currentSeason.s,
        episode: currentSeason.episodes[ep].ep,
        src: currentSeason.episodes[ep].src,
      }

    const nextSeason = serie.season[s]

    if (nextSeason && nextSeason.episodes.length > 0)
      return {
        season: nextSeason.s,
        episode: nextSeason.episodes[0].ep,
        src: nextSeason.episodes[0].src,
      }

    return null
  }, [serie, episodio])

  const navigateToEpisode = (target: EpisodeNavigationTarget, autoPlay: boolean) => {
    if (!serie) return

    setShouldAutoPlay(autoPlay)
    setEpisodio({
      title: serie.title,
      subtitle: serie.subtitle ?? '',
      src: target.src,
      episode: target.episode,
      season: target.season,
    })

    const params = new URLSearchParams({
      episode: String(target.episode),
      season: String(target.season),
      tmdbID: String(serie.tmdbID),
    })

    router.replace(`/watch/serie?${params}`, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  const handlePreviousEpisode = () => {
    if (!previousEpisode) return

    navigateToEpisode(previousEpisode, false)
  }

  const handleNextEpisode = (autoPlay = true) => {
    if (!serie) return

    if (!nextEpisode) return router.push(`/series/serie/${serie.tmdbID}`)

    debug.log('chamando próximo episódio')

    navigateToEpisode(nextEpisode, autoPlay)
  }

  const handleEpisodeEnded = async () => {
    const shouldPausePlayback = registerEpisodeFinished()

    if (shouldPausePlayback) {
      pendingNextEpisodeRef.current = true
      return
    }
    pendingNextEpisodeRef.current = false

    await handleNextEpisode()
  }

  const handleContinueWatching = async () => {
    const shouldGoToNextEpisode = pendingNextEpisodeRef.current

    pendingNextEpisodeRef.current = false

    confirmWatching()

    if (shouldGoToNextEpisode) {
      await handleNextEpisode()
    }
  }

  /*const nextEpisode = useMemo(
        () => nextEpisode(),
        [serie, episodio]
    )*/
  const hasNextEpisode = !!nextEpisode
  const hasPreviousEpisode = !!previousEpisode

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SEO
        title={`Episódio ${episodio?.episode} - ${episodio?.title} ${episodio?.subtitle && `- ${episodio.subtitle}`} | FlixNext`}
        description=" "
      />
      <div className={styles.container}>
        <div className={styles.movie}>
          <div className={styles.movieName}>
            <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
              <ChevronLeft size={30} />
            </button>
            {episodio ? (
              <h3>
                {episodio.title} {episodio.subtitle && `- ${episodio.subtitle}`} - Temporada{' '}
                {episodio.season} Episódio {episodio.episode}
              </h3>
            ) : (
              ''
            )}
          </div>
          <div className={styles.flagContainer}>
            <HelpFlag modalVisible={handleOpenHelpModal} />
          </div>
          {episodio && (
            <>
              <div className={styles.iframe}>
                {isHLS ? (
                  <MoviePlayerHLS
                    //loading={loading}
                    src={streamUrl ?? episodio.src}
                    expiresAt={expiresAt}
                    renewAuthToken={renewStreamUrl}
                    nextEp={handleEpisodeEnded} //handleNextEpisode
                    onPreviousEpisode={handlePreviousEpisode}
                    onNextEpisode={() => handleNextEpisode(false)}
                    hasPreviousEpisode={hasPreviousEpisode}
                    hasNextEpisode={hasNextEpisode}
                    autoPlayOnLoad={shouldAutoPlay}
                    tmdbID={Number(tmdbID as string)}
                    mediaType="tv"
                    startTime={parseFloat((startTime as string) ?? 0)}
                    pauseForStillWatching={showStillWatching}
                    handlePlayBackStarted={registerPlaybackStarted}
                    handleUserPause={registerUserPause}
                    handleUserInteraction={registerUserInteraction}
                    serieTitle={serie?.title ?? episodio.title}
                    title={episodeMeta?.name}
                    subtitle={episodio.subtitle}
                    season={episodio.season}
                    episode={episodio.episode}
                  />
                ) : (
                  <MoviePlayer
                    loading={loading}
                    shared={shared}
                    src={episodio.src}
                    title={episodio.title}
                    isSerie={true}
                    onPreviousEpisode={handlePreviousEpisode}
                    onNextEpisode={() => handleNextEpisode(false)}
                    hasPreviousEpisode={hasPreviousEpisode}
                    hasNextEpisode={hasNextEpisode}
                  />
                )}
              </div>
            </>
          )}
          {visible && (
            <HelpModal
              handleHelpModal={handleHelpModal}
              email={user?.email}
              tmdbId={Number(serie ? serie.tmdbID : 0)}
              serie={serie}
              season={Number(season)}
              episode={Number(episode)}
            />
          )}
          {showStillWatching &&
            modalContainer &&
            createPortal(
              <StillWatchingModal
                title={serie?.title}
                onContinue={handleContinueWatching}
                onStop={() => router.push(`/series/serie/${tmdbID}`)}
              />,
              modalContainer,
            )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies['flix-token']

  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  //const url = process.env.NEXT_PUBLIC_WEBSITE_LINK
  const userBackendUrl = process.env.NEXT_PUBLIC_RENDER

  if (!userBackendUrl) throw new Error('URL da API Backend não configuradas corretamente')

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.get<UserContext>(`${userBackendUrl}/user`, { headers })
    const user = response.data

    const access = hasAccess(user)
    if (!access) {
      if (user.subscription.subId && user.subscription.subId > 0) {
        const subId = user.subscription.subId
        return {
          redirect: {
            destination: `/me/assinatura/${subId}`,
            permanent: false,
          },
        }
      }
      return {
        redirect: {
          destination: '/me/escolher-plano',
          permanent: false,
        },
      }
    }

    return {
      props: {
        userContext: user,
      },
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }

      if (err.response?.status === 404) {
        return {
          redirect: {
            destination: '/me',
            permanent: false,
          },
        }
      }
    }

    console.error('Erro ao validar usuário e assinatura na página /watch', err)

    return {
      redirect: {
        destination: '/me',
        permanent: false,
      },
    }
  }
}

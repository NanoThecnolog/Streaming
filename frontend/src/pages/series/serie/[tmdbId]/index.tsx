import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import nookies from 'nookies'
import { FaPlay } from 'react-icons/fa'
import { toast } from '@/components/ui/Notifications'

import { Episodes, SeriesProps, TMDBEpisodes, TMDBSeries } from '@/@types/series'
import { CardsProps } from '@/@types/Cards'
import { CastProps, CastingProps } from '@/@types/movie/cast'
import { groupedByDepartment } from '@/@types/movie/crew'
import { EpisodeProgressProps, ProgressResponse } from '@/@types/watchedProgress'
import { TrailerProps } from '@/@types/trailer'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import Title from '@/components/ui/Title'
import Genre from '@/components/ui/Genre'
import Overview from '@/components/ui/overview'
import Stars from '@/components/ui/StarAverage'
import ContentRating from '@/components/ui/Adult'
import WatchLaterContainer from '@/components/ui/ButtonWatchLater'
import TrailerButton from '@/components/ui/TrailerButton'
import NewContent from '@/components/ui/NewContent'
import Spinner from '@/components/ui/Loading/spinner'
import { WarningModal } from '@/components/ui/WarningModal'

import CastContainer from '@/components/movie/CastContaner'
import CrewContainer from '@/components/movie/CrewContainer'
import RelatedCardsContainer from '@/components/movie/RelatedContainer'
import EpisodeCard from '@/components/seriesComponents/EpisodeCard'

import { useFlix } from '@/contexts/FlixContext'
import { useTMDB } from '@/contexts/TMDBContext'

import { WatchLaterManager } from '@/classes/watchLaterManager'
import { mongoService } from '@/classes/MongoContent'
import { tmdb } from '@/classes/TMDB'
import { debug } from '@/classes/DebugLogger'

import { getRelatedContent } from '@/utils/CardsManipulation'
import { calculateVideoProgress, hasAccess } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

interface SeriePageProps {
  data: TMDBSeries
  buttonVisible: boolean
}

const seriesStatusLabels: Record<string, string> = {
  'Returning Series': 'Renovada',
  Planned: 'Planejada',
  'In Production': 'Em produção',
  Ended: 'Finalizada',
  Canceled: 'Cancelada',
  Pilot: 'Piloto',
}

const getSeasonLanguage = (language?: string): string | null => {
  if (language === 'Leg' || language === 'Legendado') {
    return 'Legendado'
  }

  if (language === 'Dub' || language === 'Dublado') {
    return 'Dublado'
  }

  return null
}

export default function Serie({ data, buttonVisible }: SeriePageProps) {
  const router = useRouter()

  const { user, movies, series, setSeries, activeProfile } = useFlix()
  const { allData, serieData } = useTMDB()

  const watchLaterManager = useMemo(() => new WatchLaterManager(), [])

  const [serie, setSerie] = useState<SeriesProps | null>(null)
  const [seasonToShow, setSeasonToShow] = useState(1)
  const [episodesToShow, setEpisodesToShow] = useState<Episodes[]>([])
  const [episodesData, setEpisodesData] = useState<Array<TMDBEpisodes[] | null>>([])
  const [episodeProgress, setEpisodeProgress] = useState<EpisodeProgressProps[]>([])

  const [onWatchLater, setOnWatchLater] = useState(false)

  const [relatedCards, setRelatedCards] = useState<Array<CardsProps | SeriesProps>>([])

  const [aggregatedCast, setAggregatedCast] = useState<CastingProps[]>([])
  const [crewDepartment, setCrewDepartment] = useState<groupedByDepartment>({})
  const [castLoading, setCastLoading] = useState(true)

  const [loadingButton, setLoadingButton] = useState(false)

  const [trailer, setTrailer] = useState<TrailerProps | null>(null)

  const [warningModalOpen, setWarningModalOpen] = useState(false)

  /*
   * Busca os dados internos da série.
   */
  useEffect(() => {
    let active = true

    setSerie(null)
    setRelatedCards([])
    setAggregatedCast([])
    setCrewDepartment({})
    setEpisodesData([])
    setEpisodeProgress([])

    const fetchSerie = async () => {
      try {
        const response = await mongoService.findOneSerieById(data.id)

        debug.log('dados da série no banco', response)

        if (!active) return

        if (!response) {
          await router.replace('/404')
          return
        }

        setSerie(response)

        setSeasonToShow(response.season[0]?.s ?? 1)
      } catch (error) {
        debug.error('Erro ao buscar dados internos da série', error)

        if (active) {
          await router.replace('/404')
        }
      }
    }

    void fetchSerie()

    return () => {
      active = false
    }
  }, [data.id, router])

  /*
   * Atualiza os episódios internos exibidos quando
   * a temporada é alterada.
   */
  useEffect(() => {
    if (!serie) {
      setEpisodesToShow([])
      return
    }

    const selectedSeason = serie.season.find((season) => season.s === seasonToShow)

    debug.log('episódios no banco da temporada selecionada', selectedSeason?.episodes)

    setEpisodesToShow(selectedSeason?.episodes ?? [])
  }, [serie, seasonToShow])

  useEffect(() => {
    const episodes = episodesData[seasonToShow]
    debug.log('Episódios da temporada no TMDB', seasonToShow, episodes)
  }, [episodesData, seasonToShow])

  useEffect(() => {
    debug.log('Dados da série no TMDB', data)
  }, [data])

  /*
   * Verifica se a série está na Minha Lista.
   */
  useEffect(() => {
    if (!serie) return

    const onList = watchLaterManager.isOnTheList(serie.tmdbID)

    setOnWatchLater(onList)
  }, [serie, watchLaterManager])

  /*
   * Busca os metadados de todos os episódios uma única
   * vez para cada série.
   */
  useEffect(() => {
    if (!serie) {
      setEpisodesData([])
      return
    }

    let active = true

    const loadEpisodesData = async () => {
      try {
        setEpisodesData([])

        const result = await Promise.all(
          serie.season.map((season) => tmdb.fetchEpisodeData(serie.tmdbID, season.s)),
        )
        //debug.log('dados dos episódios no TMDB', result)

        if (active) {
          setEpisodesData(result)
        }
      } catch (error) {
        debug.error('Erro ao buscar episódios da série', error)
      }
    }

    void loadEpisodesData()

    return () => {
      active = false
    }
  }, [serie])

  /*
   * Confirma se a série continua disponível no catálogo.
   */
  useEffect(() => {
    if (series.length === 0) return

    const seriesExists = series.some((item) => item.tmdbID === data.id)

    if (!seriesExists) {
      void router.replace('/404')
    }
  }, [series, data.id, router])

  /*
   * Busca e calcula os conteúdos relacionados.
   */
  useEffect(() => {
    if (!serie) return

    let active = true

    const loadRelatedCards = async () => {
      try {
        if (series.length === 0) {
          const response = await mongoService.fetchSerieData()

          if (active) {
            setSeries(response)
          }

          return
        }

        const related = getRelatedContent(serie, movies, series, allData, serieData)

        if (active) {
          setRelatedCards(related)
        }
      } catch (error) {
        debug.error('Erro ao buscar séries relacionadas', error)

        if (active) {
          setRelatedCards([])
        }
      }
    }

    void loadRelatedCards()

    return () => {
      active = false
    }
  }, [serie, movies, series, allData, serieData, setSeries])

  /*
   * Busca o trailer da série.
   */
  useEffect(() => {
    let active = true

    const loadTrailer = async () => {
      try {
        const response = await tmdb.fetchTrailer(data.id, 'tv')

        if (active) {
          setTrailer(response ?? null)
        }
      } catch (error) {
        debug.error('Erro ao buscar trailer da série', error)

        if (active) {
          setTrailer(null)
        }
      }
    }

    void loadTrailer()

    return () => {
      active = false
    }
  }, [data.id])

  /*
   * Busca elenco e equipe técnica da série e de suas
   * temporadas.
   */
  useEffect(() => {
    if (!serie) return

    let active = true

    const loadCastAndCrew = async () => {
      setCastLoading(true)

      try {
        const [mainCredits, aggregatedCredits] = await Promise.all([
          tmdb.fetchSeriesCast(data.id),
          tmdb.fetchSeriesAggregatedCast(data.id),
        ])

        if (!mainCredits) {
          if (active) {
            setAggregatedCast([])
            setCrewDepartment({})
          }

          return
        }

        const seasonCredits = await Promise.all(
          serie.season.map((season) => tmdb.fetchSeriesCastBySeason(data.id, season.s)),
        )

        const credits = [mainCredits, ...seasonCredits].filter((item): item is CastProps =>
          Boolean(item),
        )

        const crewMembers = credits.flatMap((credit) =>
          Array.isArray(credit.crew) ? credit.crew : [],
        )

        const departments = crewMembers.reduce<groupedByDepartment>((accumulator, crewMember) => {
          const department = crewMember.department

          if (!department) {
            return accumulator
          }

          if (!accumulator[department]) {
            accumulator[department] = []
          }

          accumulator[department].push(crewMember)

          return accumulator
        }, {})

        if (active) {
          setAggregatedCast(aggregatedCredits?.cast ?? [])
          setCrewDepartment(departments)
        }
      } catch (error) {
        debug.error('Erro ao buscar elenco e equipe da série', error)

        if (active) {
          setAggregatedCast([])
          setCrewDepartment({})
        }
      } finally {
        if (active) {
          setCastLoading(false)
        }
      }
    }

    void loadCastAndCrew()

    return () => {
      active = false
    }
  }, [serie, data.id])

  /*
   * Busca o progresso assistido e relaciona cada registro
   * com o runtime retornado pelo TMDB.
   */
  useEffect(() => {
    if (episodesData.length === 0) {
      setEpisodeProgress([])
      return
    }

    const controller = new AbortController()

    const fetchProgress = async () => {
      try {
        const response = await axios.get<ProgressResponse>('/api/watched/progress', {
          params: {
            tmdbID: data.id,
          },
          signal: controller.signal,
        })

        const allEpisodes = episodesData.flatMap((season) => season ?? [])

        const episodesWithProgress: EpisodeProgressProps[] = response.data.result.flatMap(
          (progress) => {
            const episode = allEpisodes.find(
              (item) =>
                item.episode_number === progress.episode && item.season_number === progress.season,
            )

            if (!episode || !episode.runtime) {
              return []
            }

            const percentage = calculateVideoProgress(progress.progress, episode.runtime)

            return [
              {
                episode: episode.episode_number,
                season: episode.season_number,
                progress: progress.progress,
                percentage,
                complete: percentage > 95,
              },
            ]
          },
        )

        setEpisodeProgress(episodesWithProgress)
      } catch (error) {
        if (!axios.isCancel(error)) {
          debug.error('Erro ao buscar o progresso da série', error)
        }
      }
    }

    void fetchProgress()

    return () => {
      controller.abort()
    }
  }, [data.id, episodesData, activeProfile?.id])

  /*
   * Mapa para evitar percorrer todos os progressos
   * durante a renderização de cada episódio.
   */
  const episodesProgressMap = useMemo(() => {
    return new Map(episodeProgress.map((item) => [`${item.season}-${item.episode}`, item]))
  }, [episodeProgress])

  /*
   * Atores agregados da série, ordenados em ordem decrescente
   * pela quantidade de episódios em que aparecem.
   */
  const castMembers = useMemo(() => {
    return [...aggregatedCast]
      .filter((actor) => actor.known_for_department === 'Acting' || !actor.known_for_department)
      .sort((a, b) => (b.total_episode_count ?? 0) - (a.total_episode_count ?? 0))
  }, [aggregatedCast])

  const handleWatchLater = async () => {
    if (!user) {
      await router.push('/login')
      return
    }

    if (!serie || loadingButton) return

    try {
      setLoadingButton(true)

      const response = await axios.post('/api/user/list/add', serie)

      const responseData = response.data

      await watchLaterManager.updateCookie('flix-watch', responseData.request.cookie)

      const onList = watchLaterManager.isOnTheList(serie.tmdbID)

      setOnWatchLater(onList)

      toast.success(responseData.request.message)
    } catch (error) {
      debug.error('Erro ao atualizar Minha Lista', error)

      const message = axios.isAxiosError(error) ? error.response?.data?.message : null

      toast.error(message ?? 'Erro inesperado ao atualizar sua lista.')
    } finally {
      setLoadingButton(false)
    }
  }

  const handleChangeSeason = (seasonNumber: number) => {
    if (!serie) return

    const seasonExists = serie.season.some((season) => season.s === seasonNumber)

    debug.log('mudando a série, numero', seasonNumber, 'season existe?', seasonExists)

    if (seasonExists) {
      setSeasonToShow(seasonNumber)
    }
  }

  const handlePlayEpisode = (episodeData: Episodes, startTime = 0, seasonNumber = seasonToShow) => {
    if (!serie) return

    if (!user || !hasAccess(user)) return setWarningModalOpen(true)

    const params = new URLSearchParams({
      episode: `${episodeData.ep}`,
      tmdbID: `${serie.tmdbID}`,
      season: `${seasonNumber}`,
      startTime: `${startTime}`,
    })

    void router.push(`/watch/serie?${params.toString()}`)
  }

  const firstSeason = serie?.season[0]
  const firstEpisode = firstSeason?.episodes[0]

  const seasonsAmount = serie?.season.length ?? 0
  const seasonsLabel = seasonsAmount === 1 ? '1 temporada' : `${seasonsAmount} temporadas`

  const releaseYear = data.first_air_date?.match(/^(\d{4})/)?.[1] ?? null
  const translatedStatus = data.status ? (seriesStatusLabels[data.status] ?? data.status) : null

  const backdropImage = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : (serie?.background ?? '/fundo-largo.jpg')
  const posterImage = data.poster_path
    ? `https://image.tmdb.org/t/p/w780${data.poster_path}`
    : backdropImage
  const socialImage = data.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
    : 'https://flixnext.com.br/fundo-largo.jpg'

  const genres = data.genres?.length
    ? data.genres
    : (serie?.genero.map((name, index) => ({
        id: -(index + 1),
        name,
      })) ?? [])

  const overview = serie?.description?.trim() || data.overview?.trim() || ''

  const selectedSeasonIndex = serie
    ? serie.season.findIndex((season) => season.s === seasonToShow)
    : -1

  const selectedSeasonEpisodes = selectedSeasonIndex >= 0 ? episodesData[selectedSeasonIndex] : null

  const hasCrew = Object.keys(crewDepartment).length > 0

  return (
    <>
      <Head>
        <title>{`${data.name} - FlixNext`}</title>

        <meta name="description" content={data.overview} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content={`${data.name} - FlixNext`} />

        <meta property="og:description" content={data.overview} />

        <meta property="og:image" content={socialImage} />

        <meta property="og:url" content={`https://flixnext.com.br/series/serie/${data.id}`} />

        <meta property="og:type" content="video.tv_show" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={`${data.name} - FlixNext`} />

        <meta name="twitter:description" content={data.overview} />

        <meta name="twitter:image" content={socialImage} />

        <link rel="icon" href="/favicon_io/android-chrome-192x192.png" />
      </Head>

      <Header />

      {serie ? (
        <main className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.imageContainer} aria-hidden="true">
              <picture>
                <source media="(max-width: 915px)" srcSet={posterImage} />

                <img src={backdropImage} alt="" loading="eager" decoding="async" />
              </picture>
            </div>

            <div className={styles.heroOverlay} />

            <div className={styles.heroContent}>
              <div className={styles.mainInformation}>
                <Title title={serie.title} subtitle={serie.subtitle} />

                <div className={styles.metadata}>
                  <ul className={styles.seriesDetails} aria-label="Informações da série">
                    <li>{seasonsLabel}</li>

                    {releaseYear && <li>{releaseYear}</li>}

                    {translatedStatus && <li>{translatedStatus}</li>}
                  </ul>

                  <Genre genres={genres} />

                  <div className={styles.tmdbInfo}>
                    {serie.news && <NewContent type={serie.news} />}

                    <Stars average={data.vote_average ?? 0} />

                    <ContentRating faixa={serie.faixa} />
                  </div>
                </div>

                <Overview text={overview} />

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.buttonPlay}
                    disabled={!firstEpisode}
                    onClick={() => {
                      if (!firstEpisode || !firstSeason) {
                        return
                      }

                      handlePlayEpisode(firstEpisode, 0, firstSeason.s)
                    }}
                  >
                    <FaPlay aria-hidden="true" />

                    <span>Assistir</span>
                  </button>

                  <div className={styles.buttonContainer}>
                    <WatchLaterContainer
                      loading={loadingButton}
                      onWatchLater={onWatchLater}
                      onClick={() => {
                        void handleWatchLater()
                      }}
                    />

                    {trailer && <TrailerButton trailer={trailer} />}

                    {buttonVisible && (
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => {
                          void router.push(`/dashboard?type=tv&id=${data.id}`)
                        }}
                      >
                        Editar série
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.episodesSection} aria-labelledby="episodes-title">
            <header className={styles.episodesHeader}>
              <h2 id="episodes-title" className={styles.sectionTitle}>
                Episódios
              </h2>

              <div className={styles.seasonControl}>
                <label htmlFor="season-select">Temporada</label>

                <div className={styles.selectWrapper}>
                  <select
                    id="season-select"
                    value={seasonToShow}
                    onChange={(event) => {
                      handleChangeSeason(Number(event.target.value))
                    }}
                  >
                    {serie.season.map((season) => {
                      const language = getSeasonLanguage(season.lang)

                      return (
                        <option key={season.s} value={season.s}>
                          {`Temporada ${season.s}${language ? ` · ${language}` : ''}`}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </header>

            <div className={styles.cardContainer}>
              {episodesToShow.map((internalEpisode) => {
                const episode = selectedSeasonEpisodes?.find(
                  (item) => item.episode_number === internalEpisode.ep,
                )

                const progress = episode
                  ? (episodesProgressMap.get(
                      `${episode.season_number}-${episode.episode_number}`,
                    ) ?? null)
                  : null

                const image = episode?.still_path
                  ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                  : '/logo.png'

                const episodeInfo = {
                  serieTmdbId: serie.tmdbID,
                  seasonNumber: episode?.season_number ?? seasonToShow,
                  image,
                  episode,
                  data: internalEpisode,
                  progress,
                }
                debug.log('informações dos episódios', episodeInfo)

                return (
                  <div
                    key={`${seasonToShow}-${internalEpisode.ep}`}
                    className={styles.episodeContainer}
                  >
                    <EpisodeCard episodeData={episodeInfo} handlePlay={handlePlayEpisode} />
                  </div>
                )
              })}
            </div>
          </section>

          <section className={styles.additionalContent}>
            {relatedCards.length > 0 && <RelatedCardsContainer cards={relatedCards} />}

            {castLoading ? (
              <div className={styles.sectionLoading}>
                <Spinner />
              </div>
            ) : (
              <>
                {castMembers.length > 0 && (
                  <CastContainer cast={castMembers} limit={castMembers.length} />
                )}

                {hasCrew && <CrewContainer crewDepartment={crewDepartment} />}
              </>
            )}
          </section>
        </main>
      ) : (
        <main className={styles.loading}>
          <Spinner />
        </main>
      )}

      <WarningModal
        open={warningModalOpen}
        onClose={() => {
          setWarningModalOpen(false)
        }}
      />

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SeriePageProps> = async (context) => {
  const { tmdbId } = context.params as {
    tmdbId: string
  }

  const tmdbToken = process.env.TMDB_TOKEN

  if (!tmdbToken) {
    return {
      notFound: true,
    }
  }

  try {
    const response = await axios.get<TMDBSeries>(`https://api.themoviedb.org/3/tv/${tmdbId}`, {
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
      },
      params: {
        language: 'pt-BR',
      },
    })

    const data = response.data

    if (!data) {
      return {
        notFound: true,
      }
    }

    const cookies = nookies.get(context)
    const token = cookies['flix-token']
    let buttonVisible = false

    if (token) {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_RENDER}/user/access`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        buttonVisible = true
      } catch (error) {
        debug.warn('Usuário sem acesso administrativo', error)
      }
    }

    return {
      props: {
        data,
        buttonVisible,
      },
    }
  } catch (error) {
    debug.error('Erro ao buscar série no TMDB', error)

    return {
      notFound: true,
    }
  }
}

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { toast } from '@/components/ui/Notifications'

import { Episodes, Seasons } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { tmdb } from '@/classes/TMDB'
import { agp, gen, stm } from '@/utils/Genres'
import { classification } from '@/utils/Variaveis'
import { getAvailableStreamingGenres, mergeStreamingGenres } from '@/utils/WatchProviders'

import styles from './styles.module.scss'

type TVNews = '' | 'season' | 'episode' | 'news'

export interface TVProps {
  background: string
  overlay: string
  tmdbID: number
  title: string
  subtitle: string
  description: string
  genero: string[]
  faixa: string
  season: Seasons[]
  news: TVNews
}

type FormFieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

const initialSerieData: TVProps = {
  background: '/fundo-largo.jpg',
  overlay: '/fundo-alto.jpg',
  tmdbID: 0,
  title: '',
  subtitle: '',
  description: '',
  genero: [],
  faixa: 'L',
  season: [],
  news: 'news',
}

const createEpisode = (episodeNumber: number): Episodes => ({
  ep: episodeNumber,
  src: '',
  duration: '',
})

const createSeason = (seasonNumber: number): Seasons => ({
  s: seasonNumber,
  lang: 'Dublado',
  episodes: [createEpisode(1)],
})

const CreateTV = () => {
  const [serieData, setSerieData] = useState<TVProps>(initialSerieData)

  const [saving, setSaving] = useState(false)
  const [loadingTMDB, setLoadingTMDB] = useState(false)

  const genres = useMemo(() => {
    return [...new Set([...Object.values(gen), ...Object.values(agp), ...Object.values(stm)])]
  }, [])

  useEffect(() => {
    if (serieData.tmdbID <= 0) return

    const fetchTMDBData = debounce(async () => {
      setLoadingTMDB(true)

      try {
        const data = await tmdb.fetchSeriesDetails(serieData.tmdbID)

        if (!data) return

        const tmdbGenres = data.genres.map(({ name }) => {
          return name === 'Thriller' ? 'Suspense' : name
        })
        const streamingGenres = getAvailableStreamingGenres(data)

        setSerieData((previousData) => ({
          ...previousData,
          title: data.name ?? '',
          description: data.overview ?? '',
          genero: mergeStreamingGenres(tmdbGenres, streamingGenres),
        }))
      } catch (error) {
        debug.log('Erro ao buscar série no TMDB:', error)

        toast.error('Não foi possível buscar os dados no TMDB.')
      } finally {
        setLoadingTMDB(false)
      }
    }, 800)

    fetchTMDBData()

    return () => {
      fetchTMDBData.cancel()
    }
  }, [serieData.tmdbID])

  const updateSeasons = (updater: (seasons: Seasons[]) => Seasons[]) => {
    setSerieData((previousData) => ({
      ...previousData,
      season: updater(previousData.season),
    }))
  }

  const handleChange = (event: ChangeEvent<FormFieldElement>) => {
    const { name, value } = event.target

    setSerieData((previousData) => ({
      ...previousData,
      [name]: name === 'tmdbID' ? Number(value) : value,
    }))
  }

  const handleGenres = (event: ChangeEvent<HTMLSelectElement>) => {
    const genero = Array.from(event.target.selectedOptions, ({ value }) => value)

    setSerieData((previousData) => ({
      ...previousData,
      genero,
    }))
  }

  const handleAddSeason = () => {
    updateSeasons((seasons) => {
      const greatestSeasonNumber = seasons.reduce(
        (greatest, season) => Math.max(greatest, season.s),
        0,
      )

      return [...seasons, createSeason(greatestSeasonNumber + 1)]
    })
  }

  const handleRemoveSeason = (seasonIndex: number) => {
    updateSeasons((seasons) => {
      return seasons.filter((_, index) => index !== seasonIndex)
    })
  }

  const handleSeasonChange = <K extends keyof Seasons>(
    seasonIndex: number,
    field: K,
    value: Seasons[K],
  ) => {
    updateSeasons((seasons) => {
      return seasons.map((season, index) => {
        if (index !== seasonIndex) return season

        return {
          ...season,
          [field]: value,
        }
      })
    })
  }

  const handleAddEpisode = (seasonIndex: number) => {
    updateSeasons((seasons) => {
      return seasons.map((season, index) => {
        if (index !== seasonIndex) return season

        const greatestEpisodeNumber = season.episodes.reduce((greatest, episode) => {
          return Math.max(greatest, episode.ep)
        }, 0)

        return {
          ...season,
          episodes: [...season.episodes, createEpisode(greatestEpisodeNumber + 1)],
        }
      })
    })
  }

  const handleRemoveEpisode = (seasonIndex: number, episodeIndex: number) => {
    updateSeasons((seasons) => {
      return seasons.map((season, index) => {
        if (index !== seasonIndex) return season

        if (season.episodes.length === 1) {
          toast.info('A temporada precisa ter pelo menos um episódio.')

          return season
        }

        return {
          ...season,
          episodes: season.episodes.filter((_, index) => index !== episodeIndex),
        }
      })
    })
  }

  const handleEpisodeChange = <K extends keyof Episodes>(
    seasonIndex: number,
    episodeIndex: number,
    field: K,
    value: Episodes[K],
  ) => {
    updateSeasons((seasons) => {
      return seasons.map((season, currentSeasonIndex) => {
        if (currentSeasonIndex !== seasonIndex) {
          return season
        }

        return {
          ...season,
          episodes: season.episodes.map((episode, currentEpisodeIndex) => {
            if (currentEpisodeIndex !== episodeIndex) {
              return episode
            }

            return {
              ...episode,
              [field]: value,
            }
          }),
        }
      })
    })
  }

  const validateSerie = (): boolean => {
    if (serieData.tmdbID <= 0) {
      toast.warning('Informe um TMDB ID válido.')
      return false
    }

    if (!serieData.title.trim()) {
      toast.warning('Informe o título da série.')
      return false
    }

    if (serieData.genero.length === 0) {
      toast.warning('Selecione pelo menos um gênero.')

      return false
    }

    if (serieData.season.length === 0) {
      toast.warning('Adicione pelo menos uma temporada.')

      return false
    }

    const seasonNumbers = serieData.season.map(({ s }) => s)

    const hasDuplicatedSeason = new Set(seasonNumbers).size !== seasonNumbers.length

    if (hasDuplicatedSeason) {
      toast.warning('Existem temporadas com o mesmo número.')

      return false
    }

    for (const season of serieData.season) {
      if (season.episodes.length === 0) {
        toast.warning(`A temporada ${season.s} precisa possuir pelo menos um episódio.`)

        return false
      }

      const episodeNumbers = season.episodes.map(({ ep }) => ep)

      const hasDuplicatedEpisode = new Set(episodeNumbers).size !== episodeNumbers.length

      if (hasDuplicatedEpisode) {
        toast.warning(`Existem episódios repetidos na temporada ${season.s}.`)

        return false
      }

      const hasEpisodeWithoutSource = season.episodes.some(({ src }) => !src.trim())

      if (hasEpisodeWithoutSource) {
        toast.warning(`Preencha os links dos episódios da temporada ${season.s}.`)

        return false
      }
    }

    return true
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (saving || loadingTMDB || !validateSerie()) {
      return
    }

    const payload: TVProps = {
      ...serieData,
      title: serieData.title.trim(),
      subtitle: serieData.subtitle.trim(),
      description: serieData.description.trim(),
      season: serieData.season.map((season) => ({
        ...season,
        episodes: season.episodes.map((episode) => ({
          ...episode,
          src: episode.src.trim(),
          duration: episode.duration.trim(),
        })),
      })),
    }

    setSaving(true)

    try {
      const response = await mongoService.createSerie(payload)

      debug.log('Série criada:', response)

      setSerieData(initialSerieData)

      toast.success('Série adicionada ao catálogo!')
    } catch (error) {
      debug.log('Erro ao adicionar série:', error)

      toast.error('Não foi possível adicionar a série.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div>
          <div className={styles.formItem}>
            <label htmlFor="title">Título</label>

            <input
              id="title"
              type="text"
              name="title"
              value={serieData.title}
              disabled={saving}
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="subtitle">Subtítulo</label>

            <input
              id="subtitle"
              type="text"
              name="subtitle"
              value={serieData.subtitle}
              disabled={saving}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="description">Descrição</label>

            <textarea
              id="description"
              name="description"
              rows={4}
              value={serieData.description}
              disabled={saving}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="tmdbID">TMDB ID</label>

            <input
              id="tmdbID"
              className={styles.tmdbid}
              type="number"
              name="tmdbID"
              min={1}
              value={serieData.tmdbID || ''}
              disabled={saving}
              required
              onChange={handleChange}
            />

            {loadingTMDB && <small>Buscando dados no TMDB...</small>}
          </div>

          <div className={styles.formItem}>
            <label htmlFor="faixa">Classificação</label>

            <select
              id="faixa"
              className={styles.selectFaixa}
              name="faixa"
              value={serieData.faixa}
              disabled={saving}
              onChange={handleChange}
            >
              {classification.map(({ etaria }) => (
                <option key={etaria} value={etaria}>
                  {etaria}
                </option>
              ))}
            </select>

            <span className={styles.chosenFaixa}>Classificação escolhida: {serieData.faixa}</span>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="news">Status</label>

            <select
              id="news"
              className={styles.selectNews}
              name="news"
              value={serieData.news}
              disabled={saving}
              onChange={handleChange}
            >
              <option value="">Sem status</option>

              <option value="season">Nova temporada</option>

              <option value="episode">Novos episódios</option>

              <option value="news">Nova série</option>
            </select>
          </div>

          <div className={styles.formItem}>
            <div className={styles.sectionHeader}>
              <div>
                <span>Conteúdo</span>

                <h2>Temporadas e episódios</h2>

                <p>Configure os episódios disponíveis em cada temporada.</p>
              </div>

              <button
                type="button"
                className={styles.addButton}
                disabled={saving}
                onClick={handleAddSeason}
              >
                + Adicionar temporada
              </button>
            </div>

            {serieData.season.length === 0 && (
              <div className={styles.emptySeasons}>
                <strong>Nenhuma temporada adicionada</strong>

                <p>Adicione uma temporada para começar a cadastrar os episódios.</p>
              </div>
            )}

            {serieData.season.map((season, seasonIndex) => {
              const seasonKey = `season-${seasonIndex}`

              return (
                <section key={seasonKey} className={styles.seasonForm}>
                  <header className={styles.seasonHeader}>
                    <div className={styles.seasonTitle}>
                      <span>{seasonIndex + 1}</span>

                      <div>
                        <h3>Temporada {season.s}</h3>

                        <small>
                          {season.episodes.length}{' '}
                          {season.episodes.length === 1 ? 'episódio' : 'episódios'}
                        </small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.removeButton}
                      disabled={saving}
                      onClick={() => {
                        handleRemoveSeason(seasonIndex)
                      }}
                    >
                      Remover temporada
                    </button>
                  </header>

                  <div className={styles.seasonSettings}>
                    <div>
                      <label htmlFor={`${seasonKey}-number`}>Nº da temporada</label>

                      <input
                        id={`${seasonKey}-number`}
                        className={styles.seasonNumber}
                        type="number"
                        min={0}
                        value={season.s}
                        disabled={saving}
                        onChange={(event) => {
                          handleSeasonChange(seasonIndex, 's', Number(event.target.value))
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${seasonKey}-lang`}>Idioma</label>

                      <select
                        id={`${seasonKey}-lang`}
                        className={styles.seasonLang}
                        value={season.lang}
                        disabled={saving}
                        onChange={(event) => {
                          handleSeasonChange(seasonIndex, 'lang', event.target.value)
                        }}
                      >
                        <option value="Dublado">Dublado</option>

                        <option value="Legendado">Legendado</option>
                      </select>
                    </div>
                  </div>

                  <h3>Episódios</h3>

                  {season.episodes.map((episode, episodeIndex) => {
                    const episodeKey = `${seasonKey}-episode-${episodeIndex}`

                    const disableRemoval = saving || season.episodes.length === 1

                    return (
                      <div key={episodeKey} className={styles.episodeContainer}>
                        <div className={styles.episodeForm}>
                          <div className={styles.field}>
                            <label htmlFor={`${episodeKey}-number`}>Nº do episódio</label>

                            <input
                              id={`${episodeKey}-number`}
                              className={styles.episodeNumber}
                              type="number"
                              min={1}
                              value={episode.ep}
                              disabled={saving}
                              onChange={(event) => {
                                handleEpisodeChange(
                                  seasonIndex,
                                  episodeIndex,
                                  'ep',
                                  Number(event.target.value),
                                )
                              }}
                            />
                          </div>

                          <div className={styles.field}>
                            <label htmlFor={`${episodeKey}-src`}>Link</label>

                            <input
                              id={`${episodeKey}-src`}
                              type="url"
                              placeholder="https://..."
                              value={episode.src}
                              disabled={saving}
                              required
                              onChange={(event) => {
                                handleEpisodeChange(
                                  seasonIndex,
                                  episodeIndex,
                                  'src',
                                  event.target.value,
                                )
                              }}
                            />
                          </div>

                          <div className={styles.field}>
                            <label htmlFor={`${episodeKey}-duration`}>Duração</label>

                            <input
                              id={`${episodeKey}-duration`}
                              type="text"
                              placeholder="00m"
                              value={episode.duration}
                              disabled={saving}
                              onChange={(event) => {
                                handleEpisodeChange(
                                  seasonIndex,
                                  episodeIndex,
                                  'duration',
                                  event.target.value,
                                )
                              }}
                            />
                          </div>
                        </div>

                        <div className={styles.buttonEpisode}>
                          <button
                            type="button"
                            disabled={disableRemoval}
                            title={
                              season.episodes.length === 1
                                ? 'A temporada precisa ter pelo menos um episódio'
                                : 'Remover episódio'
                            }
                            onClick={() => {
                              handleRemoveEpisode(seasonIndex, episodeIndex)
                            }}
                          >
                            Remover episódio
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  <div className={styles.buttonSeason}>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => {
                        handleAddEpisode(seasonIndex)
                      }}
                    >
                      + Adicionar episódio
                    </button>
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        <aside className={styles.formItem}>
          <label htmlFor="genres">Gêneros</label>

          <select
            id="genres"
            multiple
            value={serieData.genero}
            disabled={saving}
            onChange={handleGenres}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <p>Gêneros selecionados</p>

          <p>
            {serieData.genero.length > 0
              ? serieData.genero.join(', ')
              : 'Nenhum gênero selecionado'}
          </p>
        </aside>
      </div>

      <div className={styles.buttonContainer}>
        <button
          type="submit"
          disabled={saving || loadingTMDB || serieData.tmdbID <= 0 || !serieData.title.trim()}
        >
          {saving ? 'Adicionando série...' : 'Adicionar série'}
        </button>
      </div>
    </form>
  )
}

export default CreateTV

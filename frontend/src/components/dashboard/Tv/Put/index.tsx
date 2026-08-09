import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { toast } from 'react-toastify'

import { Episodes, Seasons } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { agp, gen, stm } from '@/utils/Genres'
import { classification } from '@/utils/Variaveis'
import { tmdb } from '@/classes/TMDB'
import { getAvailableStreamingGenres, mergeStreamingGenres } from '@/utils/WatchProviders'

import { TVProps } from '../Create'

import styles from './styles.module.scss'
import { useTMDB } from '@/contexts/TMDBContext'

interface PutTVProps {
    tmdbid: number
}

type FormFieldElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement

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
    news: '',
}

const createEpisode = (episodeNumber: number): Episodes => ({
    ep: episodeNumber,
    src: '',
    duration: '',
})

const createSeason = (seasonNumber: number): Seasons => ({
    s: seasonNumber,
    lang: 'Dub',
    episodes: [createEpisode(1)],
})

const PutTV = ({ tmdbid }: PutTVProps) => {
    const [serieData, setSerieData] =
        useState<TVProps>(initialSerieData)

    const [loadingSerie, setLoadingSerie] = useState(true)
    const [saving, setSaving] = useState(false)

    const [poster, setPoster] = useState('')

    const { serieData: serieTMDB } = useTMDB()

    useEffect(() => {
        const find = serieTMDB.find(serie => serie.id === tmdbid)
        if (!find) return
        setPoster(find.poster_path)
    }, [tmdbid])

    const genres = useMemo(() => {
        return [
            ...new Set([
                ...Object.values(gen),
                ...Object.values(agp),
                ...Object.values(stm),
            ]),
        ]
    }, [])



    useEffect(() => {
        let active = true

        const loadSerie = async () => {
            setLoadingSerie(true)

            try {
                const [response, tmdbDetails] = await Promise.all([
                    mongoService.findOneSerieById(tmdbid),
                    tmdb.fetchSeriesDetails(tmdbid),
                ])

                if (!active) return

                if (!response) {
                    toast.warning(
                        'Série não encontrada no catálogo.',
                    )

                    return
                }
                debug.log('Gêneros salvos:', response.genero)
                debug.log('Opções disponíveis:', genres)

                const storedGenres = matchGenres(response.genero ?? [], genres)
                const streamingGenres = tmdbDetails
                    ? getAvailableStreamingGenres(tmdbDetails)
                    : []

                setSerieData({
                    ...initialSerieData,
                    ...response,
                    news: response.news ?? '',
                    genero: mergeStreamingGenres(storedGenres, streamingGenres),
                    season: response.season ?? [],
                })
            } catch (error) {
                debug.log(
                    'Erro ao carregar série:',
                    error,
                )

                toast.error(
                    'Não foi possível carregar a série.',
                )
            } finally {
                if (active) {
                    setLoadingSerie(false)
                }
            }
        }

        loadSerie()

        return () => {
            active = false
        }
    }, [tmdbid])

    const updateSeasons = (
        updater: (seasons: Seasons[]) => Seasons[],
    ) => {
        setSerieData((previousData) => ({
            ...previousData,
            season: updater(previousData.season),
        }))
    }

    const handleChange = (
        event: ChangeEvent<FormFieldElement>,
    ) => {
        const { name, value } = event.target

        setSerieData((previousData) => ({
            ...previousData,
            [name]: name === 'tmdbID'
                ? Number(value)
                : value,
        }))
    }

    const handleGenres = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        const genero = Array.from(
            event.currentTarget.selectedOptions,
            ({ value }) => value,
        )

        setSerieData((previousData) => ({
            ...previousData,
            genero,
        }))
    }

    const handleAddSeason = () => {
        updateSeasons((seasons) => {
            const greatestSeasonNumber = seasons.reduce(
                (greatest, season) => {
                    return Math.max(greatest, season.s)
                },
                0,
            )

            return [
                ...seasons,
                createSeason(greatestSeasonNumber + 1),
            ]
        })
    }

    const handleRemoveSeason = (seasonIndex: number) => {
        updateSeasons((seasons) => {
            return seasons.filter(
                (_, index) => index !== seasonIndex,
            )
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

                const greatestEpisodeNumber =
                    season.episodes.reduce(
                        (greatest, episode) => {
                            return Math.max(
                                greatest,
                                episode.ep,
                            )
                        },
                        0,
                    )

                return {
                    ...season,
                    episodes: [
                        ...season.episodes,
                        createEpisode(
                            greatestEpisodeNumber + 1,
                        ),
                    ],
                }
            })
        })
    }

    const handleRemoveEpisode = (
        seasonIndex: number,
        episodeIndex: number,
    ) => {
        updateSeasons((seasons) => {
            return seasons.map((season, index) => {
                if (index !== seasonIndex) return season

                if (season.episodes.length === 1) {
                    toast.info(
                        'A temporada precisa ter pelo menos um episódio.',
                    )

                    return season
                }

                return {
                    ...season,
                    episodes: season.episodes.filter(
                        (_, index) => {
                            return index !== episodeIndex
                        },
                    ),
                }
            })
        })
    }

    const handleEpisodeChange = <
        K extends keyof Episodes,
    >(
        seasonIndex: number,
        episodeIndex: number,
        field: K,
        value: Episodes[K],
    ) => {
        updateSeasons((seasons) => {
            return seasons.map(
                (season, currentSeasonIndex) => {
                    if (
                        currentSeasonIndex !== seasonIndex
                    ) {
                        return season
                    }

                    return {
                        ...season,
                        episodes: season.episodes.map(
                            (
                                episode,
                                currentEpisodeIndex,
                            ) => {
                                if (
                                    currentEpisodeIndex !==
                                    episodeIndex
                                ) {
                                    return episode
                                }

                                return {
                                    ...episode,
                                    [field]: value,
                                }
                            },
                        ),
                    }
                },
            )
        })
    }

    const normalizeGenre = (value: string): string => {
        return value
            .trim()
            .toLocaleLowerCase('pt-BR')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
    }

    const matchGenres = (
        storedGenres: string[] | undefined,
        availableGenres: string[],
    ): string[] => {
        if (!Array.isArray(storedGenres)) return []

        const genreMap = new Map(
            availableGenres.map((genre) => [
                normalizeGenre(genre),
                genre,
            ]),
        )

        return storedGenres
            .map((genre) => genreMap.get(normalizeGenre(genre)))
            .filter((genre): genre is string => Boolean(genre))
    }

    const validateSerie = (): boolean => {
        if (!serieData.title.trim()) {
            toast.warning('Informe o título da série.')
            return false
        }

        if (serieData.tmdbID <= 0) {
            toast.warning('Informe um TMDB ID válido.')
            return false
        }

        if (serieData.genero.length === 0) {
            toast.warning(
                'Selecione pelo menos um gênero.',
            )

            return false
        }

        if (serieData.season.length === 0) {
            toast.warning(
                'A série precisa ter pelo menos uma temporada.',
            )

            return false
        }

        const seasonNumbers = serieData.season.map(
            ({ s }) => s,
        )

        if (
            new Set(seasonNumbers).size !==
            seasonNumbers.length
        ) {
            toast.warning(
                'Existem temporadas com o mesmo número.',
            )

            return false
        }

        for (const season of serieData.season) {
            if (season.episodes.length === 0) {
                toast.warning(
                    `A temporada ${season.s} não possui episódios.`,
                )

                return false
            }

            const episodeNumbers = season.episodes.map(
                ({ ep }) => ep,
            )

            if (
                new Set(episodeNumbers).size !==
                episodeNumbers.length
            ) {
                toast.warning(
                    `Existem episódios repetidos na temporada ${season.s}.`,
                )

                return false
            }

            const invalidEpisode = season.episodes.some(
                ({ ep, src }) => {
                    return ep <= 0 || !src.trim()
                },
            )

            if (invalidEpisode) {
                toast.warning(
                    `Verifique os episódios da temporada ${season.s}.`,
                )

                return false
            }
        }

        return true
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (saving || loadingSerie || !validateSerie()) {
            return
        }

        const payload: TVProps = {
            ...serieData,
            title: serieData.title.trim(),
            subtitle: serieData.subtitle.trim(),
            description: serieData.description.trim(),
            season: serieData.season.map((season) => ({
                ...season,
                episodes: season.episodes.map(
                    (episode) => ({
                        ...episode,
                        src: episode.src.trim(),
                        duration:
                            episode.duration.trim(),
                    }),
                ),
            })),
        }

        setSaving(true)

        try {
            await mongoService.updateSerie(
                tmdbid,
                payload,
            )

            setSerieData(payload)

            toast.success('Série atualizada com sucesso!')
        } catch (error) {
            debug.log(
                'Erro ao atualizar série:',
                error,
            )

            toast.error(
                'Não foi possível atualizar a série.',
            )
        } finally {
            setSaving(false)
        }
    }

    if (loadingSerie) {
        return (
            <div className={styles.loadingState}>
                <strong>Carregando série...</strong>

                <p>Buscando os dados do TMDB ID {tmdbid}.</p>
            </div>
        )
    }

    // JSX do formulário
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.formRow}>
                <div>
                    <div className={styles.formItem}>
                        <label htmlFor="title">
                            Título
                        </label>

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
                        <label htmlFor="subtitle">
                            Subtítulo
                        </label>

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
                        <label htmlFor="description">
                            Descrição
                        </label>

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
                        <label htmlFor="tmdbID">
                            TMDB ID
                        </label>

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

                        {loadingSerie && (
                            <small>
                                Buscando dados no TMDB...
                            </small>
                        )}
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="faixa">
                            Classificação
                        </label>

                        <select
                            id="faixa"
                            className={styles.selectFaixa}
                            name="faixa"
                            value={serieData.faixa}
                            disabled={saving}
                            onChange={handleChange}
                        >
                            {classification.map(
                                ({ etaria }) => (
                                    <option
                                        key={etaria}
                                        value={etaria}
                                    >
                                        {etaria}
                                    </option>
                                ),
                            )}
                        </select>

                        <span
                            className={
                                styles.chosenFaixa
                            }
                        >
                            Classificação escolhida:{' '}
                            {serieData.faixa}
                        </span>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="news">
                            Status
                        </label>

                        <select
                            id="news"
                            className={styles.selectNews}
                            name="news"
                            value={serieData.news}
                            disabled={saving}
                            onChange={handleChange}
                        >
                            <option value="">
                                Sem status
                            </option>

                            <option value="season">
                                Nova temporada
                            </option>

                            <option value="episode">
                                Novos episódios
                            </option>

                            <option value="news">
                                Nova série
                            </option>
                        </select>
                    </div>

                    <div className={styles.formItem}>
                        <div
                            className={
                                styles.sectionHeader
                            }
                        >
                            <div>
                                <span>Conteúdo</span>

                                <h2>
                                    Temporadas e episódios
                                </h2>

                                <p>
                                    Configure os episódios
                                    disponíveis em cada
                                    temporada.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={
                                    styles.addButton
                                }
                                disabled={saving}
                                onClick={handleAddSeason}
                            >
                                + Adicionar temporada
                            </button>
                        </div>

                        {serieData.season.length ===
                            0 && (
                                <div
                                    className={
                                        styles.emptySeasons
                                    }
                                >
                                    <strong>
                                        Nenhuma temporada
                                        adicionada
                                    </strong>

                                    <p>
                                        Adicione uma temporada
                                        para começar a cadastrar
                                        os episódios.
                                    </p>
                                </div>
                            )}

                        {serieData.season.map(
                            (season, seasonIndex) => {
                                const seasonKey =
                                    `season-${seasonIndex}`

                                return (
                                    <section
                                        key={seasonKey}
                                        className={
                                            styles.seasonForm
                                        }
                                    >
                                        <header
                                            className={
                                                styles.seasonHeader
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.seasonTitle
                                                }
                                            >
                                                <span>
                                                    {seasonIndex +
                                                        1}
                                                </span>

                                                <div>
                                                    <h3>
                                                        Temporada{' '}
                                                        {season.s}
                                                    </h3>

                                                    <small>
                                                        {
                                                            season
                                                                .episodes
                                                                .length
                                                        }{' '}
                                                        {season
                                                            .episodes
                                                            .length ===
                                                            1
                                                            ? 'episódio'
                                                            : 'episódios'}
                                                    </small>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    styles.removeButton
                                                }
                                                disabled={
                                                    saving
                                                }
                                                onClick={() => {
                                                    handleRemoveSeason(
                                                        seasonIndex,
                                                    )
                                                }}
                                            >
                                                Remover
                                                temporada
                                            </button>
                                        </header>

                                        <div
                                            className={
                                                styles.seasonSettings
                                            }
                                        >
                                            <div>
                                                <label
                                                    htmlFor={`${seasonKey}-number`}
                                                >
                                                    Nº da
                                                    temporada
                                                </label>

                                                <input
                                                    id={`${seasonKey}-number`}
                                                    className={
                                                        styles.seasonNumber
                                                    }
                                                    type="number"
                                                    min={0}
                                                    value={
                                                        season.s
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) => {
                                                        handleSeasonChange(
                                                            seasonIndex,
                                                            's',
                                                            Number(
                                                                event
                                                                    .target
                                                                    .value,
                                                            ),
                                                        )
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`${seasonKey}-lang`}
                                                >
                                                    Idioma
                                                </label>

                                                <select
                                                    id={`${seasonKey}-lang`}
                                                    className={
                                                        styles.seasonLang
                                                    }
                                                    value={
                                                        season.lang
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) => {
                                                        handleSeasonChange(
                                                            seasonIndex,
                                                            'lang',
                                                            event
                                                                .target
                                                                .value,
                                                        )
                                                    }}
                                                >
                                                    <option value="Dublado">
                                                        Dublado
                                                    </option>

                                                    <option value="Legendado">
                                                        Legendado
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <h3>Episódios</h3>

                                        {season.episodes.map(
                                            (
                                                episode,
                                                episodeIndex,
                                            ) => {
                                                const episodeKey =
                                                    `${seasonKey}-episode-${episodeIndex}`

                                                const disableRemoval =
                                                    saving ||
                                                    season
                                                        .episodes
                                                        .length ===
                                                    1

                                                return (
                                                    <div
                                                        key={
                                                            episodeKey
                                                        }
                                                        className={
                                                            styles.episodeContainer
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.episodeForm
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.field
                                                                }
                                                            >
                                                                <label
                                                                    htmlFor={`${episodeKey}-number`}
                                                                >
                                                                    Nº do
                                                                    episódio
                                                                </label>

                                                                <input
                                                                    id={`${episodeKey}-number`}
                                                                    className={
                                                                        styles.episodeNumber
                                                                    }
                                                                    type="number"
                                                                    min={
                                                                        1
                                                                    }
                                                                    value={
                                                                        episode.ep
                                                                    }
                                                                    disabled={
                                                                        saving
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) => {
                                                                        handleEpisodeChange(
                                                                            seasonIndex,
                                                                            episodeIndex,
                                                                            'ep',
                                                                            Number(
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                            ),
                                                                        )
                                                                    }}
                                                                />
                                                            </div>

                                                            <div
                                                                className={
                                                                    styles.field
                                                                }
                                                            >
                                                                <label
                                                                    htmlFor={`${episodeKey}-src`}
                                                                >
                                                                    Link
                                                                </label>

                                                                <input
                                                                    id={`${episodeKey}-src`}
                                                                    type="url"
                                                                    placeholder="https://..."
                                                                    value={
                                                                        episode.src
                                                                    }
                                                                    disabled={
                                                                        saving
                                                                    }
                                                                    required
                                                                    onChange={(
                                                                        event,
                                                                    ) => {
                                                                        handleEpisodeChange(
                                                                            seasonIndex,
                                                                            episodeIndex,
                                                                            'src',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }}
                                                                />
                                                            </div>

                                                            <div
                                                                className={
                                                                    styles.field
                                                                }
                                                            >
                                                                <label
                                                                    htmlFor={`${episodeKey}-duration`}
                                                                >
                                                                    Duração
                                                                </label>

                                                                <input
                                                                    id={`${episodeKey}-duration`}
                                                                    type="text"
                                                                    placeholder="00m"
                                                                    value={
                                                                        episode.duration
                                                                    }
                                                                    disabled={
                                                                        saving
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) => {
                                                                        handleEpisodeChange(
                                                                            seasonIndex,
                                                                            episodeIndex,
                                                                            'duration',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.buttonEpisode
                                                            }
                                                        >
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    disableRemoval
                                                                }
                                                                title={
                                                                    season
                                                                        .episodes
                                                                        .length ===
                                                                        1
                                                                        ? 'A temporada precisa ter pelo menos um episódio'
                                                                        : 'Remover episódio'
                                                                }
                                                                onClick={() => {
                                                                    handleRemoveEpisode(
                                                                        seasonIndex,
                                                                        episodeIndex,
                                                                    )
                                                                }}
                                                            >
                                                                Remover
                                                                episódio
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            },
                                        )}

                                        <div
                                            className={
                                                styles.buttonSeason
                                            }
                                        >
                                            <button
                                                type="button"
                                                disabled={
                                                    saving
                                                }
                                                onClick={() => {
                                                    handleAddEpisode(
                                                        seasonIndex,
                                                    )
                                                }}
                                            >
                                                + Adicionar
                                                episódio
                                            </button>
                                        </div>
                                    </section>
                                )
                            },
                        )}
                    </div>
                </div>

                <aside className={styles.formItem}>
                    <label htmlFor="genres">
                        Gêneros
                    </label>

                    <select
                        id="genres"
                        multiple
                        value={serieData.genero}
                        disabled={saving}
                        onChange={handleGenres}
                    >
                        {genres.map((genre) => (
                            <option
                                key={genre}
                                value={genre}
                            >
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

                    <div className={styles.poster}>

                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster}` || '/fundo-alto.jpg'}
                            alt={`Capa de ${serieData.title}`}
                        />
                    </div>
                </aside>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    type="submit"
                    disabled={
                        saving ||
                        loadingSerie ||
                        serieData.tmdbID <= 0 ||
                        !serieData.title.trim()
                    }
                >
                    {saving
                        ? 'Adicionando série...'
                        : 'Adicionar série'}
                </button>
            </div>
        </form>
    )
}

export default PutTV

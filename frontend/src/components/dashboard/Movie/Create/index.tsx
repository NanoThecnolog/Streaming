import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
} from 'react'
import { toast } from 'react-toastify'

import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { tmdb } from '@/classes/TMDB'
import { agp, gen, stm } from '@/utils/Genres'
import { minToHour } from '@/utils/UtilitiesFunctions'
import { getAvailableStreamingGenres, mergeStreamingGenres } from '@/utils/WatchProviders'
import { classification } from '@/utils/Variaveis'

import styles from './styles.module.scss'

export interface MovieProps {
    background: string
    overlay: string
    tmdbId: number
    title: string
    subtitle: string
    description: string
    faixa: string
    src: string
    duration: string
    genero: string[]
    lang: 'Dub' | 'Leg'
}

interface CreateProps {
    tmdbid: number
}

const createInitialMovieData = (tmdbid: number): MovieProps => {
    return {
        background: '/fundo-largo.jpg',
        overlay: '/fundo-alto.jpg',
        tmdbId: tmdbid,
        title: '',
        subtitle: '',
        description: '',
        faixa: 'L',
        src: '',
        duration: '',
        genero: [],
        lang: 'Dub',
    }
}

const Create = ({ tmdbid }: CreateProps) => {
    const [loading, setLoading] = useState(false)
    const [loadingTMDB, setLoadingTMDB] = useState(false)

    const [movieData, setMovieData] = useState<MovieProps>(() => {
        return createInitialMovieData(tmdbid)
    })

    const genres = [
        ...Object.values(gen),
        ...Object.values(agp),
        ...Object.values(stm),
    ]

    useEffect(() => {
        let isCurrentRequest = true

        const getTMDBDetails = async () => {
            if (!tmdbid) return
            setLoadingTMDB(true)

            // Limpa os dados do filme anterior imediatamente.
            setMovieData(createInitialMovieData(tmdbid))


            try {
                const dataTMDB = await tmdb.fetchMovieDetails(tmdbid)

                if (!isCurrentRequest) return

                if (!dataTMDB) {
                    toast.error('Filme não encontrado no TMDB.')
                    return
                }

                debug.log('Dados do filme:', dataTMDB)

                const tmdbGenres = dataTMDB.genres.map((genre) => {
                    return genre.name === 'Thriller'
                        ? 'Suspense'
                        : genre.name
                })
                const streamingGenres = getAvailableStreamingGenres(dataTMDB)

                setMovieData((previousData) => ({
                    ...previousData,
                    tmdbId: tmdbid,
                    title: dataTMDB.title ?? '',
                    description: dataTMDB.overview ?? '',
                    duration: dataTMDB.runtime
                        ? minToHour(dataTMDB.runtime)
                        : '',
                    genero: mergeStreamingGenres(tmdbGenres, streamingGenres),
                }))
            } catch (error) {
                if (!isCurrentRequest) return

                debug.log(
                    'Erro ao buscar dados do filme no TMDB:',
                    error,
                )

                toast.error(
                    'Não foi possível buscar os dados do filme no TMDB.',
                )
            } finally {
                if (isCurrentRequest) {
                    setLoadingTMDB(false)
                }
            }
        }

        getTMDBDetails()

        return () => {
            isCurrentRequest = false
        }
    }, [tmdbid])

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (loading || loadingTMDB) return

        if (!movieData.title.trim()) {
            toast.error('Informe o título do filme.')
            return
        }

        setLoading(true)

        try {
            const response = await mongoService.createMovie({
                ...movieData,
                tmdbId: tmdbid,
            })

            debug.log('Resposta da requisição:', response)

            /*
             * Mantém o ID e os dados do TMDB no formulário.
             * Limpa apenas os campos preenchidos manualmente.
             */
            setMovieData((previousData) => ({
                ...previousData,
                subtitle: '',
                faixa: 'L',
                src: '',
                lang: 'Dub',
            }))

            toast.success('Filme adicionado!')
        } catch (error) {
            debug.log('Erro ao adicionar filme:', error)

            toast.error('Erro ao adicionar filme.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >,
    ) => {
        const { name, value } = event.target

        setMovieData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    const handleGenres = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        const selectedGenres = Array.from(
            event.target.selectedOptions,
            (option) => option.value,
        )

        setMovieData((previousData) => ({
            ...previousData,
            genero: selectedGenres,
        }))
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.selectedContent}>
                <span>Filme selecionado</span>

                <strong>
                    {loadingTMDB
                        ? 'Buscando dados no TMDB...'
                        : movieData.title || 'Filme não encontrado'}
                </strong>

                <small>TMDB ID: {tmdbid}</small>
            </div>

            <div className={styles.formRow}>
                <div>
                    <div className={styles.formItem}>
                        <label htmlFor="title">Título</label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={movieData.title}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="subtitle">
                            Subtítulo
                        </label>

                        <input
                            type="text"
                            id="subtitle"
                            name="subtitle"
                            value={movieData.subtitle}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="description">
                            Descrição
                        </label>

                        <textarea
                            rows={4}
                            id="description"
                            name="description"
                            value={movieData.description}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="faixa">Faixa</label>

                        <select
                            id="faixa"
                            name="faixa"
                            value={movieData.faixa}
                            className={styles.selectFaixa}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        >
                            {classification.map((faixa) => (
                                <option
                                    key={faixa.etaria}
                                    value={faixa.etaria}
                                >
                                    {faixa.etaria}
                                </option>
                            ))}
                        </select>

                        <span className={styles.chosenFaixa}>
                            Faixa escolhida: {movieData.faixa}
                        </span>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="src">Link</label>

                        <input
                            type="url"
                            id="src"
                            placeholder="https://example.com"
                            name="src"
                            value={movieData.src}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="duration">
                            Duração
                        </label>

                        <input
                            type="text"
                            id="duration"
                            placeholder="00h 00m"
                            className={styles.duration}
                            name="duration"
                            value={movieData.duration}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="lang">
                            Disponibilidade
                        </label>

                        <select
                            id="lang"
                            name="lang"
                            value={movieData.lang}
                            disabled={loadingTMDB}
                            onChange={handleChange}
                        >
                            <option value="Dub">Dublado</option>
                            <option value="Leg">Legendado</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formItem}>
                    <label htmlFor="genres">Gênero</label>

                    <select
                        id="genres"
                        multiple
                        value={movieData.genero}
                        disabled={loadingTMDB}
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
                    <p>{movieData.genero.join(', ')}</p>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    type="submit"
                    disabled={
                        loading ||
                        loadingTMDB ||
                        !movieData.title.trim()
                    }
                >
                    {loading
                        ? 'Adicionando...'
                        : 'Adicionar filme'}
                </button>
            </div>
        </form>
    )
}

export default Create

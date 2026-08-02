import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
} from 'react'
import { toast } from 'react-toastify'

import { CardsProps } from '@/@types/Cards'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { agp, gen, stm } from '@/utils/Genres'
import { classification } from '@/utils/Variaveis'

import styles from './styles.module.scss'
import { useTMDB } from '@/contexts/TMDBContext'

interface PutProps {
    tmdbid: number
}

const createInitialMovieData = (tmdbid: number): CardsProps => {
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
        index: 0,
    }
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

const Put = ({ tmdbid }: PutProps) => {
    const [movieData, setMovieData] = useState<CardsProps>(() => {
        return createInitialMovieData(tmdbid)
    })

    const [loadingMovie, setLoadingMovie] = useState(true)
    const [saving, setSaving] = useState(false)
    const [movieFound, setMovieFound] = useState(false)

    const [poster, setPoster] = useState('')

    const { allData } = useTMDB()

    useEffect(() => {
        const find = allData.find(serie => serie.id === tmdbid)
        if (!find) return
        setPoster(find.poster_path)
    }, [tmdbid])

    const genres = [
        ...Object.values(gen),
        ...Object.values(agp),
        ...Object.values(stm),
    ]

    useEffect(() => {
        let isCurrentRequest = true

        const getMovie = async () => {
            setLoadingMovie(true)
            setMovieFound(false)
            setMovieData(createInitialMovieData(tmdbid))

            try {
                const movie = await mongoService.findOneMovieById(tmdbid)

                if (!isCurrentRequest) return

                if (!movie) {
                    toast.warning(
                        'Filme não encontrado no catálogo.',
                    )
                    return
                }

                setMovieData({
                    ...createInitialMovieData(tmdbid),
                    ...movie,
                    tmdbId: tmdbid,
                    genero: matchGenres(movie.genero ?? [], genres),
                })

                setMovieFound(true)
            } catch (error) {
                if (!isCurrentRequest) return

                debug.log('Erro ao buscar filme:', error)
                toast.error('Não foi possível carregar o filme.')
            } finally {
                if (isCurrentRequest) {
                    setLoadingMovie(false)
                }
            }
        }

        getMovie()

        return () => {
            isCurrentRequest = false
        }
    }, [tmdbid])

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (saving || loadingMovie || !movieFound) return

        if (!movieData.title.trim()) {
            toast.warning('Informe o título do filme.')
            return
        }

        if (!movieData.src.trim()) {
            toast.warning('Informe o link do filme.')
            return
        }

        setSaving(true)

        try {
            const updatedMovie: CardsProps = {
                ...movieData,
                tmdbId: tmdbid,
                title: movieData.title.trim(),
                subtitle: movieData.subtitle?.trim() ?? '',
                description: movieData.description.trim(),
                src: movieData.src.trim(),
                duration: movieData.duration.trim(),
            }

            const response = await mongoService.updateMovie(
                tmdbid,
                updatedMovie,
            )

            debug.log('Filme atualizado:', response)

            setMovieData(updatedMovie)
            toast.success('Filme editado!')
        } catch (error) {
            debug.log('Erro ao editar filme:', error)
            toast.error('Não foi possível editar o filme.')
        } finally {
            setSaving(false)
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

    if (loadingMovie) {
        return (
            <div
                className={styles.loadingState}
                role="status"
            >
                <span className={styles.spinner} />

                <strong>Carregando filme</strong>

                <p>Buscando o TMDB ID {tmdbid} no catálogo...</p>
            </div>
        )
    }

    if (!movieFound) {
        return (
            <div className={styles.notFoundState}>
                <strong>Filme não encontrado</strong>

                <p>
                    Não existe um filme com o TMDB ID {tmdbid} no
                    catálogo.
                </p>

                <small>
                    Use a opção Adicionar caso queira cadastrar esse
                    conteúdo.
                </small>
            </div>
        )
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.selectedContent}>

                <div className={styles.movieContent}>
                    <div className={styles.info}>
                        <span>Editando filme</span>
                        <strong>{movieData.title}</strong>
                    </div>
                </div>

                <small>TMDB ID: {tmdbid}</small>
            </div>

            <div className={styles.formRow}>
                <div className={styles.mainFields}>
                    <div className={styles.formItem}>
                        <label htmlFor="title">Título</label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={movieData.title}
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
                            value={movieData.subtitle ?? ''}
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
                            rows={5}
                            value={movieData.description}
                            disabled={saving}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inlineFields}>
                        <div className={styles.formItem}>
                            <label htmlFor="faixa">
                                Classificação
                            </label>

                            <select
                                id="faixa"
                                name="faixa"
                                value={movieData.faixa}
                                disabled={saving}
                                onChange={handleChange}
                            >
                                {classification.map((item) => (
                                    <option
                                        key={item.etaria}
                                        value={item.etaria}
                                    >
                                        {item.etaria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formItem}>
                            <label htmlFor="duration">
                                Duração
                            </label>

                            <input
                                id="duration"
                                type="text"
                                name="duration"
                                placeholder="00h 00m"
                                value={movieData.duration}
                                disabled={saving}
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
                                disabled={saving}
                                onChange={handleChange}
                            >
                                <option value="Dub">
                                    Dublado
                                </option>

                                <option value="Leg">
                                    Legendado
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="src">
                            Link do conteúdo
                        </label>

                        <input
                            id="src"
                            type="url"
                            name="src"
                            placeholder="https://example.com/master.m3u8"
                            value={movieData.src}
                            disabled={saving}
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <aside className={styles.genresPanel}>
                    <div className={styles.formItem}>
                        <label htmlFor="genres">Gêneros</label>

                        <select
                            id="genres"
                            multiple
                            value={movieData.genero}
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
                    </div>

                    <div className={styles.selectedGenres}>
                        <span>Selecionados</span>

                        {movieData.genero.length > 0 ? (
                            <ul>
                                {movieData.genero.map((genre) => (
                                    <li key={genre}>{genre}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum gênero selecionado.</p>
                        )}
                    </div>
                    <div className={styles.poster}>

                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster}` || '/fundo-alto.jpg'}
                            alt={`Capa de ${movieData.title}`}
                        />
                    </div>
                </aside>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    type="submit"
                    disabled={
                        saving ||
                        !movieData.title.trim() ||
                        !movieData.src.trim()
                    }
                >
                    {saving
                        ? 'Salvando alterações...'
                        : 'Salvar alterações'}
                </button>
            </div>
        </form>
    )
}

export default Put
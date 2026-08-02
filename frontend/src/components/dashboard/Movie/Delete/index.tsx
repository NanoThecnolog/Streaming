import { useEffect, useState } from 'react'
import { MdDeleteOutline, MdWarningAmber } from 'react-icons/md'
import { toast } from 'react-toastify'

import { CardsProps } from '@/@types/Cards'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'

import styles from './styles.module.scss'
import { useTMDB } from '@/contexts/TMDBContext'

interface DeleteProps {
    tmdbid: number
}

const Delete = ({ tmdbid }: DeleteProps) => {
    const [movie, setMovie] = useState<CardsProps | null>(null)
    const [loadingMovie, setLoadingMovie] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const [poster, setPoster] = useState('')

    const { allData } = useTMDB()

    useEffect(() => {
        const find = allData.find(serie => serie.id === tmdbid)
        if (!find) return
        setPoster(find.poster_path)
    }, [tmdbid])

    useEffect(() => {
        let isCurrentRequest = true

        const getMovie = async () => {
            setLoadingMovie(true)
            setMovie(null)
            setDeleted(false)
            setConfirmed(false)

            try {
                const movieData = await mongoService.findOneMovieById(tmdbid)

                if (!isCurrentRequest) return

                if (!movieData) {
                    toast.warning(
                        'Filme não encontrado no catálogo.',
                    )
                    return
                }

                setMovie(movieData)
            } catch (error) {
                if (!isCurrentRequest) return

                debug.log('Erro ao carregar filme:', error)
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

    const handleDelete = async () => {
        if (!movie || !confirmed || deleting) return

        setDeleting(true)

        try {
            const response = await mongoService.deleteMovie(tmdbid)

            debug.log('Filme removido:', response)

            setMovie(null)
            setConfirmed(false)
            setDeleted(true)

            toast.success('Filme removido do catálogo!')
        } catch (error) {
            debug.log('Erro ao remover filme:', error)
            toast.error('Não foi possível remover o filme.')
        } finally {
            setDeleting(false)
        }
    }

    if (loadingMovie) {
        return (
            <div
                className={styles.loadingState}
                role="status"
            >
                <span className={styles.spinner} />

                <strong>Carregando filme</strong>

                <p>
                    Buscando o TMDB ID {tmdbid} no catálogo...
                </p>
            </div>
        )
    }

    if (deleted) {
        return (
            <div className={styles.successState}>
                <MdDeleteOutline aria-hidden="true" />

                <strong>Filme removido</strong>

                <p>
                    O filme com TMDB ID {tmdbid} foi removido do
                    catálogo.
                </p>

                <small>
                    Selecione outro ID para continuar gerenciando os
                    filmes.
                </small>
            </div>
        )
    }

    if (!movie) {
        return (
            <div className={styles.notFoundState}>
                <MdWarningAmber aria-hidden="true" />

                <strong>Filme não encontrado</strong>

                <p>
                    Não existe um filme com o TMDB ID {tmdbid} no
                    catálogo.
                </p>
            </div>
        )
    }

    return (
        <section className={styles.container}>
            <div className={styles.warningHeader}>
                <div className={styles.warningIcon}>
                    <MdWarningAmber aria-hidden="true" />
                </div>

                <div>
                    <span>Ação permanente</span>

                    <h2>Excluir filme do catálogo</h2>

                    <p>
                        Confira os dados abaixo antes de continuar.
                        Esta ação não poderá ser desfeita.
                    </p>
                </div>
            </div>

            <article className={styles.movieCard}>
                <div className={styles.poster}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster}` || '/fundo-alto.jpg'}
                        alt={`Capa de ${movie.title}`}
                    />
                </div>

                <div className={styles.movieDetails}>
                    <div className={styles.contentType}>
                        Filme selecionado
                    </div>

                    <h3>{movie.title}</h3>

                    {movie.subtitle && (
                        <p className={styles.subtitle}>
                            {movie.subtitle}
                        </p>
                    )}

                    <div className={styles.metadata}>
                        <span>TMDB ID: {tmdbid}</span>

                        {movie.duration && (
                            <span>{movie.duration}</span>
                        )}

                        {movie.faixa && (
                            <span>{movie.faixa}</span>
                        )}

                        {movie.lang && (
                            <span>{movie.lang}</span>
                        )}
                    </div>

                    {movie.description && (
                        <p className={styles.description}>
                            {movie.description}
                        </p>
                    )}

                    {movie.genero?.length > 0 && (
                        <ul className={styles.genres}>
                            {movie.genero.map((genre) => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </article>

            <label className={styles.confirmation}>
                <input
                    type="checkbox"
                    checked={confirmed}
                    disabled={deleting}
                    onChange={(event) => {
                        setConfirmed(event.target.checked)
                    }}
                />

                <span className={styles.checkbox} />

                <span>
                    Confirmo que desejo remover permanentemente{' '}
                    <strong>{movie.title}</strong> do catálogo.
                </span>
            </label>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.deleteButton}
                    disabled={!confirmed || deleting}
                    onClick={handleDelete}
                >
                    <MdDeleteOutline aria-hidden="true" />

                    {deleting
                        ? 'Excluindo filme...'
                        : 'Excluir permanentemente'}
                </button>
            </div>
        </section>
    )
}

export default Delete
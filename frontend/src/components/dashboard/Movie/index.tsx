import { FormEvent, useEffect, useState } from 'react'
import {
    MdAdd,
    MdDeleteOutline,
    MdEdit,
    MdLocalMovies,
    MdSearch,
} from 'react-icons/md'

import Create from './Create'
import Delete from './Delete'
import Put from './Put'

import styles from './styles.module.scss'

type MovieAction = 'create' | 'put' | 'delete'

interface MovieDashProps {
    id?: number
}

interface ActionItem {
    action: MovieAction
    label: string
    requiresId: boolean
    icon: typeof MdAdd
}


const ACTIONS: ActionItem[] = [
    {
        action: 'create',
        label: 'Adicionar',
        requiresId: true,
        icon: MdAdd,
    },
    {
        action: 'put',
        label: 'Editar',
        requiresId: true,
        icon: MdEdit,
    },
    {
        action: 'delete',
        label: 'Excluir',
        requiresId: true,
        icon: MdDeleteOutline,
    },
]

const isValidMovieId = (id?: number): id is number => {
    return Number.isInteger(id) && Number(id) > 0
}

const MovieDash = ({ id }: MovieDashProps) => {
    const initialId = isValidMovieId(id) ? id : undefined

    const [action, setAction] = useState<MovieAction>(
        initialId ? 'put' : 'create',
    )

    const [idInput, setIdInput] = useState(
        initialId ? String(initialId) : '',
    )

    const [selectedMovieId, setSelectedMovieId] = useState<
        number | undefined
    >(initialId)

    const [idError, setIdError] = useState('')

    const hasMovieId = isValidMovieId(selectedMovieId)

    useEffect(() => {
        if (!isValidMovieId(id)) return

        setIdInput(String(id))
        setSelectedMovieId(id)
        setAction('put')
    }, [id])

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const parsedId = Number(idInput)

        if (!isValidMovieId(parsedId)) {
            setSelectedMovieId(undefined)
            setIdError('Informe um ID válido maior que zero.')
            return
        }

        setIdError('')
        setSelectedMovieId(parsedId)
        setAction('put')
    }

    const handleIdChange = (value: string) => {
        setIdInput(value.replace(/\D/g, ''))
        setIdError('')
    }

    const renderForm = () => {
        switch (action) {
            case 'create':
                return <Create
                    key={selectedMovieId}
                    tmdbid={selectedMovieId || 0}
                />

            case 'put':
                return hasMovieId ? (
                    <Put
                        key={selectedMovieId}
                        tmdbid={selectedMovieId}
                    />
                ) : (
                    <EmptyIdState action="put" />
                )

            case 'delete':
                return hasMovieId ? (
                    <Delete
                        key={selectedMovieId}
                        tmdbid={selectedMovieId}
                    />
                ) : (
                    <EmptyIdState action="delete" />
                )
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.searchPanel}>
                <div className={styles.searchHeader}>
                    <span className={styles.searchIcon}>
                        <MdSearch aria-hidden="true" />
                    </span>

                    <div>
                        <strong>Localizar filme</strong>
                        <small>
                            Informe o ID do TMDB para editar ou excluir
                        </small>
                    </div>
                </div>

                <form
                    className={styles.searchForm}
                    onSubmit={handleSearch}
                >
                    <div className={styles.inputGroup}>
                        <label htmlFor="movie-id">
                            ID do filme
                        </label>

                        <input
                            id="movie-id"
                            type="text"
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="Ex.: 1083381"
                            value={idInput}
                            aria-invalid={Boolean(idError)}
                            aria-describedby={
                                idError ? 'movie-id-error' : undefined
                            }
                            onChange={(event) => {
                                handleIdChange(event.target.value)
                            }}
                        />

                        {idError && (
                            <span
                                id="movie-id-error"
                                className={styles.error}
                            >
                                {idError}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.searchButton}
                        disabled={!idInput}
                    >
                        <MdSearch aria-hidden="true" />
                        Buscar
                    </button>
                </form>
            </section>

            <nav
                className={styles.navContainer}
                aria-label="Ações de gerenciamento de filmes"
            >
                <div className={styles.navHeader}>
                    <span className={styles.navIcon}>
                        <MdLocalMovies aria-hidden="true" />
                    </span>

                    <div>
                        <strong>Gerenciar filmes</strong>
                        <small>Escolha uma operação</small>
                    </div>
                </div>

                <ul className={styles.actionList}>
                    {ACTIONS.map((item) => {
                        const Icon = item.icon
                        const isActive = action === item.action
                        const isDisabled =
                            item.requiresId && !hasMovieId

                        return (
                            <li key={item.action}>
                                <button
                                    type="button"
                                    className={`${styles.actionButton} ${isActive ? styles.active : ''
                                        } ${item.action === 'delete'
                                            ? styles.danger
                                            : ''
                                        }`}
                                    disabled={isDisabled}
                                    aria-pressed={isActive}
                                    onClick={() => {
                                        setAction(item.action)
                                    }}
                                >
                                    <Icon aria-hidden="true" />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <section className={styles.formContainer}>
                <div className={styles.formContent}>
                    {renderForm()}
                </div>
            </section>
        </div>
    )
}

interface EmptyIdStateProps {
    action: MovieAction
}

const ACTION_LABELS: Record<MovieAction, string> = {
    create: 'adicionar',
    put: 'editar',
    delete: 'excluir',
}

const EmptyIdState = ({ action }: EmptyIdStateProps) => {
    return (
        <div className={styles.emptyState}>
            <MdSearch aria-hidden="true" />

            <strong>Informe o ID do filme</strong>

            <p>
                Digite um ID acima e clique em Buscar para{' '}
                {ACTION_LABELS[action]} o conteúdo.
            </p>
        </div>
    )
}

export default MovieDash
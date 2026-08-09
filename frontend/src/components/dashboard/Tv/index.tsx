import { FormEvent, useEffect, useState } from 'react'
import { MdAdd, MdDeleteOutline, MdEdit, MdLiveTv, MdSearch } from 'react-icons/md'

import CreateTV from './Create'
import DeleteTV from './Delete'
import PutTV from './Put'

import styles from './styles.module.scss'

type TVAction = 'create' | 'put' | 'delete'

interface TVDashProps {
  id?: number
}

interface ActionOption {
  action: TVAction
  label: string
  requiresId: boolean
  icon: typeof MdAdd
}

const ACTIONS: ActionOption[] = [
  {
    action: 'create',
    label: 'Adicionar',
    requiresId: false,
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

const isValidTVId = (id?: number): id is number => {
  return Number.isInteger(id) && Number(id) > 0
}

const TVDash = ({ id }: TVDashProps) => {
  const initialId = isValidTVId(id) ? id : undefined

  const [action, setAction] = useState<TVAction>(initialId ? 'put' : 'create')

  const [idInput, setIdInput] = useState(initialId ? String(initialId) : '')

  const [selectedTVId, setSelectedTVId] = useState<number | undefined>(initialId)

  const [idError, setIdError] = useState('')

  const hasTVId = isValidTVId(selectedTVId)

  useEffect(() => {
    if (!isValidTVId(id)) return

    setIdInput(String(id))
    setSelectedTVId(id)
    setIdError('')
    setAction('put')
  }, [id])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedId = Number(idInput)

    if (!isValidTVId(parsedId)) {
      setSelectedTVId(undefined)
      setIdError('Informe um ID válido maior que zero.')

      return
    }

    setIdError('')
    setSelectedTVId(parsedId)
    setAction('put')
  }

  const handleIdChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, '')

    setIdInput(sanitizedValue)
    setIdError('')
  }

  const renderContent = () => {
    switch (action) {
      case 'create':
        return <CreateTV key={`create-${selectedTVId ?? 'new'}`} />

      case 'put':
        return hasTVId ? (
          <PutTV key={`put-${selectedTVId}`} tmdbid={selectedTVId} />
        ) : (
          <EmptyIdState action="put" />
        )

      case 'delete':
        return hasTVId ? (
          <DeleteTV key={`delete-${selectedTVId}`} tmdbid={selectedTVId} />
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
            <strong>Localizar série</strong>

            <small>Informe o ID do TMDB para editar ou excluir</small>
          </div>
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputGroup}>
            <label htmlFor="tv-id">ID da série</label>

            <input
              id="tv-id"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Ex.: 1399"
              value={idInput}
              aria-invalid={Boolean(idError)}
              aria-describedby={idError ? 'tv-id-error' : undefined}
              onChange={(event) => {
                handleIdChange(event.target.value)
              }}
            />

            {idError && (
              <span id="tv-id-error" className={styles.error}>
                {idError}
              </span>
            )}
          </div>

          <button type="submit" className={styles.searchButton} disabled={!idInput}>
            <MdSearch aria-hidden="true" />
            Buscar
          </button>
        </form>
      </section>

      <nav className={styles.navContainer} aria-label="Ações de gerenciamento de séries">
        <div className={styles.navHeader}>
          <span className={styles.navIcon}>
            <MdLiveTv aria-hidden="true" />
          </span>

          <div>
            <strong>Gerenciar séries</strong>
            <small>Escolha uma operação</small>
          </div>
        </div>

        <ul className={styles.actionList}>
          {ACTIONS.map((item) => {
            const Icon = item.icon
            const isActive = action === item.action

            const isDisabled = item.requiresId && !hasTVId

            return (
              <li key={item.action}>
                <button
                  type="button"
                  className={`${styles.actionButton} ${isActive ? styles.active : ''} ${
                    item.action === 'delete' ? styles.danger : ''
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
        <div className={styles.formContent}>{renderContent()}</div>
      </section>
    </div>
  )
}

interface EmptyIdStateProps {
  action: Extract<TVAction, 'put' | 'delete'>
}

const ACTION_LABELS: Record<EmptyIdStateProps['action'], string> = {
  put: 'editar',
  delete: 'excluir',
}

const EmptyIdState = ({ action }: EmptyIdStateProps) => {
  return (
    <div className={styles.emptyState}>
      <MdSearch aria-hidden="true" />

      <strong>Informe o ID da série</strong>

      <p>Digite um ID acima e clique em Buscar para {ACTION_LABELS[action]} o conteúdo.</p>
    </div>
  )
}

export default TVDash

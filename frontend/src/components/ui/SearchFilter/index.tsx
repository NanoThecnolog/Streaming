import { FormEvent } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

import { gen, stm } from '@/utils/Genres'
import { capitalize } from '@/utils/UtilitiesFunctions'
import { classification } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface FilterProps {
  title: string
  genre: string
  streaming: string
  faixa: string

  setTitle: (value: string) => void
  setGenre: (value: string) => void
  setStreaming: (value: string) => void
  setFaixa: (value: string) => void

  handleFilter: () => void
}

export default function Filter({
  title,
  genre,
  streaming,
  faixa,
  setTitle,
  setGenre,
  setStreaming,
  setFaixa,
  handleFilter,
}: FilterProps) {
  const generos = Object.values(gen)
  const streamings = Object.values(stm)
  const faixas = classification.map((classificationItem) => classificationItem.etaria)

  const hasFilters = Boolean(title || genre || streaming || faixa)

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    handleFilter()
  }

  const clearFilters = (): void => {
    setTitle('')
    setGenre('')
    setStreaming('')
    setFaixa('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <SlidersHorizontal size={19} aria-hidden="true" />
        </span>

        <div>
          <h2>Filtrar catálogo</h2>

          <p>Combine os campos para encontrar um conteúdo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className={styles.searchField}>
          <span>Nome do conteúdo</span>

          <div className={styles.inputContainer}>
            <Search size={18} aria-hidden="true" />

            <input
              type="search"
              value={title}
              placeholder="Ex.: Batman"
              autoComplete="off"
              onChange={(event) => setTitle(event.target.value)}
            />

            {title && (
              <button
                type="button"
                className={styles.clearInput}
                aria-label="Limpar nome"
                onClick={() => setTitle('')}
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </label>

        <label className={styles.filter}>
          <span>Gênero</span>

          <select
            value={genre}
            aria-label="Selecionar gênero"
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="">Todos os gêneros</option>

            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {capitalize(genero)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span>Streaming</span>

          <select
            value={streaming}
            aria-label="Selecionar streaming"
            onChange={(event) => setStreaming(event.target.value)}
          >
            <option value="">Todos</option>

            {streamings.map((streamingItem) => (
              <option key={streamingItem} value={streamingItem}>
                {capitalize(streamingItem)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span>Classificação</span>

          <select
            value={faixa}
            aria-label="Selecionar classificação"
            onChange={(event) => setFaixa(event.target.value)}
          >
            <option value="">Todas as faixas</option>

            {faixas.map((classificacao) => (
              <option key={classificacao} value={classificacao}>
                {classificacao}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.actions}>
          {hasFilters && (
            <button type="button" className={styles.clearButton} onClick={clearFilters}>
              Limpar
            </button>
          )}

          <button type="submit" className={styles.searchButton} disabled={!hasFilters}>
            <Search size={17} aria-hidden="true" />
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}

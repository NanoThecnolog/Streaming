import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { AlertCircle, SearchX } from 'lucide-react'

import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import { mongoService } from '@/classes/MongoContent'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Spinner from '@/components/ui/Loading/spinner'
import Filter from '@/components/ui/SearchFilter'
import { useFlix } from '@/contexts/FlixContext'
import { matches } from '@/utils/FilterFunctions'
import { normalizing } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

type SearchResult = (CardsProps & { type: 'movie' }) | (SeriesProps & { type: 'series' })

interface SearchFilters {
  input: string
  genre: string
  streaming: string
  faixa: string
}

const initialFilters: SearchFilters = {
  input: '',
  genre: '',
  streaming: '',
  faixa: '',
}

const normalizeSearch = (value: string): string => {
  return normalizing(value.trim()).toLocaleLowerCase('pt-BR')
}

export default function Search() {
  const router = useRouter()

  const { movies, series, setMovies, setSeries } = useFlix()

  const [input, setInput] = useState('')
  const [genre, setGenre] = useState('')
  const [streaming, setStreaming] = useState('')
  const [faixa, setFaixa] = useState('')

  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>(initialFilters)

  const [isLoadingCatalog, setIsLoadingCatalog] = useState(
    movies.length === 0 || series.length === 0,
  )

  const [hasError, setHasError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchCatalog = useCallback(async (): Promise<void> => {
    if (movies.length > 0 && series.length > 0) {
      setIsLoadingCatalog(false)
      return
    }

    try {
      setIsLoadingCatalog(true)
      setHasError(false)

      const [mongoMovies, mongoSeries] = await Promise.all([
        movies.length === 0 ? mongoService.fetchMovieData() : Promise.resolve(movies),

        series.length === 0 ? mongoService.fetchSerieData() : Promise.resolve(series),
      ])

      if (movies.length === 0) {
        setMovies(mongoMovies)
      }

      if (series.length === 0) {
        setSeries(mongoSeries)
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdos:', error)
      setHasError(true)
    } finally {
      setIsLoadingCatalog(false)
    }
  }, [movies, series, setMovies, setSeries])

  useEffect(() => {
    fetchCatalog()
  }, [fetchCatalog])

  useEffect(() => {
    if (!router.isReady) return

    const queryInput = Array.isArray(router.query.input)
      ? router.query.input[0]
      : router.query.input

    if (!queryInput?.trim()) return

    setInput(queryInput)

    setAppliedFilters({
      ...initialFilters,
      input: queryInput,
    })

    setHasSearched(true)
  }, [router.isReady, router.query.input])

  const filteredResults = useMemo<SearchResult[]>(() => {
    if (!hasSearched) return []

    const normalizedInput = normalizeSearch(appliedFilters.input)

    const movieResults = movies
      .filter((movie) => {
        return matches(
          normalizedInput,
          appliedFilters.genre,
          appliedFilters.streaming,
          appliedFilters.faixa,
          movie,
        )
      })
      .map((movie) => ({
        ...movie,
        type: 'movie' as const,
      }))

    const seriesResults = series
      .filter((serie) => {
        return matches(
          normalizedInput,
          appliedFilters.genre,
          appliedFilters.streaming,
          appliedFilters.faixa,
          serie,
        )
      })
      .map((serie) => ({
        ...serie,
        type: 'series' as const,
      }))

    return [...movieResults, ...seriesResults].sort((a, b) => {
      return a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
    })
  }, [appliedFilters, hasSearched, movies, series])

  const handleFilter = (event?: FormEvent<HTMLFormElement>): void => {
    event?.preventDefault()

    const nextFilters: SearchFilters = {
      input: input.trim(),
      genre,
      streaming,
      faixa,
    }

    const hasActiveFilter = Object.values(nextFilters).some((value) => value !== '')

    if (!hasActiveFilter) {
      setAppliedFilters(initialFilters)
      setHasSearched(false)

      router.replace(
        {
          pathname: router.pathname,
          query: {},
        },
        undefined,
        { shallow: true },
      )

      return
    }

    setAppliedFilters(nextFilters)
    setHasSearched(true)

    const query = nextFilters.input ? { input: nextFilters.input } : {}

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true },
    )
  }

  const clearFilters = (): void => {
    setInput('')
    setGenre('')
    setStreaming('')
    setFaixa('')
    setAppliedFilters(initialFilters)
    setHasSearched(false)

    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    )
  }

  const getResultKey = (result: SearchResult): string => {
    if (result.type === 'movie') {
      return `movie-${result.tmdbId}`
    }

    return `series-${result.tmdbID}`
  }

  const resultLabel =
    filteredResults.length === 1
      ? '1 título encontrado'
      : `${filteredResults.length} títulos encontrados`

  return (
    <>
      <SEO
        title="Busca | FlixNext"
        description="Busque entre os filmes e séries disponíveis na FlixNext."
      />

      <Header />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="search-title">
          <span className={styles.eyebrow}>Filmes e séries</span>

          <h1 id="search-title">Encontre o que assistir</h1>

          <p>Pesquise pelo título ou use os filtros para explorar o catálogo da FlixNext.</p>
        </section>

        <section className={styles.searchSection} aria-label="Pesquisa de conteúdos">
          <Filter
            title={input}
            genre={genre}
            streaming={streaming}
            faixa={faixa}
            setTitle={setInput}
            setGenre={setGenre}
            setStreaming={setStreaming}
            setFaixa={setFaixa}
            handleFilter={handleFilter}
          />
        </section>

        <section className={styles.results} aria-labelledby="results-title">
          {isLoadingCatalog && (
            <div className={styles.loadingState} aria-live="polite">
              <Spinner />

              <p>Carregando o catálogo...</p>
            </div>
          )}

          {!isLoadingCatalog && hasError && (
            <div className={styles.emptyState}>
              <span className={styles.stateIcon}>
                <AlertCircle size={30} aria-hidden="true" />
              </span>

              <h2>Não foi possível carregar o catálogo</h2>

              <p>Verifique sua conexão e tente novamente.</p>

              <button type="button" onClick={fetchCatalog}>
                Tentar novamente
              </button>
            </div>
          )}

          {!isLoadingCatalog && !hasError && !hasSearched && (
            <div className={styles.initialState}>
              <span className={styles.stateIcon}>
                <SearchX size={30} aria-hidden="true" />
              </span>

              <h2>Comece sua pesquisa</h2>

              <p>Informe um título ou selecione um dos filtros disponíveis.</p>
            </div>
          )}

          {!isLoadingCatalog && !hasError && hasSearched && (
            <>
              <header className={styles.resultsHeader}>
                <div>
                  <span>Resultado da busca</span>

                  <h2 id="results-title">{resultLabel}</h2>
                </div>

                <button type="button" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </header>

              {filteredResults.length > 0 ? (
                <div className={styles.cardsContainer}>
                  {filteredResults.map((result) => (
                    <Card key={getResultKey(result)} card={result} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <span className={styles.stateIcon}>
                    <SearchX size={30} aria-hidden="true" />
                  </span>

                  <h2>Nenhum título encontrado</h2>

                  <p>Tente pesquisar outro nome ou remover alguns filtros.</p>

                  <button type="button" onClick={clearFilters}>
                    Limpar pesquisa
                  </button>

                  <small>
                    Não encontrou o que procura? Solicite pelo e-mail{' '}
                    <a href="mailto:contato@flixnext.com.br?subject=Solicitação de conteúdo">
                      contato@flixnext.com.br
                    </a>
                  </small>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

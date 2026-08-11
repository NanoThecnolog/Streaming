import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Clapperboard, Film, Search, Tv, X } from 'lucide-react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import { mongoService } from '@/classes/MongoContent'
import { useFlix } from '@/contexts/FlixContext'

import styles from './styles.module.scss'

type CatalogFilter = 'all' | 'movies' | 'series'

export default function Catalogo() {
  const { movies, series, setMovies, setSeries } = useFlix()

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>('all')

  const [isLoading, setIsLoading] = useState(movies.length === 0 || series.length === 0)

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchCatalog = async (): Promise<void> => {
      if (movies.length > 0 && series.length > 0) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
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
        console.error('Erro ao carregar o catálogo:', error)

        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCatalog()
  }, [movies, series, setMovies, setSeries])

  const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        const title = `${movie.title} ${movie.subtitle ?? ''}`.toLocaleLowerCase('pt-BR')

        return title.includes(normalizedSearch)
      })
      .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
  }, [movies, normalizedSearch])

  const filteredSeries = useMemo(() => {
    return series
      .filter((serie) => {
        const title = `${serie.title} ${serie.subtitle ?? ''}`.toLocaleLowerCase('pt-BR')

        return title.includes(normalizedSearch)
      })
      .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
  }, [series, normalizedSearch])

  const totalTitles = movies.length + series.length
  const totalResults = filteredMovies.length + filteredSeries.length

  const showMovies = activeFilter === 'all' || activeFilter === 'movies'

  const showSeries = activeFilter === 'all' || activeFilter === 'series'

  const hasResults =
    (showMovies && filteredMovies.length > 0) || (showSeries && filteredSeries.length > 0)

  return (
    <>
      <SEO
        title="Catálogo | FlixNext"
        description={`Explore o catálogo da FlixNext com ${totalTitles} filmes e séries disponíveis.`}
      />

      <Header />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="catalog-title">
          <div className={styles.heroIcon}>
            <Clapperboard size={31} aria-hidden="true" />
          </div>

          <span className={styles.eyebrow}>Explore a FlixNext</span>

          <h1 id="catalog-title">Catálogo Completo</h1>

          <p>Encontre filmes e séries disponíveis para assistir na plataforma.</p>

          {!isLoading && !hasError && (
            <div className={styles.catalogSummary}>
              <span>
                <strong>{movies.length}</strong>
                filmes
              </span>

              <span aria-hidden="true" />

              <span>
                <strong>{series.length}</strong>
                séries
              </span>

              <span aria-hidden="true" />

              <span>
                <strong>{totalTitles}</strong>
                títulos
              </span>
            </div>
          )}
        </section>

        <section className={styles.catalog} aria-label="Conteúdos do catálogo">
          <div className={styles.toolbar}>
            <label className={styles.search}>
              <Search size={19} aria-hidden="true" />

              <input
                type="search"
                value={search}
                placeholder="Buscar no catálogo..."
                aria-label="Buscar no catálogo"
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button type="button" aria-label="Limpar busca" onClick={() => setSearch('')}>
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </label>

            <div className={styles.filters} role="group" aria-label="Filtrar catálogo">
              <button
                type="button"
                className={activeFilter === 'all' ? styles.active : ''}
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                Todos
                <span>{totalTitles}</span>
              </button>

              <button
                type="button"
                className={activeFilter === 'movies' ? styles.active : ''}
                aria-pressed={activeFilter === 'movies'}
                onClick={() => setActiveFilter('movies')}
              >
                <Film size={16} aria-hidden="true" />
                Filmes
                <span>{movies.length}</span>
              </button>

              <button
                type="button"
                className={activeFilter === 'series' ? styles.active : ''}
                aria-pressed={activeFilter === 'series'}
                onClick={() => setActiveFilter('series')}
              >
                <Tv size={16} aria-hidden="true" />
                Séries
                <span>{series.length}</span>
              </button>
            </div>
          </div>

          {normalizedSearch && !isLoading && (
            <p className={styles.resultCount} aria-live="polite">
              {totalResults === 1 ? '1 título encontrado' : `${totalResults} títulos encontrados`}
              {' para '}
              <strong>“{search.trim()}”</strong>
            </p>
          )}

          {isLoading && (
            <div className={styles.state} aria-live="polite">
              <div className={styles.spinner} />

              <h2>Carregando catálogo</h2>

              <p>Buscando os títulos disponíveis...</p>
            </div>
          )}

          {hasError && !isLoading && (
            <div className={styles.state}>
              <Clapperboard size={34} aria-hidden="true" />

              <h2>Não foi possível carregar</h2>

              <p>Atualize a página para tentar novamente.</p>
            </div>
          )}

          {!isLoading && !hasError && !hasResults && (
            <div className={styles.state}>
              <Search size={34} aria-hidden="true" />

              <h2>Nenhum título encontrado</h2>

              <p>Tente pesquisar usando outro nome.</p>

              <button type="button" onClick={() => setSearch('')}>
                Limpar busca
              </button>
            </div>
          )}

          {!isLoading && !hasError && showMovies && filteredMovies.length > 0 && (
            <section className={styles.contentSection} aria-labelledby="movies-title">
              <header className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <Film size={22} aria-hidden="true" />

                  <div>
                    <span>Disponíveis</span>

                    <h2 id="movies-title">Filmes</h2>
                  </div>
                </div>

                <span className={styles.sectionCount}>{filteredMovies.length}</span>
              </header>

              <div className={styles.contentGrid}>
                {filteredMovies.map((movie, index) => (
                  <Link
                    key={movie.tmdbId}
                    href={`/movies/movie/${movie.tmdbId}`}
                    className={styles.catalogItem}
                  >
                    <span className={styles.itemIndex}>{String(index + 1).padStart(2, '0')}</span>

                    <span className={styles.itemContent}>
                      <strong>{movie.title}</strong>

                      {movie.subtitle && <small>{movie.subtitle}</small>}
                    </span>

                    <Film size={17} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {!isLoading && !hasError && showSeries && filteredSeries.length > 0 && (
            <section className={styles.contentSection} aria-labelledby="series-title">
              <header className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <Tv size={22} aria-hidden="true" />

                  <div>
                    <span>Disponíveis</span>

                    <h2 id="series-title">Séries</h2>
                  </div>
                </div>

                <span className={styles.sectionCount}>{filteredSeries.length}</span>
              </header>

              <div className={styles.contentGrid}>
                {filteredSeries.map((serie, index) => (
                  <Link
                    key={serie.tmdbID}
                    href={`/series/serie/${serie.tmdbID}`}
                    className={styles.catalogItem}
                  >
                    <span className={styles.itemIndex}>{String(index + 1).padStart(2, '0')}</span>

                    <span className={styles.itemContent}>
                      <strong>{serie.title}</strong>

                      {serie.subtitle && <small>{serie.subtitle}</small>}
                    </span>

                    <Tv size={17} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

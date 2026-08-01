import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { FiFilm, FiSearch, FiTv } from 'react-icons/fi'
import { useRouter } from 'next/router'

import { mongoService } from '@/classes/MongoContent'
import { useFlix } from '@/contexts/FlixContext'

import styles from './styles.module.scss'

const Search = () => {
    const [inputSearch, setInputSearch] = useState('')
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(false)

    const router = useRouter()

    const {
        movies,
        series,
        setMovies,
        setSeries,
    } = useFlix()

    const normalizedSearch = inputSearch.trim()
    const canSearch = normalizedSearch.length >= 2

    const catalogTotal = useMemo(() => {
        return movies.length + series.length
    }, [movies.length, series.length])

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!canSearch) return

        const query = new URLSearchParams({
            input: normalizedSearch,
        })

        router.push(`/search?${query.toString()}`)
    }

    useEffect(() => {
        if (movies.length > 0 && series.length > 0) return

        let isMounted = true

        const loadCatalogData = async () => {
            setIsLoadingCatalog(true)

            try {
                const [movieData, serieData] = await Promise.all([
                    movies.length === 0
                        ? mongoService.fetchMovieData()
                        : Promise.resolve(null),

                    series.length === 0
                        ? mongoService.fetchSerieData()
                        : Promise.resolve(null),
                ])

                if (!isMounted) return

                if (movieData) {
                    setMovies(movieData)
                }

                if (serieData) {
                    setSeries(serieData)
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar informações do catálogo:',
                    error,
                )
            } finally {
                if (isMounted) {
                    setIsLoadingCatalog(false)
                }
            }
        }

        loadCatalogData()

        return () => {
            isMounted = false
        }
    }, [
        movies.length,
        series.length,
        setMovies,
        setSeries,
    ])

    return (
        <section
            className={styles.searchSection}
            aria-labelledby="catalog-search-title"
        >
            <Image
                fill
                className={styles.backgroundImage}
                src="/fundo-filmes.jpg"
                alt=""
                quality={55}
                sizes="100vw"
                loading="lazy"
                aria-hidden="true"
            />

            <div
                className={styles.backgroundOverlay}
                aria-hidden="true"
            />

            <div
                className={styles.backgroundGlow}
                aria-hidden="true"
            />

            <div className={styles.content}>
                <span className={styles.eyebrow}>
                    Explore a FlixNext
                </span>

                <h2 id="catalog-search-title">
                    Não encontrou o que queria?
                    <span> Pesquise em todo o catálogo.</span>
                </h2>

                <p className={styles.description}>
                    Encontre rapidamente filmes e séries disponíveis para
                    assistir.
                </p>

                <form
                    className={styles.searchForm}
                    role="search"
                    onSubmit={handleSearch}
                >
                    <FiSearch
                        className={styles.inputIcon}
                        aria-hidden="true"
                    />

                    <label
                        className={styles.visuallyHidden}
                        htmlFor="catalog-search"
                    >
                        Buscar filme ou série
                    </label>

                    <input
                        id="catalog-search"
                        type="search"
                        value={inputSearch}
                        placeholder="Busque por um filme ou série..."
                        autoComplete="off"
                        enterKeyHint="search"
                        maxLength={100}
                        onChange={(event) => {
                            setInputSearch(event.target.value)
                        }}
                    />

                    <button
                        type="submit"
                        disabled={!canSearch}
                        aria-label="Realizar busca"
                    >
                        <span>Buscar</span>
                        <FiSearch aria-hidden="true" />
                    </button>
                </form>

                <div
                    className={styles.catalogStats}
                    aria-live="polite"
                >
                    {isLoadingCatalog && catalogTotal === 0 ? (
                        <span className={styles.loading}>
                            <i aria-hidden="true" />
                            Consultando o catálogo...
                        </span>
                    ) : (
                        <>
                            <span>
                                <FiFilm aria-hidden="true" />

                                <strong>
                                    {movies.length.toLocaleString('pt-BR')}
                                </strong>

                                filmes
                            </span>

                            <i aria-hidden="true" />

                            <span>
                                <FiTv aria-hidden="true" />

                                <strong>
                                    {series.length.toLocaleString('pt-BR')}
                                </strong>

                                séries
                            </span>
                        </>
                    )}
                </div>

                {inputSearch.length > 0 && !canSearch && (
                    <span className={styles.searchHint}>
                        Digite pelo menos 2 caracteres.
                    </span>
                )}
            </div>
        </section>
    )
}

export default Search
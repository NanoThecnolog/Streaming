import { useEffect, useMemo, useState } from 'react'
import { Bookmark, Film, LoaderCircle, Tv } from 'lucide-react'
import { GetServerSideProps } from 'next'

import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'

import { useFlix } from '@/contexts/FlixContext'

import { mongoService } from '@/classes/MongoContent'
import { SetupAPIClient } from '@/services/api'

import { WatchLaterProps } from '@/@types/watchLater'

import styles from './styles.module.scss'
import Link from 'next/link'

interface PageProps {
  list: WatchLaterProps[]
}

export default function WatchLater({ list }: PageProps) {
  const { movies, series, setMovies, setSeries } = useFlix()

  const [isLoading, setIsLoading] = useState(movies.length === 0 || series.length === 0)

  useEffect(() => {
    const getContentData = async (): Promise<void> => {
      try {
        const requests: Promise<void>[] = []

        if (movies.length === 0) {
          requests.push(mongoService.fetchMovieData().then((movieData) => setMovies(movieData)))
        }

        if (series.length === 0) {
          requests.push(mongoService.fetchSerieData().then((serieData) => setSeries(serieData)))
        }

        await Promise.all(requests)
      } catch (error) {
        console.error('Erro ao carregar os conteúdos da Minha Lista:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (movies.length === 0 || series.length === 0) {
      getContentData()
      return
    }

    setIsLoading(false)
  }, [movies.length, series.length, setMovies, setSeries])

  const watchLaterList = useMemo(() => {
    const savedIds = new Set(list.map((item) => Number(item.tmdbid)))

    return {
      movies: movies.filter((movie) => savedIds.has(Number(movie.tmdbId))),
      series: series.filter((serie) => savedIds.has(Number(serie.tmdbID))),
    }
  }, [list, movies, series])

  const totalItems = watchLaterList.movies.length + watchLaterList.series.length

  const hasMovies = watchLaterList.movies.length > 0
  const hasSeries = watchLaterList.series.length > 0
  const isEmpty = !isLoading && totalItems === 0

  return (
    <>
      <SEO
        title="Minha Lista | FlixNext"
        description="Filmes e séries salvos para assistir mais tarde."
      />

      <Header />

      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Sua seleção</span>

            <h1>Minha Lista</h1>

            <p>Todos os filmes e séries que você separou para assistir depois.</p>
          </div>

          {!isLoading && totalItems > 0 && (
            <div className={styles.summary}>
              <Bookmark size={18} aria-hidden="true" />

              <span>
                {totalItems} {totalItems === 1 ? 'título salvo' : 'títulos salvos'}
              </span>
            </div>
          )}
        </header>

        {isLoading && (
          <section className={styles.feedback} aria-live="polite">
            <LoaderCircle className={styles.spinner} size={34} aria-hidden="true" />

            <strong>Carregando sua lista</strong>

            <p>Estamos buscando os títulos que você salvou.</p>
          </section>
        )}

        {isEmpty && (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bookmark size={34} aria-hidden="true" />
            </div>

            <h2>Sua lista ainda está vazia</h2>

            <p>
              Ao encontrar um filme ou série interessante, adicione-o à sua lista para acessar mais
              tarde.
            </p>

            <Link href="/catalogo">Explorar catálogo</Link>
          </section>
        )}

        {!isLoading && totalItems > 0 && (
          <div className={styles.content}>
            {hasMovies && (
              <section className={styles.category} aria-labelledby="movies-title">
                <header className={styles.categoryHeader}>
                  <div>
                    <span className={styles.categoryIcon}>
                      <Film size={20} aria-hidden="true" />
                    </span>

                    <div>
                      <h2 id="movies-title">Filmes</h2>

                      <p>
                        {watchLaterList.movies.length}{' '}
                        {watchLaterList.movies.length === 1 ? 'filme salvo' : 'filmes salvos'}
                      </p>
                    </div>
                  </div>
                </header>

                <div className={styles.cardsGrid}>
                  {watchLaterList.movies.map((movie) => (
                    <div key={movie.tmdbId} className={styles.cardItem}>
                      <Card card={movie} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasSeries && (
              <section className={styles.category} aria-labelledby="series-title">
                <header className={styles.categoryHeader}>
                  <div>
                    <span className={styles.categoryIcon}>
                      <Tv size={20} aria-hidden="true" />
                    </span>

                    <div>
                      <h2 id="series-title">Séries</h2>

                      <p>
                        {watchLaterList.series.length}{' '}
                        {watchLaterList.series.length === 1 ? 'série salva' : 'séries salvas'}
                      </p>
                    </div>
                  </div>
                </header>

                <div className={styles.cardsGrid}>
                  {watchLaterList.series.map((serie) => (
                    <div key={serie.tmdbID} className={styles.cardItem}>
                      <Card card={serie} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const token = ctx.req.cookies['flix-token']

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    const client = new SetupAPIClient(ctx)

    const { data } = await client.api.get<WatchLaterProps[]>('/watchLater')

    return {
      props: {
        list: Array.isArray(data) ? data : [],
      },
    }
  } catch (error) {
    console.error('Erro ao buscar a lista de assistir mais tarde:', error)

    return {
      props: {
        list: [],
      },
    }
  }
}

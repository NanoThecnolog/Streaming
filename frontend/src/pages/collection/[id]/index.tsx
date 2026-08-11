import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { debug } from '@/classes/DebugLogger'
import { Collection, Part } from '@/@types/collection'
import { useTMDB } from '@/contexts/TMDBContext'
import { useEffect, useMemo, useState } from 'react'
import { MovieTMDB } from '@/@types/Cards'
import Link from 'next/link'
import Image from 'next/image'
import { FiClock, FiFilm, FiStar } from 'react-icons/fi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useFlix } from '@/contexts/FlixContext'

interface PageProps {
  collection: Collection | null
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const getImageUrl = (path: string | null | undefined, size: 'w500' | 'original' = 'w500') => {
  if (!path) return '/blurImage.png'

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (!hours) return `${minutes}min`
  if (!minutes) return `${hours}h`

  return `${hours}h ${minutes}min`
}

const getReleaseYear = (date: string | Date) => {
  if (!date) return null

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate.getFullYear()
}

export default function CollectionPage({ collection }: PageProps) {
  //const { allData, isLoadingMovies } = useTMDB()
  const { movies } = useFlix()
  //const [isLoadingMovies, setIsLoadingMovies] = useState(true)

  debug.log('dados da coleção', collection)

  /*useEffect(() => {
        if (allData.length > 0) debug.log(allData)
        else debug.log("alldata vazio")
    }, [allData])*/
  /*
    const collectionMovieIDs = new Set(
            collection?.parts.map(movie => movie.id)
    )
    */
  const moviesIDs = new Set(movies.map((m) => m.tmdbId))

  /*if (collection && collection.parts.length) {
        const collectionMovies = await Promise.all(
            collection.parts.map(async part => {
                const response = await axios.get(`/api/tmdb/movie/${part.}`)
            }
            
        )
    )
    }*/

  const cards = useMemo<Part[]>(() => {
    if (!collection?.parts?.length || !movies.length) {
      return []
    }

    const hasMovies = collection.parts.filter((movie) => moviesIDs.has(movie.id))
    return hasMovies.sort((movieA, movieB) => {
      const dateA = new Date(movieA.release_date).getTime()
      const dateB = new Date(movieB.release_date).getTime()

      return dateA - dateB
    })
  }, [collection])

  debug.log('Cards', cards)

  const collectionInfo = useMemo(() => {
    if (!collection) return null

    const releaseYears = collection.parts
      .map((movie) => getReleaseYear(movie.release_date))
      .filter((year): year is number => year !== null)
      .sort((yearA, yearB) => yearA - yearB)

    /*const totalRuntime = cards.reduce(
            (total, movie) => total + (movie. ?? 0),
            0
        )*/

    const averageRating = collection.parts.length
      ? collection.parts.reduce((total, movie) => total + movie.vote_average, 0) /
        collection.parts.length
      : 0

    return {
      firstYear: releaseYears.at(0),
      lastYear: releaseYears.at(-1),
      //totalRuntime,
      averageRating,
    }
  }, [cards, collection])

  if (!collection) {
    return (
      <>
        <Head>
          <title>Coleção não encontrada</title>
          <meta name="description" content="A coleção solicitada não foi encontrada." />
        </Head>

        <main className={styles.notFound}>
          <h1>Coleção não encontrada</h1>
          <p>Não foi possível localizar os dados desta coleção.</p>

          <Link href="/">Voltar para o início</Link>
        </main>
      </>
    )
  }

  const backdropImage = getImageUrl(collection.backdrop_path, 'original')

  const posterImage = getImageUrl(collection.poster_path)

  const pageDescription =
    collection.overview || `Confira todos os filmes da coleção ${collection.name}.`

  return (
    <>
      <Head>
        <title>{collection.name}</title>

        <meta name="description" content={pageDescription} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className={styles.container}>
        <section
          className={styles.hero}
          style={{
            backgroundImage: `url(${backdropImage})`,
          }}
        >
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <div className={styles.collectionPoster}>
              <Image
                src={posterImage}
                alt={`Pôster da coleção ${collection.name}`}
                fill
                priority
                sizes="(max-width: 768px) 180px, 260px"
              />
            </div>

            <div className={styles.collectionInfo}>
              <span className={styles.collectionLabel}>Coleção</span>

              <h1>{collection.name}</h1>

              <div className={styles.metadata}>
                <span>
                  <FiFilm />
                  {collection.parts.length} {collection.parts.length === 1 ? 'filme' : 'filmes'}
                </span>

                {collectionInfo?.firstYear && (
                  <span>
                    {collectionInfo.firstYear}

                    {collectionInfo.lastYear &&
                      collectionInfo.lastYear !== collectionInfo.firstYear &&
                      ` – ${collectionInfo.lastYear}`}
                  </span>
                )}

                {collectionInfo && collectionInfo.averageRating > 0 && (
                  <span>
                    <FiStar />
                    {collectionInfo.averageRating.toFixed(1)}
                  </span>
                )}

                {/*collectionInfo &&
                                    collectionInfo.totalRuntime > 0 && (
                                        <span>
                                            <FiClock />
                                            {formatRuntime(
                                                collectionInfo.totalRuntime
                                            )}
                                        </span>
                                    )*/}
              </div>

              {collection.overview ? (
                <p>{collection.overview}</p>
              ) : (
                <p>Explore os filmes que fazem parte da coleção {collection.name}.</p>
              )}
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.sectionHeader}>
            <div>
              <span>Todos os títulos</span>
              <h2>Filmes da coleção</h2>
            </div>

            <p>
              {cards.length} de {collection.parts.length} disponíveis
            </p>
          </div>

          {/*isLoadingMovies && cards.length === 0 && (
                        <div className={styles.loading}>
                            Carregando filmes da coleção...
                        </div>
                    )*/}

          {cards.length > 0 && (
            <div className={styles.moviesGrid}>
              {cards.map((movie, index) => {
                const year = getReleaseYear(movie.release_date)

                return (
                  <article key={movie.id} className={styles.movieCard}>
                    <Link
                      href={`/movies/movie/${movie.id}`}
                      className={styles.moviePoster}
                      aria-label={`Abrir ${movie.title}`}
                    >
                      <Image
                        src={getImageUrl(movie.poster_path)}
                        alt={`Pôster de ${movie.title}`}
                        fill
                        sizes="(max-width: 600px) 45vw, (max-width: 1200px) 25vw, 220px"
                      />

                      <div className={styles.posterGradient} />

                      <span className={styles.moviePosition}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {movie.vote_average > 0 && (
                        <span className={styles.movieRating}>
                          <FiStar />
                          {movie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </Link>

                    <div className={styles.movieContent}>
                      <div className={styles.movieTitleRow}>
                        <h3>
                          <Link href={`/movies/movie/${movie.id}`}>{movie.title}</Link>
                        </h3>

                        {year && <span>{year}</span>}
                      </div>

                      <div className={styles.movieMetadata}>
                        {/*movie.runtime > 0 && (
                                                    <span>
                                                        <FiClock />
                                                        {formatRuntime(
                                                            movie.runtime
                                                        )}
                                                    </span>
                                                )*/}

                        {/*movie.genre_ids
                                                    .slice(0, 2)
                                                    .map((genre,i) => (
                                                        <span key={i}>
                                                            {genre.name === 'Thriller' ? 'Suspense' : genre.name}
                                                        </span>
                                                    ))*/}
                      </div>

                      <p>{movie.overview || 'Nenhuma descrição disponível para este filme.'}</p>

                      <Link href={`/movies/movie/${movie.id}`} className={styles.detailsButton}>
                        Ver detalhes
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {cards.length === 0 && (
            <div className={styles.emptyState}>
              <FiFilm />

              <h2>Nenhum filme disponível</h2>

              <p>Os filmes desta coleção ainda não estão disponíveis no catálogo.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string }

  const baseurl = process.env.NEXT_PUBLIC_WEBSITE_LINK
  if (!baseurl) {
    debug.log('url base não definida corretamente nas variáveis de ambiente')
    return {
      props: {},
    }
  }

  try {
    const { data } = await axios.get<Collection>(`${baseurl}/api/tmdb/collection/${id}`)

    return {
      props: {
        collection: data,
      },
    }
  } catch (err) {
    debug.log('Erro ao buscar dados da collection')
    return {
      props: {},
    }
  }
}

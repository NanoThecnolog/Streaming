import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTMDB } from '@/contexts/TMDBContext'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { tmdb } from '@/classes/TMDB'
import NewContent from '@/components/ui/NewContent'

interface CardProps {
  card: CardsProps | SeriesProps
  priority?: boolean
}

const FALLBACK_POSTER = '/fundo-alto.jpg'
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500'

function Card({ card, priority = false }: CardProps) {
  const { allData, serieData, cachedImages, setCachedImage } = useTMDB()
  const isSeries = 'season' in card
  const contentId = isSeries ? card.tmdbID : card.tmdbId
  const infoNews = isSeries ? (card.news ?? null) : null

  const [poster, setPoster] = useState('')
  const [showFallback, setShowFallback] = useState(false)
  const hasTriedTMDBRef = useRef(false)
  const isOverlayRef = useRef(false)

  const resolvePosterFromTMDB = useCallback(async (): Promise<string | null> => {
    const cached = cachedImages[contentId]
    if (cached) return cached

    const contextData = isSeries
      ? serieData.find((item) => item.id === contentId)
      : allData.find((item) => item.id === contentId)

    if (contextData?.poster_path) {
      const url = `${TMDB_POSTER_BASE}${contextData.poster_path}`
      setCachedImage(contentId, url)
      return url
    }

    try {
      let url: string | null = null

      if (isSeries) {
        const result = await tmdb.fetchSeriesDetails(contentId)
        url = result?.poster_path ? `${TMDB_POSTER_BASE}${result.poster_path}` : null
      } else {
        url = await tmdb.fetchMoviePoster(contentId)
      }

      if (url) setCachedImage(contentId, url)
      return url ?? null
    } catch (err) {
      debug.error('Erro ao buscar imagem do card: ', err)
      return null
    }
  }, [contentId, isSeries, cachedImages, allData, serieData, setCachedImage])

  useEffect(() => {
    hasTriedTMDBRef.current = false
    isOverlayRef.current = false
    setShowFallback(false)
    setPoster('')
  }, [card])

  useEffect(() => {
    if (poster !== '' || showFallback || hasTriedTMDBRef.current) return

    hasTriedTMDBRef.current = true

    void resolvePosterFromTMDB().then((url) => {
      if (url) {
        isOverlayRef.current = false
        setPoster(url)
        return
      }

      if (card.overlay) {
        isOverlayRef.current = true
        setPoster(card.overlay)
        return
      }

      setShowFallback(true)
    })
  }, [poster, showFallback, card, resolvePosterFromTMDB])

  const handleImageError = () => {
    if (!poster) return

    if (!isOverlayRef.current && card.overlay && card.overlay !== poster) {
      isOverlayRef.current = true
      setPoster(card.overlay)
      return
    }

    setShowFallback(true)
  }

  const href = isSeries ? `/series/serie/${card.tmdbID}` : `/movies/movie/${card.tmdbId}`

  return (
    <Link className={styles.card} href={href} aria-label={`Ver detalhes de ${card.title}`}>
      {infoNews && (
        <div className={styles.newsContainer}>
          <NewContent type={infoNews} />
        </div>
      )}

      {(poster !== '' || showFallback) && (
        <img
          src={showFallback ? FALLBACK_POSTER : poster}
          alt={card.title}
          className={styles.backgroundImage}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          {...(priority ? { fetchpriority: 'high' } : {})}
          onError={() => {
            void handleImageError()
          }}
        />
      )}
    </Link>
  )
}

export default memo(Card)

import { CardsProps } from '@/@types/Cards'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTMDB } from '@/contexts/TMDBContext'
import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { tmdb } from '@/classes/TMDB'
import NewContent from '@/components/ui/NewContent'

interface CardProps {
  card: CardsProps | SeriesProps
}
interface TMDBImagesProps {
  poster: string
}

export default function Card({ card }: CardProps) {
  const { allData, serieData } = useTMDB()
  const [TMDBImages, setTMDBImages] = useState<TMDBImagesProps>()
  const [infoNews, setInfoNews] = useState<'news' | 'episode' | 'season' | null>(null)
  //debug.log("Imagens no card: ", TMDBImages)

  /*useEffect(() => {
    if ('season' in card) {
      if (card.news) debug.log('news no card', card.news, card.title)
    }
  }, [card])*/

  useEffect(() => {
    async function getImage() {
      if ('season' in card) {
        const news = card.news
        setInfoNews(news ?? null)

        const data = serieData.find((data) => data.id === card.tmdbID)
        //debug.log('serie no card: ', data)
        const url = data
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : await tmdb.fetchSeriesDetails(card.tmdbID)

        if (url) {
          if (typeof url === 'string') setTMDBImages({ poster: url })
          else if ('poster_path' in url) {
            const posterUrl = `https://image.tmdb.org/t/p/w500${url.poster_path}`
            setTMDBImages({ poster: posterUrl })
          }
        }
      } else {
        const data = allData.find((data) => data.id === card.tmdbId)
        //debug.log('movie no card: ', data)
        const url = data
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : await tmdb.fetchMoviePoster(card.tmdbId)

        if (url) setTMDBImages({ poster: url })
        else {
          debug.error('url não definida')
        }
      }
    }
    getImage()
  }, [card, allData, serieData])

  const href = 'season' in card ? `/series/serie/${card.tmdbID}` : `/movies/movie/${card.tmdbId}`

  return (
    <Link className={styles.card} href={href} aria-label={`Ver detalhes de ${card.title}`}>
      {infoNews && (
        <div className={styles.newsContainer}>
          <NewContent type={infoNews} />
        </div>
      )}

      <img
        src={TMDBImages ? TMDBImages.poster : card.overlay}
        alt={card.title}
        className={styles.backgroundImage}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </Link>
  )
}

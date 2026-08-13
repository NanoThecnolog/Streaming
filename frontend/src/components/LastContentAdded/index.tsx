import { useEffect, useState } from 'react'
import CommonCarousel from '../ui/CommonCarousel'
import { CardsProps } from '@/@types/Cards'
import { useFlix } from '@/contexts/FlixContext'
import { SeriesProps } from '@/@types/series'

interface ComponentProps {
  cardPerContainer: number
  type: 'movie' | 'tv'
}
export default function LastContentAdded({ cardPerContainer, type }: ComponentProps) {
  const { movies, series } = useFlix()
  const [cards, setCards] = useState<CardsProps[] | SeriesProps[]>([])
  const content = type === 'movie' ? movies : series

  useEffect(() => {
    if (type === 'movie') {
      setCards([...content].sort((a, b) => b.index - a.index).slice(0, 20) as CardsProps[])
      return
    }

    setCards([...content].sort((a, b) => b.index - a.index).slice(0, 20) as SeriesProps[])
  }, [content, type])

  if (cards.length === 0) return null

  return (
    <CommonCarousel
      cardPerContainer={cardPerContainer}
      title={type === 'movie' ? 'Últimos filmes adicionados' : 'Últimas Séries adicionadas'}
      cards={cards}
    />
  )
}

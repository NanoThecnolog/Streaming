import styles from './styles.module.scss'

interface GenreItem {
  id: number
  name: string
}

interface GenreProps {
  genres?: GenreItem[]
}

const genreTranslations: Record<string, string> = {
  Action: 'Ação',
  Adventure: 'Aventura',
  'Action & Adventure': 'Ação e aventura',
  Animation: 'Animação',
  Comedy: 'Comédia',
  Crime: 'Crime',
  Documentary: 'Documentário',
  Drama: 'Drama',
  Family: 'Família',
  Fantasy: 'Fantasia',
  History: 'História',
  Horror: 'Terror',
  Kids: 'Infantil',
  Music: 'Música',
  Mystery: 'Mistério',
  News: 'Notícias',
  Reality: 'Reality show',
  Romance: 'Romance',
  'Sci-Fi & Fantasy': 'Ficção científica e fantasia',
  'Science Fiction': 'Ficção científica',
  Soap: 'Novela',
  Talk: 'Talk show',
  Thriller: 'Suspense',
  'TV Movie': 'Filme para TV',
  War: 'Guerra',
  'War & Politics': 'Guerra e política',
  Western: 'Faroeste',
}

const translateGenre = (genre: string): string => {
  const normalizedGenre = genre.trim()

  return genreTranslations[normalizedGenre] ?? normalizedGenre
}

export default function Genre({ genres = [] }: GenreProps) {
  const translatedGenres = Array.from(
    new Set(genres.map(({ name }) => translateGenre(name)).filter(Boolean)),
  )

  if (translatedGenres.length === 0) return null

  return (
    <div className={styles.genreContainer}>
      <ul className={styles.genreList} aria-label="Gêneros">
        {translatedGenres.map((genre) => (
          <li key={genre} className={styles.genreItem}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  )
}

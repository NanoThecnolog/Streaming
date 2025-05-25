import styles from './styles.module.scss'

interface GenreProps {
    genres: { id: number, name: string }[]
}

export default function Genre({ genres }: GenreProps) {
    return (
        <div className={styles.generoContainer}>
            <h4>
                {
                    genres.length > 0 &&
                    genres.map(genre =>
                        genre.name === "Action & Adventure" ?
                            "Ação e Aventura"
                            : genre.name === "Sci-Fi & Fantasy" ?
                                "Ficção Científica e Fantasia"
                                : genre.name === "Thriller" ?
                                    "Suspense"
                                    : genre.name).join(', ')
                }
            </h4>
        </div>
    )
}
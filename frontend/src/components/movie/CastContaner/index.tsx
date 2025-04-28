import { CastingProps, CastProps } from '@/@types/movie/cast'
import styles from './styles.module.scss'
import Cast from '@/components/Cast'

interface CastContainerProps {
    cast: CastingProps[]
}

export default function CastContainer({ cast }: CastContainerProps) {
    return (
        <div className={styles.cast}>
            {cast && cast.length > 0 &&
                <>
                    <h2>Elenco</h2>
                    <div className={styles.castContainer}>
                        {cast.slice(0, 20).map((actor, index) =>
                            <Cast actor={actor} key={index} />
                        )}
                    </div>
                </>
            }
        </div>
    )
}
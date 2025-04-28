import { CastingProps } from '@/@types/movie/cast'
import styles from './styles.module.scss'
import Image from 'next/image';
import { FaCircleUser } from 'react-icons/fa6';

interface CastComponentProps {
    actor: CastingProps;
}

export default function Cast({ actor }: CastComponentProps) {
    return (
        <div key={actor.cast_id}>
            <div className={styles.castImage} title={actor.name}>
                {
                    actor.profile_path ?
                        <Image
                            fill
                            quality={20}
                            priority
                            sizes="100%"
                            alt={actor.name}
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : '/fundo-alto.jpg'}
                            placeholder="blur"
                            blurDataURL="/blurImage.png"
                        />
                        : <FaCircleUser />
                }
            </div>
            <div className={styles.castInfo}>
                <h4>{actor.name}</h4>
                <h6>{actor.character}</h6>
            </div>
        </div>
    )
}
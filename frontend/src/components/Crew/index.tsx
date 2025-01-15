import { CrewProps } from '@/@types/cast'
import styles from './styles.module.scss'
import Image from 'next/image';
import { FaCircleUser } from 'react-icons/fa6';

interface CrewComponentProps {
    crew: CrewProps;

}

export default function Crew({ crew }: CrewComponentProps) {
    return (
        <div className={styles.crewMember}>
            <div className={styles.crewImage} title={crew.name}>
                {
                    crew.profile_path ?
                        <Image
                            fill
                            quality={20}
                            priority
                            sizes="100%"
                            alt={crew.name}
                            src={crew.profile_path ? `https://image.tmdb.org/t/p/original/${crew.profile_path}` : '/fundo-alto.jpg'}
                            placeholder="blur"
                            blurDataURL="/blurImage.png"
                        /> : <FaCircleUser />
                }
            </div>
            <div className={styles.crewInfo}>
                <h4>{crew.name}</h4>
                <h6>{crew.job}</h6>
            </div>
        </div>
    )
}
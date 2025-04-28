import { CrewProps } from '@/@types/movie/cast'
import styles from './styles.module.scss'

interface CrewComponentProps {
    crew: CrewProps;

}

export default function Crew({ crew }: CrewComponentProps) {
    return (
        <div className={styles.crewMember}>
            <div className={styles.crewInfo}>
                <h4>{crew.name}</h4>
                <h6>{crew.job}</h6>
            </div>
        </div>
    )
}
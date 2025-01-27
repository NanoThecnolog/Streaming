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
            <div className={styles.crewInfo}>
                <h4>{crew.name}</h4>
                <h6>{crew.job}</h6>
            </div>
        </div>
    )
}
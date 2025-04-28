import { groupedByDepartment } from '@/@types/movie/crew'
import styles from './styles.module.scss'
import { translate } from '@/utils/UtilitiesFunctions'
import Crew from '@/components/Crew'

interface CrewContainerProps {
    crewDepartment: groupedByDepartment
}

export default function CrewContainer({ crewDepartment }: CrewContainerProps) {
    return (
        <div className={styles.crew}>
            <h2>Equipe Técnica</h2>
            <div className={styles.crewContainer}>
                {Object.keys(crewDepartment).map((department) => (
                    <div key={department} className={styles.departmentGroup}>
                        <h3 className={styles.departmentTitle}>{translate(department)}</h3>
                        <div className={styles.departmentCrew}>
                            {crewDepartment[department]
                                .filter((crew, index, self) =>
                                    self.findIndex(c => c.name === crew.name) === index
                                )
                                .map((crew, index) => (
                                    <Crew crew={crew} key={index} />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
import { useId, useMemo, useState, } from 'react'
import { FiChevronDown, FiChevronUp, } from 'react-icons/fi'

import { CrewProps, groupedByDepartment, } from '@/@types/movie/crew'
import Crew from '@/components/Crew'
import { translate } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

interface CrewContainerProps {
    crewDepartment: groupedByDepartment
    limitPerDepartment?: number
}

interface Department {
    name: string
    translatedName: string
    members: CrewProps[]
}

const departmentOrder: Record<string, number> = {
    Directing: 0,
    Writing: 1,
    Production: 2,
    Camera: 3,
    Editing: 4,
    Sound: 5,
    Art: 6,
    'Costume & Make-Up': 7,
    'Visual Effects': 8,
    Crew: 9,
}

const removeDuplicatedCrew = (crew: CrewProps[]): CrewProps[] => {
    const identifiers = new Set<string>()

    return crew.filter(member => {
        const identifier = `${member.id}-${member.job}`

        if (identifiers.has(identifier)) {
            return false
        }

        identifiers.add(identifier)

        return true
    })
}

const organizeDepartments = (crewDepartment: groupedByDepartment): Department[] => {
    return Object.entries(crewDepartment)
        .map(([name, members]) => ({
            name,
            translatedName: translate(name),
            members: removeDuplicatedCrew(members),
        }))
        .filter(department => (
            department.members.length > 0
        ))
        .sort((first, second) => {
            const firstOrder =
                departmentOrder[first.name] ?? 99

            const secondOrder =
                departmentOrder[second.name] ?? 99

            if (firstOrder !== secondOrder) {
                return firstOrder - secondOrder
            }

            return first.translatedName.localeCompare(
                second.translatedName,
                'pt-BR',
            )
        })
}

export default function CrewContainer({ crewDepartment, limitPerDepartment = 12 }: CrewContainerProps) {
    const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set())

    const titleId = useId()

    const departments = useMemo(() => organizeDepartments(crewDepartment), [crewDepartment])

    const normalizedLimit = Math.max(1, Math.floor(limitPerDepartment))

    if (departments.length === 0) return null

    const handleToggleDepartment = (department: string) => {
        setExpandedDepartments(currentDepartments => {
            const updatedDepartments =
                new Set(currentDepartments)

            if (updatedDepartments.has(department)) {
                updatedDepartments.delete(department)
            } else {
                updatedDepartments.add(department)
            }

            return updatedDepartments
        })
    }

    return (
        <section
            className={styles.crew}
            aria-labelledby={titleId}
        >
            <header className={styles.header}>
                <h2
                    id={titleId}
                    className={styles.title}
                >
                    Equipe técnica
                </h2>
            </header>

            <div className={styles.crewContainer}>
                {departments.map((department, index) => {
                    const isExpanded =
                        expandedDepartments.has(department.name)

                    const visibleMembers = isExpanded
                        ? department.members
                        : department.members.slice(
                            0,
                            normalizedLimit,
                        )

                    const hasMoreMembers =
                        department.members.length >
                        normalizedLimit

                    const hiddenMembers =
                        department.members.length -
                        normalizedLimit

                    const departmentId =
                        `${titleId}-department-${index}`

                    return (
                        <section
                            key={department.name}
                            className={styles.departmentGroup}
                            aria-labelledby={`${departmentId}-title`}
                        >
                            <header
                                className={styles.departmentHeader}
                            >
                                <h3
                                    id={`${departmentId}-title`}
                                    className={styles.departmentTitle}
                                >
                                    {department.translatedName}
                                </h3>

                                <span
                                    className={styles.memberCount}
                                    aria-label={`${department.members.length} integrantes`}
                                >
                                    {department.members.length}
                                </span>
                            </header>

                            <div
                                id={departmentId}
                                className={styles.departmentCrew}
                            >
                                {visibleMembers.map(member => (
                                    <Crew
                                        key={`${member.id}-${member.job}`}
                                        crew={member}
                                    />
                                ))}
                            </div>

                            {hasMoreMembers && (
                                <button
                                    type="button"
                                    className={styles.toggleButton}
                                    onClick={() => {
                                        handleToggleDepartment(
                                            department.name,
                                        )
                                    }}
                                    aria-expanded={isExpanded}
                                    aria-controls={departmentId}
                                >
                                    <span>
                                        {isExpanded
                                            ? 'Mostrar menos'
                                            : `Ver mais ${hiddenMembers}`
                                        }
                                    </span>

                                    {isExpanded ? (
                                        <FiChevronUp
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <FiChevronDown
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            )}
                        </section>
                    )
                })}
            </div>
        </section>
    )
}
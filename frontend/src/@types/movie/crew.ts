export interface CrewProps {
    adult: boolean,
    gender: number,
    id: number,
    know_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string,
}
export interface groupedByDepartment {
    [job: string]: CrewProps[]
}

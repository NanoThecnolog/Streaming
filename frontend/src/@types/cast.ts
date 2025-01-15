export interface CastProps {
    id: number,
    cast: CastingProps[],
    crew: CrewProps[]
}
interface CastingProps {
    gender: number,
    id: number,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string
    known_for_department: string,
    order: number
}
interface CrewProps {
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
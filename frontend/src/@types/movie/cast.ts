import { CrewProps } from "./crew"

export interface CastProps {
    id: number,
    cast: CastingProps[],
    crew: CrewProps[]
}
export interface CastingProps {
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

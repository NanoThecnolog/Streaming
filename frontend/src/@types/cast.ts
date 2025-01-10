export interface CastProps {
    id: number,
    cast: {
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
    }[]
}
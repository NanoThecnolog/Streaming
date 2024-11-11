export interface CollectionProps {
    page: number,
    results: ResultsProps[],
    total_pages: number,
    total_results: number
}

export interface ResultsProps {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    overview: string,
    poster_path: string
}
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

export interface Collection {
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: Part[];
}

export interface Part {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: Date;
    softcore: boolean;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
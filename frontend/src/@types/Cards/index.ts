export interface CardsProps {
    background: string;
    overlay: string;
    tmdbId: number;
    title: string;
    subtitle: string;
    description: string;
    faixa: string;
    src: string;
    duration: string;
    genero: string[];
    lang?: "Dub" | "Leg",
    index: number;
}

export interface MovieTMDB {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: CollectionProps,
    budget: number,
    genres: GenresProps[],
    homepage: string,
    id: number,
    origin_country: string[]
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductCompanyProps[]
    production_countries: ProductCountryProps[]
    release_date: string,
    revenue: number
    runtime: number,
    spoken_languages: LanguagesProps[]
    status: string,
    tagline: string,
    title: string,
    video: boolean
    vote_average: number,
    vote_count: number
}

export interface ReleaseProps {
    tmdbId: number,
    name: string
}

interface CollectionProps {
    backdrop_path: string,
    id: number,
    name: string,
    poster_path: string
}
interface GenresProps {
    id: number,
    name: string
}
interface ProductCompanyProps {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}
interface ProductCountryProps {
    iso_3166_1: string
    name: string
}

interface LanguagesProps {
    english_name: string,
    iso_639_1: string
    name: string
}
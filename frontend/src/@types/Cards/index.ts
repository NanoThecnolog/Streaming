export interface CardsProps {
    background: string;
    overlay: string;
    tmdbId: number;
    title: string;
    subtitle?: string;
    description: string;
    faixa: string;
    src: string;
    duration: string;
    genero: string[];
}

export interface MovieTMDB {
    adult: boolean
    backdrop_path: string
    id: number,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    vote_average: number,
    runtime: number,
    genres:
    {
        id: number,
        name: string
    }[]

}
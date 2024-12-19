export interface SeriesProps {
    tmdbID: number;
    background: string;
    overlay: string;
    title: string;
    subtitle: string;
    description: string;
    genero: string[]
    faixa: string
    season: Seasons[]
}

export interface Seasons {
    s: number;
    lang: string
    episodes: Episodes[]
}

export interface Episodes {
    ep: number,
    src: string,
    duration: string
}

export interface TMDBEpisodes {
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    still_path: string,
    vote_average: number,
    season_number: number,
    runtime: number
}
export interface TMDBSeries {
    backdrop_path: string,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    vote_average: number
}
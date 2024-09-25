export interface SeriesProps {
    background: string;
    overlay: string;
    title: string;
    subtitle: string;
    description: string;
    genero: string[];
    season: Seasons[]
}

export interface Seasons {
    s: number;
    episodes: Episodes[]
}

export interface Episodes {
    ep: number,
    src: string,
    duration: string
}
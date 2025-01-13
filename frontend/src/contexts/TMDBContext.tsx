import { MovieTMDB } from "@/@types/Cards";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import { createContext, useContext, useState, ReactNode } from "react";

type TMDBProviderProps = {
    children: ReactNode;
}
interface TMDBContextProps {
    allData: MovieTMDB[];
    setAllData: (data: MovieTMDB[]) => void;
    serieData: TMDBSeries[];
    setSerieData: (data: TMDBSeries[]) => void;
}
export const TMDBContext = createContext<TMDBContextProps>({
    allData: [],
    setAllData: () => { },
    serieData: [],
    setSerieData: () => { }
});

export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([]);
    const [serieData, setSerieData] = useState<TMDBSeries[]>([])


    return (
        <TMDBContext.Provider value={{ allData, setAllData, serieData, setSerieData }}>
            {children}
        </TMDBContext.Provider>
    )
};

export const useTMDB = () => {
    return useContext(TMDBContext)
};

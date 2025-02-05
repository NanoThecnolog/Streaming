import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";
import { createContext, useContext, useState, ReactNode } from "react";

type TMDBProviderProps = {
    children: ReactNode;
}
interface TMDBContextProps {
    allData: MovieTMDB[];
    setAllData: (data: MovieTMDB[]) => void;
    serieData: TMDBSeries[];
    setSerieData: (data: TMDBSeries[]) => void;
    cachedImages: Record<number, string>
    setCachedImage: (id: number, url: string) => void
}

export const TMDBContext = createContext<TMDBContextProps>({
    allData: [],
    setAllData: () => { },
    serieData: [],
    setSerieData: () => { },
    cachedImages: [],
    setCachedImage: () => { },
});
export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([]);
    const [serieData, setSerieData] = useState<TMDBSeries[]>([])

    const [cachedImages, setCachedImages] = useState<Record<number, string>>({})

    function setCachedImage(id: number, url: string) {
        setCachedImages((prev) => ({ ...prev, [id]: url }))
    }

    return (
        <TMDBContext.Provider value={{ allData, setAllData, serieData, setSerieData, cachedImages, setCachedImage }}>
            {children}
        </TMDBContext.Provider>
    )
};

export const useTMDB = () => {
    return useContext(TMDBContext)
};

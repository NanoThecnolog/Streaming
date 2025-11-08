import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useFlix } from "./FlixContext";
import { flixFetcher } from "@/classes/Flixclass";

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
    setAllData: (data: MovieTMDB[]) => { },
    serieData: [],
    setSerieData: (data: TMDBSeries[]) => { },
    cachedImages: [],
    setCachedImage: () => { },
});

export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([])
    const [serieData, setSerieData] = useState<TMDBSeries[]>([])

    const { movies, series } = useFlix()

    const [cachedImages, setCachedImages] = useState<Record<number, string>>({})

    const getMovieData = async () => {
        await flixFetcher.fetchMovieData(setAllData, movies)
    }
    const getSerieData = async () => {
        await flixFetcher.fetchSerieData(setSerieData)
    }

    useEffect(() => {
        if (movies.length > 0) getMovieData()
    }, [movies])

    useEffect(() => {
        if (series.length > 0) getSerieData()
    }, [series])



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
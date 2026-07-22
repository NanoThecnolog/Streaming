import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useFlix } from "./FlixContext";
import { flixFetcher } from "@/classes/Flixclass";
import { debug } from "@/classes/DebugLogger";

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

    isLoadingMovies: boolean
    isLoadingSeries: boolean
}

export const TMDBContext = createContext<TMDBContextProps>({
    allData: [],
    setAllData: (data: MovieTMDB[]) => { },
    serieData: [],
    setSerieData: (data: TMDBSeries[]) => { },
    cachedImages: {},
    setCachedImage: () => { },

    isLoadingMovies: true,
    isLoadingSeries: true
});

export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([])
    const [serieData, setSerieData] = useState<TMDBSeries[]>([])

    const { movies, series } = useFlix()

    const [cachedImages, setCachedImages] = useState<Record<number, string>>({})

    const [isLoadingMovies, setIsLoadingMovies] = useState(true)
    const [isLoadingSeries, setIsLoadingSeries] = useState(true)


    /*useEffect(() => {
        debug.log("tmdb provider montado")
    }, [])

    useEffect(() => {
        debug.log("allData no provider", allData.length)
    }, [allData])*/


    useEffect(() => {
        const controller = new AbortController()

        const getMovieData = async () => {
            if (!movies.length) {
                setAllData([])
                setIsLoadingMovies(false)
                return
            }
            setIsLoadingMovies(true)

            try {
                await flixFetcher.fetchMovieData(setAllData, movies)
            } finally {
                setIsLoadingMovies(false)
            }
        }
        void getMovieData()

        return () => {
            controller.abort()
        }
    }, [movies])

    useEffect(() => {
        const controller = new AbortController()

        const getSerieData = async () => {
            if (series.length === 0) {
                debug.log("tornando serieData um array vazio")
                setSerieData([])
                setIsLoadingSeries(false)
                return
            }
            setIsLoadingSeries(true)
            try {
                await flixFetcher.fetchSerieData(setSerieData, series)
            } finally {
                setIsLoadingSeries(false)
            }

        }
        void getSerieData()

        return () => {
            controller.abort()
        }
    }, [series])

    const setCachedImage = (id: number, url: string) => {
        setCachedImages((prev) => ({ ...prev, [id]: url }))
    }

    return (
        <TMDBContext.Provider value={{
            allData,
            setAllData,
            serieData,
            setSerieData,
            cachedImages,
            setCachedImage,
            isLoadingMovies,
            isLoadingSeries
        }}>
            {children}
        </TMDBContext.Provider>
    )
};

export const useTMDB = () => {
    return useContext(TMDBContext)
};
import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
    movieError: string | null
    seriesError: string | null
}

export const TMDBContext = createContext<TMDBContextProps>({
    allData: [],
    setAllData: (data: MovieTMDB[]) => { },
    serieData: [],
    setSerieData: (data: TMDBSeries[]) => { },
    cachedImages: {},
    setCachedImage: () => { },

    isLoadingMovies: true,
    isLoadingSeries: true,
    movieError: null,
    seriesError: null,
});

export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([])
    const [serieData, setSerieData] = useState<TMDBSeries[]>([])

    const [cachedImages, setCachedImages] = useState<Record<number, string>>({})

    const [isLoadingMovies, setIsLoadingMovies] = useState(true)
    const [isLoadingSeries, setIsLoadingSeries] = useState(true)
    const [movieError, setMovieError] = useState<string | null>(null)
    const [seriesError, setSeriesError] = useState<string | null>(null)


    /*useEffect(() => {
        debug.log("tmdb provider montado")
    }, [])

    useEffect(() => {
        debug.log("allData no provider", allData.length)
    }, [allData])*/


    useEffect(() => {
        let cancelled = false

        const getMovieData = async () => {
            setIsLoadingMovies(true)
            setMovieError(null)

            try {
                const movies = await flixFetcher.fetchMovieData()
                if (!cancelled) setAllData(movies)
            } catch (error: unknown) {
                if (!cancelled) {
                    setMovieError(error instanceof Error ? error.message : 'Erro ao carregar filmes.')
                }
            } finally {
                if (!cancelled) setIsLoadingMovies(false)
            }
        }
        void getMovieData()

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        let cancelled = false

        const getSerieData = async () => {
            setIsLoadingSeries(true)
            setSeriesError(null)

            try {
                const series = await flixFetcher.fetchSerieData()
                if (!cancelled) setSerieData(series)
            } catch (error: unknown) {
                if (!cancelled) {
                    setSeriesError(error instanceof Error ? error.message : 'Erro ao carregar séries.')
                }
            } finally {
                if (!cancelled) setIsLoadingSeries(false)
            }
        }
        void getSerieData()

        return () => {
            cancelled = true
        }
    }, [])

    const setCachedImage = (id: number, url: string) => {
        setCachedImages((prev) => ({ ...prev, [id]: url }))
    }

    useEffect(() => {
        if (serieData.length > 0) debug.log("Series no TMDBContext", serieData)
    }, [serieData])

    useEffect(() => {
        if (allData.length > 0) debug.log("Movies no TMDBContext", allData)
    }, [allData])

    return (
        <TMDBContext.Provider value={{
            allData,
            setAllData,
            serieData,
            setSerieData,
            cachedImages,
            setCachedImage,
            isLoadingMovies,
            isLoadingSeries,
            movieError,
            seriesError,
        }}>
            {children}
        </TMDBContext.Provider>
    )
};

export const useTMDB = () => {
    return useContext(TMDBContext)
};

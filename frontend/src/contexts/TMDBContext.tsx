import { MovieTMDB } from "@/@types/Cards";
import { createContext, useContext, useState, ReactNode } from "react";


interface TMDBContextProps {
    allData: MovieTMDB[];
    setAllData: (data: MovieTMDB[]) => void;
}
type TMDBProviderProps = {
    children: ReactNode;
}

export const TMDBContext = createContext<TMDBContextProps>({
    allData: [],
    setAllData: () => { },
});

export function TMDBProvider({ children }: TMDBProviderProps) {
    const [allData, setAllData] = useState<MovieTMDB[]>([]);

    return (
        <TMDBContext.Provider value={{ allData, setAllData }}>
            {children}
        </TMDBContext.Provider>
    )
};

export const useTMDB = () => {
    return useContext(TMDBContext)
};

import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";
import { api } from "@/services/api";
import { createContext, useContext, useState, ReactNode } from "react";
import { destroyCookie, setCookie } from 'nookies';
import { UserProps } from "@/@types/user";

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
type SignInProps = {
    email: string,
    password: string
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
    const [user, setUser] = useState<UserProps>();
    const [cachedImages, setCachedImages] = useState<Record<number, string>>({})

    function setCachedImage(id: number, url: string) {
        setCachedImages((prev) => ({ ...prev, [id]: url }))
    }

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post<UserProps>('/login', {
                email: email,
                password
            })
            const { avatar, birthday, id, name, token, news, verified, myList, favoritos } = response.data
            destroyCookie(undefined, 'flixnext')
            setCookie(undefined, 'flixnext-token', token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                path: '/'
            })
            const user: UserProps = {
                id,
                name,
                email,
                avatar,
                birthday,
                news,
                verified,
                token,
                myList,
                favoritos
            }
            setUser(user)

        } catch (err) {
            console.log(err)
        }
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

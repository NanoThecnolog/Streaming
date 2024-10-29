import { WatchLaterProps } from "@/@types/watchLater";
import { api } from "./api";
/**
 * 
 * @param userid Id do usuário
 * @returns Retorna uma lista dos títulos salvos para assistir mais tarde. id, title, subtitle, tmdbid
 */

export default async function fetchWatchLater(userid: string) {
    const watchLaterList = await api.get<WatchLaterProps[]>(`/watchLater?id=${userid}`)
    const lista = watchLaterList.data;
    return lista
}
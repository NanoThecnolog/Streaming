import { toast } from "react-toastify"
import { api } from "./api"
import { ListaFavoritos } from "@/@types/favoritos"
/**
 * 
 * @param userId Id do usuario
 * @returns Retorna a lista de favoritos do usuario no banco de dados com id, title, subtitle, tmdbId e userId
 */
export async function fetchListFavorite(userId: string) {
    //toast.warning("A Função Listar Favoritos está temporariamente desativada")

    try {
        const favoriteList = await api.get<ListaFavoritos[]>(`/favorites?user=${userId}`)
        return favoriteList.data
    } catch (err) {
        console.log("Erro ao listar favoritos.")
        return
    }
}
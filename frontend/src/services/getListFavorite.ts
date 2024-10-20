import { toast } from "react-toastify"
import { api } from "./api"

export async function getListFavorite(userId: string) {
    toast.warning("A Função Listar Favoritos está temporariamente desativada")
    /*
    try {
        const favoriteList = await api.get(`/favorites?user=${userId}`)
        return favoriteList.data
    } catch (err) {
        console.log("Erro ao listar favoritos.")
        return
    }*/
}
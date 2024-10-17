import { api } from "./api"

export async function listFavorite(userId: string) {
    try {
        const favoriteList = await api.get(`/favorites?user=${userId}`)
        return favoriteList.data
    } catch (err) {
        console.log("Erro ao listar favoritos.")
        return
    }
}
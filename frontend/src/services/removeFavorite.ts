import { toast } from "react-toastify"
import { api } from "./api"

/**
 * 
 * @param id Id do item favorito dentro da lista de favoritos
 * @returns Retorna o item favorito removido ou null em caso de erro
 */

export async function RemoveFavorite(id: string) {
    //toast.warning("A Função Remover Favoritos está temporariamente desativada")
    try {
        const remover = await api.delete(`/favorite/${id}`)
        console.log(`${remover.data.title} ${remover.data.subtitle && `- ${remover.data.subtitle}`} removido dos favoritos.`)
        return remover.data
    } catch (err) {
        console.log("Erro ao remover favorito", err)
        return null
    }
}
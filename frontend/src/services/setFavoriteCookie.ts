import { toast } from "react-toastify";
import { fetchListFavorite } from "./fetchFavoriteList";
/**
 * 
 * @param userId Id do usuario
 * @returns Retorna se o cookie foi atualizado
 */

export async function favoriteCookie(userId: string): Promise<boolean> {
    //toast.warning("A Função favoriteCookie está temporariamente desativada")
    try {
        const favoriteList = await fetchListFavorite(userId);
        //const expressTime = 15 * 24 * 60 * 60 * 1000;
        const favoritos = JSON.stringify(favoriteList)
        //document.cookie = `favoriteList=${favoritos}; path=/; max-age=${expressTime}`
        localStorage.setItem("favoriteList", favoritos)
        return true
    } catch (err) {
        console.log("Erro ao defninir cookie")
        return false
    }


}
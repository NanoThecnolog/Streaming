import { toast } from "react-toastify";
import { getListFavorite } from "./getListFavorite";

export async function favoriteCookie(userId: string) {
    toast.warning("A Função favoriteCookie está temporariamente desativada")
    /*
    const favoriteList = await getListFavorite(userId);
    const expressTime = 15 * 24 * 60 * 60 * 1000;
    const favoritos = JSON.stringify(favoriteList)
    document.cookie = `favoriteList=${favoritos}; path=/; max-age=${expressTime}`
    return "Cookie atualizado"*/
}
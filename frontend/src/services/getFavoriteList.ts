import { ListaFavoritos } from "@/@types/favoritos";
import { toast } from "react-toastify";

/**
 * 
 * @returns Retorna uma lista dos favoritos do usuário salvo no localStorage com id, title, subtitle, tmdbId e userId
 */

export function getCookieFavoriteList() {
    //toast.warning("A Função favoriteCookie está temporariamente desativada")

    const favoriteList = localStorage.getItem('favoriteList')

    if (favoriteList) {
        const userData = JSON.parse(favoriteList)
        try {
            const favoritos: ListaFavoritos[] = userData
            return favoritos;
        } catch (err) {
            console.log("Erro ao pegar os dados no cookie", err);
            return null;
        }
    } else {
        return null;
    }

}
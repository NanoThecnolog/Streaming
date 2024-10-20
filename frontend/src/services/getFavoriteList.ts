import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

export function getCookieFavoriteList() {
    toast.warning("A Função favoriteCookie está temporariamente desativada")
    /*
    const favoriteList = getCookie('favoriteList')
    if (favoriteList) {
        try {
            const favoritos = JSON.parse(favoriteList);
            return favoritos;
        } catch (err) {
            console.log("Erro ao pegar os dados no cookie", err);
            return null;
        }
    }*/
    return null;
}
import { getCookie } from "cookies-next";

export function getCookieFavoriteList() {
    const favoriteList = getCookie('favoriteList')
    if (favoriteList) {
        try {
            const favoritos = JSON.parse(favoriteList);
            return favoritos;
        } catch (err) {
            console.log("Erro ao pegar os dados no cookie", err);
            return null;
        }
    }
    return null;
}
import { getListFavorite } from "./getListFavorite";

export async function favoriteCookie(userId: string) {
    const favoriteList = await getListFavorite(userId);
    const expressTime = 15 * 24 * 60 * 60 * 1000;
    const favoritos = JSON.stringify(favoriteList)
    document.cookie = `favoriteList=${favoritos}; path=/; max-age=${expressTime}`
    return "Cookie atualizado"
}
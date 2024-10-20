import { toast } from "react-toastify";
import { api } from "./api"
import { getListFavorite } from "./getListFavorite";
import { RemoveFavorite } from "./removeFavorite";
import { favoriteCookie } from "./setFavoriteCookie";

interface FavoriteProps {
    tmdbid: number,
    title: string,
    subtitle?: string
    userId: string
}
interface ReturnProps {
    id: string,
    tmdbid: number,
    title: string,
    subtitle: string,
}

export async function addFavorite({ tmdbid, title, subtitle, userId }: FavoriteProps): Promise<ReturnProps | null> {
    /*
    let isLoading;
    try {
        if (isLoading) return null;
        isLoading = true;
        const favoriteList = await getListFavorite(userId)
        //console.log(favoriteList)
        if (favoriteList && favoriteList.length >= 1) {
            const favoritoExiste = favoriteList.find((filme: { id: string, title: string, subtitle?: string }) => {
                return filme.title.trim().toLowerCase() === title.trim().toLowerCase() &&
                    filme.subtitle?.trim().toLowerCase() === (subtitle?.trim().toLowerCase() || '');
            })
            //console.log("favorito existe: ", favoritoExiste)
            if (favoritoExiste) {
                const remove = await RemoveFavorite(favoritoExiste.id)
                toast.warning(`${title} ${subtitle && `- ${subtitle}`} removido dos favoritos!`)
                await favoriteCookie(userId)
                return remove;
            }
        }
        const salvarFavorito = await api.post('/favorite', {
            tmdbid,
            title,
            subtitle,
            userId
        })
        toast.success(`${title} ${subtitle && `- ${subtitle}`} salvo nos favoritos.`)
        console.log(`${title} ${subtitle && `- ${subtitle}`} salvo nos favoritos.`)
        await favoriteCookie(userId)
        return salvarFavorito.data
    } catch (err) {
        toast.error("Erro ao tentar adicionar ou remover dos favoritos. Tente novamente")
        console.log("Erro ao adicionar ou remover dos favoritos", err)
        return null
    } finally {
        isLoading = false;
    }*/
    return null
}
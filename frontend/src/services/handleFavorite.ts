import { toast } from "react-toastify";
import setData, { fetchFavorites } from "./setDataOnStorage";
import { api } from "./api";
import { ListaFavoritos } from "@/@types/favoritos";
import { getCookie } from "cookies-next";
import { UserProps } from "@/@types/user";
import { updateUserCookie } from "./cookieClient";

/**
 * Função Assíncrona. Adiciona ou remove um filme / série aos favoritos no banco de dados e atualiza as listas.
 * @param tmdbid Id do filme / série no TMDB
 * @param title Título do filme / série
 * @param subtitle Subtítulo do filme / série
 * @param userId Id do usuário
 * @returns Retorna o filme / série adicinado ou null em caso de remoção ou falha
 */


export async function addFavorite(tmdbid: number, title: string, subtitle: string, userId: string) {

    let isLoading;
    try {
        if (isLoading) return null;
        isLoading = true;

        const userCookie = await getCookie('userData')
        if (!userCookie) return null;

        const userData: UserProps = JSON.parse(userCookie as string)
        const favoriteList: ListaFavoritos[] = await fetchFavorites(userData)
        const favoritoExiste = favoriteList.find(favorito => favorito.tmdbid === tmdbid)

        if (favoritoExiste) {
            // Remove dos favoritos e atualiza listas
            await removeFavorite(favoritoExiste.id)
            await updateUserCookie()
            await setData()

            toast.warning(`${favoritoExiste.title} ${favoritoExiste.subtitle && `- ${favoritoExiste.subtitle}`} removido dos favoritos!`)
            return null;
        }
        //Adiciona novo favorito e atualiza listas no Storage

        await api.post('/favorite', { tmdbid, title, subtitle, userId })
        await updateUserCookie()
        await setData()

        toast.success(`${title} ${subtitle && `- ${subtitle}`} salvo nos favoritos.`)
        return { tmdbid, title, subtitle, userId }
    } catch (err: any) {
        toast.error("Erro ao tentar adicionar ou remover dos favoritos. Tente novamente")
        console.log("Erro ao adicionar ou remover dos favoritos", err.response?.data)
        return null
    } finally {
        isLoading = false;
    }
}

/**
 * Função Assíncrona
 * @param id Id do item favorito dentro da lista de favoritos
 * @returns Retorna o item favorito removido ou null em caso de erro
 */

export async function removeFavorite(id: string) {
    //toast.warning("A Função Remover Favoritos está temporariamente desativada")
    try {
        await api.delete(`/favorite/${id}`)
    } catch (err) {
        console.log("Erro ao remover favorito", err)
        return null
    }
}

/**
 * Função Assíncrona. Verifica se o filme é favorito através do tmdbID utilizando
 * @param tmdbid Id do filme no TMDB
 * @returns Retorna valor booleano se o filme é favorito ou não
 */

export async function isFavorite(tmdbid: number): Promise<boolean> {


    try {
        const favoriteCookie = localStorage.getItem('favoriteList')
        if (!favoriteCookie) return false
        const favoriteList: ListaFavoritos[] = JSON.parse(favoriteCookie)
        return favoriteList.some(favorito => favorito.tmdbid === tmdbid);
    } catch (err) {
        console.error("Erro na função isFavorite: ", err);
        return false;
    }
}
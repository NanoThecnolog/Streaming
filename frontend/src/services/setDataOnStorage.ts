import { getCookie } from "cookies-next"
import { api } from "./api"
import { UserContext, UserProps } from "@/@types/user";
import { WatchLaterProps } from "@/@types/watchLater";
import { ListaFavoritos } from "@/@types/favoritos";

/**
 * Função Assíncrona.
 * Essa Função busca no banco de dados e salva as listas watchLater e favorite no storage do navegador. 
 * Essa função deve ser chamada no login ou sempre que precisar atualizar as listas no localstorage, afim de manter estados que dependem do localStorage atualizados.
 */

export default async function setData() {
    const userCookie = await getCookie('userData')
    if (!userCookie) return;
    const userData: UserProps = JSON.parse(userCookie as string)

    try {
        const [watchLater, favoritos] = await Promise.all([
            fetchWatchLater(userData),
            fetchFavorites(userData),
        ])
        localStorage.setItem('watchLaterList', JSON.stringify(watchLater))
        localStorage.setItem('favoriteList', JSON.stringify(favoritos))
    } catch (err) {
        console.log("Erro ao buscar e salvar listas: ", err)
    }
}

/**
 * Função Assíncrona. Busca a lista watchLater no banco de dados utilizando o id do usuário e retorna essa lista.
 * @param user Dados do usuário (id, name, email, avatar, etc)
 * @returns Lista de watchLater (id, title, subtitle, tmdbid)
 */

export async function fetchWatchLater(user: UserProps): Promise<WatchLaterProps[]> {
    return fetchList(`/watchLater?id=${user.id}`, "Erro ao buscar lista watchLater")
}

/**
 * Função Assíncrona. Busca os favoritos do usuário no banco de dados utilizando o id do usuário e retorna essa lista
 * @param user Dados do usuário (id, name, email, avatar, etc)
 * @returns Lista de Favoritos (id, title, subtitle, tmdbid, userId)
 */
export async function fetchFavorites(user: UserContext): Promise<ListaFavoritos[]> {
    return fetchList(`/favorites?user=${user.id}`, "Erro ao buscar lista de favoritos")
}

/**
 * Função geral assíncrona para busca de listas do banco de dados
 * @param endpoit Endpoint da API para buscar a lista
 * @param errorMessage Mensagem de erro a ser exibida em caso de falha
 * @returns Lista de objetos
 */

async function fetchList(endpoit: string, errorMessage: string) {
    try {
        const response = await api.get(endpoit, {})
        return response.data
    } catch (err) {
        console.log(errorMessage, err)
        return []
    }
}

/**
 * Busca os dados do usuário no banco de dados e retorna o resultado da requisição
 * @param user Dados do usuario
 * @returns Retorna os dados do usuario
 */

export async function fetchUserData(user: UserProps): Promise<UserProps> {
    return fetchList(`/user?id=${user.id}`, "Erro ao buscar dados do usuário")
}
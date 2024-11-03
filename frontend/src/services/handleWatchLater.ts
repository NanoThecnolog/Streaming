import { toast } from "react-toastify"
import { UserProps } from "@/@types/user";
import { api } from "./api";
import { WatchLaterProps } from "@/@types/watchLater";
import setData from "./setDataOnStorage";
import { getCookie } from "cookies-next";
import { updateUserCookie } from "./cookieClient";

/**
 * Essa função adiciona ou remove o filme da lista no banco de dados. 
 * Atualiza os dados do usuário, da lista de favoritos e da lista de watchlater no Storage.
 * @param userid ID do usuário
 * @param title Título do filme / série
 * @param tmdbid ID do filme no TMDB
 * @param subtitle Subtítulo do filme / série
 * @returns void
 */

export async function addWatchLater(userid: string, title: string, tmdbid: number, subtitle?: string) {
    let isLoading = false;
    try {
        if (isLoading) return;
        isLoading = true;

        const { data: filmes } = await api.get<WatchLaterProps[]>(`/watchLater?id=${userid}`);

        // Verifica se o filme já está na lista
        const filmeExiste = filmes.find((filme) => compareTitles(filme, title, subtitle));

        // Se o filme existe, remove-o
        if (filmeExiste) {
            await removeWatchLater(userid, filmeExiste.title, filmeExiste.subtitle);
            return;
        }

        // Adiciona o novo filme à lista e atualiza as listas no localStorage

        await api.post(`/watchLater/`, { userid, title, subtitle: subtitle || '', tmdbid }),
            await updateUserCookie(),
            await setData()
        toast.success("Filme adicionado à lista de assistir mais tarde!");
    } catch (err: any) {
        toast.error(err.response?.data?.message || "Erro ao adicionar filme à lista.");
        console.error("Erro ao adicionar filme:", err);
    } finally {
        isLoading = false;
    }
}

/**
 * Remove o filme da lista de watchLater.
 * @param userID Id do usuario
 * @param title Título do filme a ser removido
 * @param subtitle Subtitulo do filme a ser removido
 * @returns Retorna mensagem toast para o usuário informando se o filme foi removido ou não
 */

export async function removeWatchLater(userID: string, title: string, subtitle?: string) {
    try {
        const { data: listData } = await api.get<WatchLaterProps[]>(`/watchLater?id=${userID}`);

        // Busca o filme a ser removido
        const filme = listData.find(filme => compareTitles(filme, title, subtitle));
        if (!filme) return toast.error("Filme não encontrado na lista para assistir mais tarde.");

        // Remove o filme e atualiza as listas do localStorage

        await api.delete(`/watchLater/${filme.id}`)
        await updateUserCookie()
        await setData()
        toast.warning("Filme removido da lista para assistir mais tarde!");
    } catch (err) {
        console.error("Erro ao remover título:", err);
        toast.error("Erro ao remover título.");
    }
}

/**
 * Compara o título e subtítulo de um filme.
 * @param item Item a ser comparado
 * @param title Título do filme
 * @param subtitle Subtítulo do filme (opcional)
 * @returns Verdadeiro se os títulos e subtítulos forem iguais
 */
function compareTitles(item: WatchLaterProps, title: string, subtitle?: string): boolean {
    return item.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        item.subtitle?.trim().toLowerCase() === subtitle?.trim().toLowerCase();
}

/**
 * Verifica se um título ou série está na lista de assistir mais tarde do banco de dados.
 * @param title Título do filme ou série
 * @param subtitle Subtítulo do filme ou série (opcional)
 * @param tmdbid ID do TMDB (opcional)
 * @returns Verdadeiro se estiver na lista, falso caso contrário
 */
export async function isOnTheList(title: string, subtitle?: string, tmdbid?: number): Promise<boolean> {
    const userCookie = await getCookie('userData');
    if (!userCookie) return false;

    const user: UserProps = JSON.parse(userCookie);
    try {
        const { data } = await api.get<WatchLaterProps[]>(`/watchLater?id=${user.id}`);
        if (!Array.isArray(data)) return false;

        return tmdbid
            ? data.some(item => item.tmdbid === tmdbid)
            : data.some(item => compareTitles(item, title, subtitle));
    } catch (err: any) {
        console.error("Erro na função isOnTheList:", err?.response?.data?.error);
        return false;
    }
}
import { toast } from "react-toastify"
import { UserContext } from "@/@types/user";
import { api } from "./api";
import { WatchLaterProps } from "@/@types/watchLater";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { WatchLaterContext } from "@/@types/contexts/flixContext";
import { cards } from "@/data/cards";
import { cookieOptions } from "@/utils/Variaveis";
import { series } from "@/data/series";
import { debug } from "@/classes/DebugLogger";

interface TestProps {
    title: string,
    subtitle: string,
    tmdbId?: number,
    tmdbID?: number
}

/**
 * Essa função adiciona ou remove o filme da lista no banco de dados. Avisa com toast o resultado. 
 * Atualiza os dados do usuário, da lista de favoritos e da lista de watchlater no Storage.
 * @param userid ID do usuário
 * @param title Título do filme / série
 * @param tmdbid ID do filme no TMDB
 * @param subtitle Subtítulo do filme / série
 * @returns void
 */

export async function addWatchLater(tmdbid: number) {
    let isLoading = false;
    try {
        if (isLoading) return;
        isLoading = true;
        const { 'flix-user': userCookie } = parseCookies()
        if (!userCookie) return debug.warn("user cookie on function addWatchLater not found. UserCookie: ", userCookie)
        const user: UserContext = JSON.parse(userCookie)

        // Busca a lista no banco de dados pelo user
        const { data: filmes } = await api.get<WatchLaterProps[]>(`/watchLater?id=${user.id}`);

        // Verifica se o filme já está na lista
        const filmeExiste = filmes.find((filme) => filme.tmdbid === tmdbid);

        // Se o filme existe, remove-o
        if (filmeExiste) {
            await removeWatchLater(filmeExiste)
            return;
        }

        // Adiciona o novo filme à lista e atualiza as listas no localStorage
        const cardExiste = (): TestProps | null => {
            return cards.find(card => card.tmdbId === tmdbid)
                ?? series.find(card => card.tmdbID === tmdbid)
                ?? null
        }
        const movie = cardExiste()
        //const card = movie ? movie : series.find(card => card.tmdbID === tmdbid)
        if (!movie) {
            return debug.error("título não encontrado em cards", movie)
        }

        const data = {
            userid: user.id,
            title: movie.title,
            subtitle: movie.subtitle,
            tmdbid: movie.tmdbId ?? movie.tmdbID
        }
        await api.post(`/watchLater/`, data)
        const { 'flix-watch': watchCookie } = parseCookies()
        if (!watchCookie) {
            toast.warning("tenta relogar, ta dando erro...")
            return debug.error("Cookie flix-watch não encontrado")
        }
        const watchList: WatchLaterContext[] = JSON.parse(watchCookie)
        watchList.push({ id: tmdbid })
        destroyCookie(null, 'flix-watch')
        setCookie(null, 'flix-watch', JSON.stringify(watchList), cookieOptions)
        toast.success(`${movie.title} ${movie.subtitle != '' ? `- ${movie.subtitle}` : ''} adicionado à lista de assistir mais tarde!`);
    } catch (err: any) {
        toast.error(err.response.data.error || "Erro ao adicionar filme à lista.");
        debug.error("Erro ao adicionar filme:", err.response.data.error);
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

export async function removeWatchLater(filme: WatchLaterProps) {
    try {
        //const { data: listData } = await api.get<WatchLaterProps[]>(`/watchLater?id=${userID}`);

        // Busca o filme a ser removido
        //const filme = listData.find(filme => compareTitles(filme, title, subtitle));
        //if (!filme) return toast.error("Filme não encontrado na lista para assistir mais tarde.");

        // Remove o filme e atualiza as listas do localStorage

        await api.delete(`/watchLater/${filme.id}`)
        const { 'flix-watch': watchCookie } = parseCookies()
        if (!watchCookie) {
            toast.warning("tenta relogar, ta dando erro...")
            return debug.error("Cookie flix-watch não encontrado")
        }
        const watchList: WatchLaterContext[] = JSON.parse(watchCookie)
        const newWatchList = watchList.filter(item => item.id !== filme.tmdbid)
        destroyCookie(null, 'flix-watch')
        setCookie(null, 'flix-watch', JSON.stringify(newWatchList), cookieOptions)
        //await updateUserCookie()
        //await setData()
        toast.warning(`${filme.title} ${filme.subtitle != '' ? `- ${filme.subtitle}` : ''} removido da lista para assistir mais tarde!`);
    } catch (err) {
        debug.error("Erro ao remover título:", err);
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
 * Verifica se um título ou série está na lista de assistir mais tarde do cookie flix-watch.
 * @param tmdbid ID do TMDB
 * @returns Verdadeiro se estiver na lista, falso caso contrário
 */
export async function isOnTheList(tmdbid: number): Promise<boolean> {
    const { 'flix-watch': watchLaterList } = parseCookies()
    if (!watchLaterList) return false;
    const watchLater: WatchLaterContext[] = JSON.parse(watchLaterList)
    return watchLater.some(item => item.id === tmdbid)
}
import { CardsProps } from "@/@types/Cards";
import { ListManager } from "./superclasses/ListManager";
import { SeriesProps } from "@/@types/series";
import { UserContext } from "@/@types/user";
import { debug } from "./DebugLogger";
import { api } from "@/services/api";
import { WatchLaterProps } from "@/@types/watchLater";
import { WatchLaterContext } from "@/@types/contexts/flixContext";
import { toast } from "react-toastify";

class WatchLaterManager extends ListManager {
    private loading = false

    /**
     * Adiciona ou remove conteúdo da lista no banco de dados. Avisa com toast o resultado. 
     * Atualiza os dados do usuário, da lista de favoritos e da lista de watchlater no Storage.
     * @param tmdbid ID do conteúdo no TMDB
     * @param card card do conteúdo no banco de dados
     * @returns void
     */
    public async addWatchLater(card: CardsProps | SeriesProps) {
        if (this.loading) return
        this.loading = true

        try {
            const user = this.getCookie<UserContext>('flix-user')
            if (!user) return debug.warn('User Cookie not found.')
            const { data: filmes } = await api.get<WatchLaterProps[]>(`/watchLater?id=${user.id}`)
            const tmdbid = 'src' in card ? card.tmdbId : card.tmdbID
            const filmeExiste = filmes.find(filme => filme.tmdbid === tmdbid)

            if (filmeExiste) {
                await this.removeWatchLater(filmeExiste)
                return
            }
            const data = {
                userid: user.id,
                title: card.title,
                subtitle: card.subtitle,
                tmdbid
            }
            await api.post(`/watchLater/`, data)

            const watchList = this.getCookie<WatchLaterContext[]>('flix-watch') || []
            watchList.push({ id: tmdbid })
            this.updateCookie('flix-watch', watchList)
            this.toastAdd(card.title, card.subtitle)
        } catch (err: any) {
            toast.error(err.response.data.error || "Erro ao adicionar filme à lista.")
            debug.error('Erro ao adicionar filme: ', err)
        } finally {
            this.loading = true
        }
    }
    /**
 * Remove o filme da lista de watchLater.
 * @param userID Id do usuario
 * @param title Título do filme a ser removido
 * @param subtitle Subtitulo do filme a ser removido
 * @returns Retorna mensagem toast para o usuário informando se o filme foi removido ou não
 */
    private async removeWatchLater(filme: WatchLaterProps) {
        try {
            await api.delete(`/watchLater/${filme.id}`)

            const watchList = this.getCookie<WatchLaterContext[]>('flix-watch') || []
            const newWatchList = watchList.filter(item => item.id !== filme.tmdbid)
            this.updateCookie('flix-watch', newWatchList)

            this.toastRemove(filme.title, filme.subtitle)
        } catch (err: any) {
            debug.error("Erro ao remover título:", err)
            toast.error('Erro ao remover título.')
        }
    }
    /**
         * Verifica se um título ou série está na lista de assistir mais tarde.
         * @param tmdbid ID do TMDB
         * @returns Verdadeiro se estiver na lista, falso caso contrário
         */
    public isOnTheList(tmdbid: number): boolean {
        const watchList = this.getCookie<WatchLaterContext[]>('flix-watch') || []
        if (!watchList) return false;
        return watchList.some(item => item.id === tmdbid)
    }
}

export const watchLaterManager = new WatchLaterManager()
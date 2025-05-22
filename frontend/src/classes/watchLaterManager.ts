import { CardsProps } from "@/@types/Cards";
import { ListManager } from "./superclasses/ListManager";
import { SeriesProps } from "@/@types/series";
import { UserContext } from "@/@types/user";
import { debug } from "./DebugLogger";
import { WatchLaterProps } from "@/@types/watchLater";
import { WatchLaterContext } from "@/@types/contexts/flixContext";
import { toast } from "react-toastify";
import { SetupAPIClient } from "@/services/api";
import axios from "axios";

export class WatchLaterManager extends ListManager {
    private loading = false
    private ctx: any
    //private client: SetupAPIClient
    constructor(client?: SetupAPIClient, ctx?: any) {
        super(client)
        this.ctx = ctx
    }

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
            if (!this.client) return debug.log('Client não instanciado no metodo addWatchLater')
            const { data: filmes } = await this.client.api.get<WatchLaterProps[]>(`/watchLater`)
            //debug.log('lista com os conteudos antes do novo filme ser add', filmes)
            const tmdbid = 'src' in card ? card.tmdbId : card.tmdbID
            const filmeExiste = filmes.find(filme => String(filme.tmdbid) === String(tmdbid))

            if (filmeExiste) {
                const newWatchList = await this.removeWatchLater(filmeExiste)
                return {
                    cookie: newWatchList,
                    message: `${card.title} ${card.subtitle ? `- ${card.subtitle}` : ''} removido da sua lista!`
                }
            }
            const data = {
                title: card.title,
                subtitle: card.subtitle,
                tmdbid
            }
            await this.client.api.post(`/watchLater`, data)
            const watchListOnDB = await this.client.api.get<WatchLaterProps[]>('/watchLater')
            const requestData = watchListOnDB.data
            const newWatchList = requestData.map(item => ({ id: item.id, tmdbid: item.tmdbid }))
            //debug.log('Lista WatchLater com o novo titulo added', newWatchList)
            //this.updateCookie('flix-watch', newWatchList, this.ctx)
            return {
                cookie: newWatchList,
                message: `${card.title} ${card.subtitle ? `- ${card.subtitle}` : ''} adicionado da sua lista!`
            }
        } catch (err: any) {
            toast.error(err.response.data.error || "Erro ao adicionar filme à lista.")
            debug.error('Erro ao adicionar filme: ', err)
        } finally {
            this.loading = false
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
        if (!this.client) return debug.log('Client não instanciado no metodo removeWatchLater')
        try {

            //debug.log('removendo...', filme)
            //const response = await axios.delete(`http://localhost:3000/api/user/list/delete/${filme.id}`)
            await this.client.api.delete(`/watchLater/${filme.id}`)
            const watchListOnDB = await this.client.api.get<WatchLaterProps[]>('/watchLater')
            const requestData = watchListOnDB.data
            const newWatchList = requestData.map(item => ({ id: item.id, tmdbid: item.tmdbid }))
            //debug.log('Lista WatchLater com o novo titulo added', newWatchList)
            //this.updateCookie('flix-watch', newWatchList, this.ctx)
            return newWatchList
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
        //debug.log('log no metodo isOnTheList', watchList)
        if (!watchList) return false;
        return watchList.some(item => item.tmdbid === tmdbid)
    }
}

//export const watchLaterManager = new WatchLaterManager()
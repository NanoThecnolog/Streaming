import { toast } from "react-toastify"
import { api } from "./api";
import { UserProps } from "@/@types/user";
import { CardsProps } from "@/@types/Cards";
import { WatchLaterProps } from "@/@types/watchLater";

export async function addWatchLater(id: string, title: string, subtitle?: string) {
    let isLoading;
    try {
        if (isLoading) return;
        isLoading = true;
        const watchLaterList = await api.get(`/watchLater?id=${id}`)
        const filmes = watchLaterList.data;

        const filmeExiste = filmes.find((filme: { id: string, title: string, subtitle?: string }) => {
            return filme.title.trim().toLowerCase() === title.trim().toLowerCase() &&
                filme.subtitle?.trim().toLowerCase() === (subtitle?.trim().toLowerCase() || '');
        })
        if (filmeExiste) {
            await removeWatchLater(filmeExiste.title, filmeExiste.subtitle)
            return
        }
        const addFilm = await api.post(`/watchLater/`, {
            id,
            title,
            subtitle: subtitle || ''
        })
        toast.success("Filme adicionado à lista de assistir mais tarde!")
        return addFilm;

    } catch (err: any) {
        if (err.response && err.response.data) {
            return toast.error(err.response.data.message || "Erro ao adicionar filme à lista.")
        } else {
            console.log(err)
            return toast.error("Erro inesperado na função addWatchLater ao adicionar filme à lista!")
        }
    } finally {
        isLoading = false
    }
}

export async function removeWatchLater(title: string, subtitle?: string) {
    try {
        const localstorage: string | null = localStorage.getItem('flixnext')
        if (!localstorage) return "usuario não definido"
        const user: UserProps = JSON.parse(localstorage)

        const filmesUser = await api.get(`/watchLater?id=${user.id}`)
        const listData: WatchLaterProps[] = filmesUser.data
        const filme = listData.find(filme => title === filme.title && subtitle === filme.subtitle)
        if (!filme) return toast.error("Filme não encontrado na lista para assistir mais tarde.")
        const remove = await api.delete(`/watchLater/${filme?.id}`)
        if (remove.status === 200 || remove.status === 204) {
            return toast.warning("Filme removido da lista para assistir mais tarde!")
        }
    } catch (err) {
        console.log("Erro ao remover Título", err)
        if (err instanceof Error) return err.message
        const errorMessage = `Erro ao remover Título, ${err}`;
        return errorMessage
    }
}
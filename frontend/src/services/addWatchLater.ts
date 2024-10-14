import { toast } from "react-toastify"
import { api } from "./api";

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
            const remove = await api.delete(`/watchLater/${filmeExiste.id}`)
            toast.warning("Filme removido da lista para assistir mais tarde!")
            return remove;
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
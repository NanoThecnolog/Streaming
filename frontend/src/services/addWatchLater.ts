import { toast } from "react-toastify"
import { getCookieClient } from "./cookieClient"
import Router from "next/router";
import { api } from "./api";

export async function addWatchLater(id: string, title: string, subtitle?: string) {
    try {
        const user = getCookieClient();
        if (!user) {
            return Router.push('/login')
        }
        const watchLaterList = await api.get(`/watchLater?id=${user.id}`)
        const filmes = watchLaterList.data;

        const filmeExiste = filmes.find((filme: { id: string, title: string, subtitle?: string }) => {
            return filme.title.trim().toLowerCase() === title.trim().toLowerCase() &&
                filme.subtitle?.trim().toLowerCase() === (subtitle?.trim().toLowerCase() || '');
        })
        if (filmeExiste) {
            const remove = await api.delete(`/watchLater/${filmeExiste.id}`)
            toast.success("Filme removido da lista para assistir mais tarde!")
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
            return toast.error("Erro inesperado ao adicionar filme à lista!")
        }
    }
}
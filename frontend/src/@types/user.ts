import { ListaFavoritos } from "./favoritos"

export interface UserProps {
    id: string,
    name: string,
    email: string,
    avatar: string,
    token: string,
    verified: boolean,
    birthday: Date,
    news: boolean,
    access: boolean,
    myList: MyListPorps[]
    favoritos: ListaFavoritos[]
    createdAt: Date
}

export interface UserContext {
    id: string,
    name: string,
    email: string,
    avatar: string,
    birthday: Date,
    news: boolean,
    verified: boolean,
    createdAt: Date,
    access: boolean
}

export interface MyListPorps {
    id: string,
    title: string,
    subtitle: string,
    userId: string,
    created_at: string,
    updated_at: string
    tmdbid: number
}
import { Address } from "./efi/chargeEfi"
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
    name: string,
    email: string,
    cpf: string | null,
    phone_number: string | null,
    avatar: string | null,
    verified: boolean,
    birthday: Date,
    news: boolean,
    createdAt: Date,
    watchLater: MyListPorps[],
    subscription: SubscriptionProps,
    donator: boolean,
    address: Address | null
}
export interface SubscriptionProps {
    id: string,
    userId: string,
    subId: number,
    planId: string,
    startedAt: string | Date,
    status: string
}
export interface UserCookiesProps {
    name: string,
    email: string,
    avatar: string | null,
    verified: boolean,
    birthday: Date,
    news: boolean,
    createdAt: Date,
    subscription: SubscriptionProps
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

export interface LoginProps {
    id: string,
    name: string,
    avatar: string,
    watchLater: MyListPorps[],
    token: string
}
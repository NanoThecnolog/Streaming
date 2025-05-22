import { SetupAPIClient } from "@/services/api";
import { cookieOptions } from "@/utils/Variaveis";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";

export class ListManager {
    protected client?: SetupAPIClient
    constructor(client?: SetupAPIClient) {
        this.client = client
    }
    protected toastAdd(title: string, subtitle: string = '') {
        toast.success(`${title} ${subtitle ? `- ${subtitle}` : ''} adicionado à lista!`)
    }
    protected toastRemove(title: string, subtitle: string = '') {
        toast.warning(`${title} ${subtitle ? `- ${subtitle}` : ''} removido da lista!`)
    }

    public getCookie<T>(name: string, ctx?: any): T | null {
        const cookie = parseCookies(ctx)
        return cookie[name] ? JSON.parse(cookie[name]) : null
    }
    public updateCookie<T>(cookieName: string, newData: T, ctx?: any) {
        destroyCookie(ctx ? ctx : null, cookieName)
        setCookie(ctx ? ctx : null, cookieName, JSON.stringify(newData), cookieOptions)
    }
}
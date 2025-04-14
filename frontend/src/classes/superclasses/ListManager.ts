import { cookieOptions } from "@/utils/Variaveis";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";

export class ListManager {
    protected updateCookie<T>(cookieName: string, newData: T) {
        destroyCookie(null, cookieName)
        setCookie(null, cookieName, JSON.stringify(newData), cookieOptions)
    }
    protected toastAdd(title: string, subtitle: string = '') {
        toast.success(`${title} ${subtitle ? `- ${subtitle}` : ''} adicionado à lista!`)
    }
    protected toastRemove(title: string, subtitle: string = '') {
        toast.warning(`${title} ${subtitle ? `- ${subtitle}` : ''} removido da lista!`)
    }

    protected getCookie<T>(name: string): T | null {
        const cookie = parseCookies()
        return cookie[name] ? JSON.parse(cookie[name]) : null
    }
}
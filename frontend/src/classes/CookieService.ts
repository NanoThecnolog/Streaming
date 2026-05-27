import { destroyCookie, parseCookies, setCookie } from "nookies";

export class CookieService {

    static set<T>(key: string, value: T) {
        setCookie(null, key, JSON.stringify(value), {
            maxAge: 60 * 60 * 24 * 365 * 10, //10 aninhos
            path: '/'
        })
    }

    static get<T>(key: string): T | null {
        const cookies = parseCookies()
        const cookie = cookies[key]

        if (!cookie)
            return null

        return JSON.parse(cookie) as T
    }

    static remove(key: string) {
        destroyCookie(null, key, {
            path: '/'
        })
    }
}
import { getCookie, setCookie } from "cookies-next";
import setData, { fetchUserData } from "./setDataOnStorage";
import { UserProps } from "@/@types/user";
import { parseCookies } from "nookies";
import { debug } from "@/classes/DebugLogger";
/**
 * Função assíncrona. Retorna os dados do usuário salvos no cookie flix-user. Esse cookie é definido sempre que um novo login é realizado
 * ou quando os dados são atualizados
 * @returns Retorna os dados do usuario ou null em casos em que o cookie não é encontrado
 */

export async function getUserCookieData(): Promise<UserProps | null> {
    const userCookie = await getCookie('flix-user')
    if (!userCookie) return null;
    const userData: UserProps = JSON.parse(userCookie as string)
    debug.log('User no serviço cookieClient:', userData)
    return userData
}

/**
 * Busca o cookie e retorna no formato json
 * @param cookie Nome do cookie
 * @returns Retorna um json do cookie
 */

export function getCookieData(cookie: string) {
    const cookies = parseCookies()
    return JSON.parse(cookies[cookie])
}

/**
 * Função Assíncrona. Busca dados do usuário no banco de dados e atualiza o cookie flix-user com os dados atualizados do usuário.
 * @returns Retorna os dados do usuário atualizado ou null em caso de erros
 */

export async function updateUserCookie() {
    const oldUserData = await getCookie('userData')
    if (!oldUserData) return;
    const userData: UserProps = JSON.parse(oldUserData as string)

    try {
        const response = await fetchUserData(userData)
        //debug.log("response", response)
        const expressTime = 15 * 24 * 60 * 60 * 1000;
        const user = JSON.stringify({
            id: response.id,
            name: response.name,
            avatar: response.avatar,
            Verified: response.verified,
            birthday: response.birthday,
            news: response.news,
            token: response.token
        })

        //document.cookie = `userData=${user}; path=/; max-age=${expressTime}`
        setCookie('userData', user, { path: '/', maxAge: expressTime })
        await setData()
        return user
    } catch (err) {
        debug.error("Erro ao atualizar cookie do usuario", err)
        return null
    }

}

/**
 * Deleta o cookie informado
 * @param cookieName Nome do cookie a ser deletado
 */

export function deleteCookies(cookieName: string) {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 jan 1970 00:00:00 UTC;`
    //localStorage.removeItem('flixnext')
}
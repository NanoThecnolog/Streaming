import { getCookie } from "cookies-next";
import { api } from "./api";

/**
 * 
 * @returns Retorna os dados do usuario salvos no localStorage. id, name, avatar, birthday, email, lista de favoritos, lista de assistir mais tarde, token, verified
 */

export function getCookieClient() {
    //const cookieData = getCookie("flixnext");
    if (typeof window !== 'undefined') {
        const localStorageData = localStorage.getItem('flixnext')
        if (localStorageData) {
            try {
                const userData = JSON.parse(localStorageData);
                return userData;
            } catch (err) {
                console.log("Erro ao pegar os dados no cookie", err);
                return null;
            }
        }
    }
    return null;
}
export async function setCookieClient(userId: string) {
    try {
        const response = await api.get(`/user?id=${userId}`)
        //console.log("Resposta ao chamar setCookieClient", response.data)
        //const expressTime = 15 * 24 * 60 * 60 * 1000;
        const userData = JSON.stringify(response.data)
        //const userDataSize = new TextEncoder().encode(userData).length;
        //console.log("Tamanho do cookie", userDataSize)
        localStorage.setItem('flixnext', userData)
        //document.cookie = `flixnext=${userData}; path=/; max-age=${expressTime}`
    } catch (err) {
        console.log("Erro ao setar cookie: ", err)
    }

}
export function deleteCookies(cookieName: string) {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 jan 1970 00:00:00 UTC;`
    localStorage.removeItem('flixnext')
}
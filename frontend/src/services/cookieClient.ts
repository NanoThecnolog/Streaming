import { getCookie } from "cookies-next";
import { api } from "./api";

export function getCookieClient() {
    const cookieData = getCookie("flixnext");

    if (cookieData) {
        try {
            const userData = JSON.parse(cookieData);
            return userData;
        } catch (err) {
            console.log("Erro ao pegar os dados no cookie", err);
            return null;
        }
    }
    return null;
}
export async function setCookieClient() {

    const cookieData = getCookie("flixnext");

    if (!cookieData) return "cookie não definido"

    const userCookie = JSON.parse(cookieData)
    return
    const userID = userCookie.id
    const response = await api.get(`/user?id=${userID}`)

    const expressTime = 15 * 24 * 60 * 60 * 1000;
    const userData = JSON.stringify(response.data)
    document.cookie = `flixnext=${userData}; path=/; max-age=${expressTime}`
    return "Cookie atualizado"
}
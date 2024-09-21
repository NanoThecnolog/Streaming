import { getCookie } from "cookies-next";

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
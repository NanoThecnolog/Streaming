import { api } from "./api";
import { getCookieClient } from "./cookieClient";

export async function isOnTheList(title: string, subtitle?: string): Promise<boolean> {
    const user = getCookieClient();
    if (!user) {
        //console.log("User ainda não reconhecido", user)
        return false
    }
    //console.log("user reconhecido", user)
    const watchLaterList = await api.get(`/watchLater?id=${user.id}`)
    const onTheList: boolean = watchLaterList.data.some((item: { id: string, title: string, subtitle?: string }) => {
        return item.title.trim().toLowerCase() === title.trim().toLowerCase() && item.subtitle?.trim().toLowerCase() === subtitle?.trim().toLowerCase()
    })
    return onTheList
}
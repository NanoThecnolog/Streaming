import { WatchLaterProps } from "@/@types/watchLater";
import { api } from "./api";
import { getCookieClient } from "./cookieClient";

function compareTitles(item: WatchLaterProps, title: string, subtitle?: string): boolean {
    return (
        item.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        item.subtitle?.trim().toLowerCase() === subtitle?.trim().toLowerCase()
    );
}

export async function isOnTheList(title: string, subtitle?: string): Promise<boolean> {
    const user = getCookieClient();
    if (!user) {
        return false
    }
    try {

        const { data } = await api.get<WatchLaterProps[]>(`/watchLater?id=${user.id}`)
        //console.log("Data em isOnTheList", data)
        if (!Array.isArray(data)) {
            //console.error("Erro: dados de watchLater não são um array.", data);
            return false;
        }
        const onTheList: boolean = data.some((item) => {
            const result = compareTitles(item, title, subtitle)
            //console.log("comparando", item, "com ", title, " e, ", subtitle)
            return result
        })

        /*const onTheList: boolean = data.some((item: { id: string, title: string, subtitle?: string }) => {
            return item.title.trim().toLowerCase() === title.trim().toLowerCase() && item.subtitle?.trim().toLowerCase() === subtitle?.trim().toLowerCase()
        })*/
        //console.log("verificação na função isOnTheList", onTheList)
        return onTheList
    } catch (err) {
        console.log("Erro na função isOnTheList", err)
        return false
    }
}
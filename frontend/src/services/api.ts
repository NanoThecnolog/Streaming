import axios from "axios";
import { getUserCookieData } from "./cookieClient";

const url = process.env.NEXT_PUBLIC_RENDER;
if (!url) console.log("variável de ambiente não configurada.")
export const api = axios.create({
    baseURL: url
});

api.interceptors.request.use(async (config) => {
    const user = await getUserCookieData()

    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})
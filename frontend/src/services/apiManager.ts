import { debug } from "@/classes/DebugLogger";
import axios from "axios";
//import { parseCookies } from "nookies";

const url = process.env.NEXT_PUBLIC_CONTENT_MANAGER_URL;
if (!url) debug.error("variável de ambiente não configurada.")
export const apiManager = axios.create({
    baseURL: url
});

/*api.interceptors.request.use(async (config) => {
    const { 'flix-token': token } = parseCookies()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, (error) => {
    return Promise.reject(error)
})*/
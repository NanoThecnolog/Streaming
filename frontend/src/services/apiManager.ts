import { debug } from "@/classes/DebugLogger";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_CONTENT_MANAGER_URL;
if (!url) console.error("url do gerenciador de conteúdo não configurada.")
const apiKey = process.env.NEXT_PUBLIC_API_KEY
if (!apiKey) debug.error("apiKey do contentManager ausente.")
export const apiManager = axios.create({
    baseURL: url
});

apiManager.interceptors.request.use(
    async (config) => {
        if (apiKey) {
            config.headers = config.headers ?? {}
            config.headers['key'] = apiKey
        } else debug.error("enviroment variable API_KEY missing")
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

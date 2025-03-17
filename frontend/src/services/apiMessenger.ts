import { debug } from "@/classes/DebugLogger"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_MENSAGERIA
const apiKey = process.env.NEXT_PUBLIC_API_KEY
if (!url) debug.error('Url não definida')

debug.log('url', url)
export const apiEmail = axios.create({
    baseURL: url
})

apiEmail.interceptors.request.use(
    async (config) => {
        if (apiKey) {
            config.headers = config.headers ?? {}
            config.headers['key'] = apiKey
        } else debug.error("enviroment variable API_KEY missing")
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
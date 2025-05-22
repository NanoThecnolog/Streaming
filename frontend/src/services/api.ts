import { debug } from "@/classes/DebugLogger";
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

const url = process.env.NEXT_PUBLIC_RENDER;
if (!url) debug.error("variável de ambiente não configurada.")

export class SetupAPIClient {
    private token: string
    public api: AxiosInstance
    constructor(ctx?: any) {
        const cookies = parseCookies(ctx)
        this.token = cookies['flix-token']

        this.api = axios.create({
            baseURL: url,
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : ''
            }
        })

    }
}

/**export const api = axios.create({
    baseURL: url
});*/

/*api.interceptors.request.use(async (config) => {
    const { 'flix-token': token } = parseCookies()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, (error) => {
    return Promise.reject(error)
})*/
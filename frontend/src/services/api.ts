import axios from "axios";
import { parseCookies } from "nookies";

const url = process.env.NEXT_PUBLIC_RENDER;
if (!url) console.log("variável de ambiente não configurada.")
export const api = axios.create({
    baseURL: url
});

api.interceptors.request.use(async (config) => {
    const { 'flix-token': token } = parseCookies()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, (error) => {
    return Promise.reject(error)
})
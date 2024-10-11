import axios from "axios";

const url = process.env.NEXT_PUBLIC_RENDER;
if (!url) console.log("variável de ambiente não configurada.")
export const api = axios.create({
    baseURL: url
})
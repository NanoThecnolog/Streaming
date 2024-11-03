import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_TMDB;
if (!url) console.log("variável de ambiente não configurada.")
export const apiTMDB = axios.create({
    baseURL: url
})
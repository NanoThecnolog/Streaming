import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_TMDB;
if (!url) console.log("variável de ambiente não configurada.")

/**
 * requisição na API do TMDB
 */

export const apiTMDB = axios.create({
    baseURL: url
})
import axios from "axios"


const urlGoogle = process.env.NEXT_PUBLIC_API_GOOGLE
if (!urlGoogle) console.log("Variável de ambiente não identificada")

export const apiGoogle = axios.create({
    baseURL: urlGoogle
})
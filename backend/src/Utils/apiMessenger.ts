import axios from "axios"

const url = process.env.MENSAGERIA
if (!url) console.log("URL de mensageria ausente")
const apiKey = process.env.API_KEY
if (!apiKey) console.log("Chave da api de mensageria ausente")
export const apiEmail = axios.create({
    baseURL: url
})

apiEmail.interceptors.request.use(
    async (config) => {
        if (apiKey) {
            config.headers = config.headers ?? {}
            config.headers['key'] = apiKey
        } else console.log("enviroment variable AKI_KEY missing")
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
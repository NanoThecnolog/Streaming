import axios from "axios"

const url = process.env.NEXT_PUBLIC_MENSAGERIA
const apiKey = process.env.NEXT_PUBLIC_API_KEY
if (!url) console.log('Url não definida')

console.log('url', url)
export const apiEmail = axios.create({
    baseURL: url
})

apiEmail.interceptors.request.use(
    async (config) => {
        if (apiKey) {
            config.headers = config.headers ?? {}
            config.headers['key'] = apiKey
        } else console.log("enviroment variable API_KEY missing")
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
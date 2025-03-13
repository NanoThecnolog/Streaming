import { debuglog } from "@/utils/UtilitiesFunctions";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SUBMANAGER_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
if (!url) console.log('Url não definida')

debuglog('url', url)
export const apiSub = axios.create({
    baseURL: url
})

apiSub.interceptors.request.use(
    async (config) => {
        if (apiKey) {
            config.headers = config.headers ?? {}
            config.headers['key'] = apiKey
        } else console.log("enviroment variable API_KEY missing")
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
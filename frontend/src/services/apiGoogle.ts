import { debug } from "@/classes/DebugLogger"
import axios from "axios"


const urlGoogle = process.env.NEXT_PUBLIC_API_GOOGLE
if (!urlGoogle) debug.error("Variável de ambiente não identificada")

export const apiGoogle = axios.create({
    baseURL: urlGoogle
})
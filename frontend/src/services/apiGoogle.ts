import { debug } from "@/classes/DebugLogger"
import axios from "axios"


const urlGoogle = process.env.NEXT_PUBLIC_API_GOOGLE
if (!urlGoogle) debug.error("url do Google não identificada")

export const apiGoogle = axios.create({
    baseURL: urlGoogle
})
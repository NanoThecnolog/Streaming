import axios from "axios";

export const donate = axios.create({
    baseURL: "http://localhost:3333"
})
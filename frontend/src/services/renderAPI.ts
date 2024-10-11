import axios from "axios";

const url = 'https://api.render.com/v1/services'
const apiKEY = 'rnd_I5ziqi07lH5sqga5EpNJVJUMbW3k'
export const renderAPI = axios.create({
    baseURL: url,
    headers: {
        authorization: `Bearer ${apiKEY}`
    }
})
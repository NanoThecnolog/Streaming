import axios from "axios";

const backendRender = "https://streaming-lj2o.onrender.com"
const backendDev = "http://localhost:3333"
//criar uma variável de ambiente para que o controle da url baseado no ambiente seja feito de forma automática
const url = process.env.NEXT_PUBLIC_RENDER;
if (!url) console.log("variável de ambiente não configurada.")

export const donate = axios.create({
    baseURL: url
})





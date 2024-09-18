import axios from "axios";



const backendRender = "https://streaming-lj2o.onrender.com"
const backendDev = "http://localhost:3333"

export const donate = axios.create({
    baseURL: `${backendRender}`
})





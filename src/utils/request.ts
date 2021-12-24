import axios from "axios";

const service = axios.create({
    baseURL: 'http://1.117.28.50:3000',
    timeout: 5000
})

axios.interceptors.request.use(
    (config) => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        let res = response.data
        return res
    },
    error => {
        console.log("err:",error)
    }
)

export default service
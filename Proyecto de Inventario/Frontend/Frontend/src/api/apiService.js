import axios from 'axios'
import {ACCESS_TOKEN} from './constantes'
import {REFRESH_TOKEN} from './constantes'


const apiServices = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})


apiServices.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default apiServices
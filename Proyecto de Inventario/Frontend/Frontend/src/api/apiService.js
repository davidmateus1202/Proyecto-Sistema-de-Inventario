import axios from 'axios'
import {ACCESS_TOKEN} from './constantes'
import {REFRESH_TOKEN} from './constantes'
import { useNavigate } from 'react-router-dom'

export const logout = (navigate) => {
    navigate('/logout'); // Redirige al login
};

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

apiServices.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            if (refreshToken) {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/user/token/refresh/', {
                        refresh: refreshToken,
                    });

                    const { access } = response.data;
                    localStorage.setItem(ACCESS_TOKEN, access);
                    apiServices.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;
                    return apiServices(originalRequest);
                } catch (refreshError) {
                    logout(useNavigate());
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiServices
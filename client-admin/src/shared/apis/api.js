import axios from 'axios';
import { useAuthStore } from '../../features/auth/store/authStore.js';

//Crear instancias de axios para cada servicio
const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosAdmin = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosAdmin.interceptors.request.use((config) => {
    config._axiosClient = 'admin';//Agregar identidad a este incercepto para saber a que servicios se le esta haciendo la peticion
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export { axiosAuth, axiosAdmin };
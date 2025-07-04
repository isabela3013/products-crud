import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7179/api',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // o desde Redux
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
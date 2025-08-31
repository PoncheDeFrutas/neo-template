import axios from 'axios';

const baseURL = import.meta.env?.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || '';

const api = axios.create({ baseURL });

api.interceptors.request.use(
    (config) => {
        const token = globalThis.localStorage?.getItem('token');
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // handle unauthorized access if needed
        }
        return Promise.reject(error);
    },
);

export default api;

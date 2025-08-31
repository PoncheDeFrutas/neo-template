import axios from 'axios';
import { config } from 'node_modules/zod/v4/core/core';

const baseURL = import.meta.env.VITE_API_BASE_URL || process.env.API_BASE_URL || '';

const api = axios.create({ baseURL });

api.interceptors.request.use(
    (config) => {
        const token = globalThis.localStorage?.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
            } else if (status === 404) {
            }
            return Promise.reject(error);
        }
    }
);
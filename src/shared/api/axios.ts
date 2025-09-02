/**
 * Configured Axios instance for making API requests with automatic authentication.
 *
 * This module exports a pre-configured Axios instance that:
 * - Uses the base URL from environment variables (VITE_API_BASE_URL)
 * - Automatically attaches Bearer tokens from the auth store to requests
 * - Handles 401/403 responses and clears session on token expiration
 * - Provides consistent HTTP client configuration across the application
 *
 * @example
 * ```typescript
 * import api from './axios';
 *
 * // GET request
 * const response = await api.get('/users');
 *
 * // POST request
 * const newUser = await api.post('/users', { name: 'John' });
 * ```
 *
 * @module axios
 * @since 1.0.0
 */
import { useAuthStore } from '@features/auth/model/store';
import { env } from '@shared/config/env';
import axios from 'axios';

const baseURL = env.VITE_API_BASE_URL;

/**
 * Axios instance configured with the base URL for API requests.
 * This instance can be used throughout the application to make HTTP requests
 * with consistent configuration and base URL settings.
 */
const api = axios.create({ baseURL });

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
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
        const status = error.response?.status;
        if (status && (status === 401 || status === 403)) {
            const { logout } = useAuthStore.getState();
            logout();
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    },
);

export default api;

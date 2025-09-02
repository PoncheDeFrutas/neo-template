/**
 * Configured Axios instance for making API requests with automatic authentication.
 *
 * This module exports a pre-configured Axios instance that:
 * - Uses the base URL from environment variables (VITE_API_BASE_URL)
 * - Automatically attaches Bearer tokens from localStorage to requests
 * - Handles 401 unauthorized responses
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
import axios from 'axios';

const baseURL = import.meta.env?.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || '';

/**
 * Axios instance configured with the base URL for API requests.
 * This instance can be used throughout the application to make HTTP requests
 * with consistent configuration and base URL settings.
 */
const api = axios.create({ baseURL });

api.interceptors.request.use(
    (config) => {
        /**
         * Retrieves the authentication token from the browser's localStorage.
         * Uses optional chaining to safely access localStorage in environments where it may not be available.
         *
         * @returns The stored token string if found, null if not found, or undefined if localStorage is unavailable
         */
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

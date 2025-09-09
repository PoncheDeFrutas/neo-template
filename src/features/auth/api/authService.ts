import api from '@shared/api/axios';

/**
 * Represents the credentials required for user authentication.
 *
 * @interface LoginCredentials
 * @property {string} email - The user's email address used for login
 * @property {string} password - The user's password for authentication
 */
interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Response object returned after a successful login attempt.
 *
 * @interface LoginResponse
 * @property {string} token - JWT authentication token used for subsequent API requests
 */
interface LoginResponse {
    token: string;
}

export const AuthService = {
    async login(credentials: LoginCredentials) {
        const { data } = await api.post<LoginResponse>('/auth/login', credentials);
        return data;
    },

    // Optional endpoints if backend supports them; unused by UI store
    async logout() {
        await api.post('/logout');
    },

    async refresh() {
        const { data } = await api.post<LoginResponse>('/refresh');
        return data;
    },
};

export default AuthService;

import api from '@shared/api/axios';

interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const AuthService = {
    async login(credentials: LoginCredentials) {
        const { data } = await api.post<LoginResponse>('/auth/login', credentials);
        return data;
    },

    async logout() {
        await api.post('/auth/logout');
    },

    async refresh() {
        const { data } = await api.post<LoginResponse>('/auth/refresh');
        return data;
    },
};

export default AuthService;
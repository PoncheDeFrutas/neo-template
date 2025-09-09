import api from '@/shared/api/axios';

export type RegisterResponse = {
    msg: string;
};

export type RegisterPayload = {
    email: string;
    password: string;
    roleId: number;
    userBody: Record<string, unknown>;
};

export const RegisterService = {
    async register(payload: RegisterPayload) {
        const { data } = await api.post<RegisterResponse>('/auth/register', payload);
        return data;
    },
};

export default RegisterService;

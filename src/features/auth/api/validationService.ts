import api from '@/shared/api/axios';

export type ValidatePayload = {
    email: string;
    code: string;
};

export type ResendPayload = {
    email: string;
};

export const ValidationService = {
    async validate(payload: ValidatePayload) {
        const { data } = await api.post('/auth/validate', payload);
        return data as unknown;
    },
    async resend(payload: ResendPayload) {
        const { data } = await api.post('/auth/resend-validation', payload);
        return data as unknown;
    },
};

export default ValidationService;

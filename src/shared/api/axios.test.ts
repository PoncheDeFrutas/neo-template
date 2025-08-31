import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const loadApi = async () => {
    const { default: api } = await import('@shared/api/axios');
    return api;
};

describe('api instance', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        delete process.env.VITE_API_BASE_URL;
    });

    it('uses baseURL from environment', async () => {
        process.env.VITE_API_BASE_URL = 'https://api.example.com';
        const api = await loadApi();
        expect(api.defaults.baseURL).toBe('https://api.example.com');
    });

    it('attaches Authorization header when token exists', async () => {
        process.env.VITE_API_BASE_URL = 'https://api.example.com';
        const getItem = vi.fn(() => 'token123');
        vi.stubGlobal('localStorage', { getItem });
        const api = await loadApi();
        const config = await api.interceptors.request.handlers[0].fulfilled({ headers: {} });
        expect(config.headers.Authorization).toBe('Bearer token123');
        expect(getItem).toHaveBeenCalledWith('token');
    });

    it('propagates response errors', async () => {
        process.env.VITE_API_BASE_URL = 'https://api.example.com';
        const api = await loadApi();
        const error = new Error('network');
        await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    });
});
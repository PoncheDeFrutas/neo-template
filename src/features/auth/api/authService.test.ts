import api from '@shared/api/axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from './authService';

vi.mock('@shared/api/axios', () => ({
    default: { post: vi.fn() },
}));

const mockedPost = vi.mocked(api.post);

afterEach(() => {
    vi.clearAllMocks();
});

describe('AuthService', () => {
    it('logs in and returns token on success', async () => {
        mockedPost.mockResolvedValueOnce({ data: { token: 'valid-token' } });
        const result = await AuthService.login({ email: 'admin@gmail.com', password: '123' });
        expect(mockedPost).toHaveBeenCalledWith('/login', {
            email: 'admin@gmail.com',
            password: '123',
        });
        expect(result.token).toBe('valid-token');
    });

    it('throws when login fails (expired token)', async () => {
        mockedPost.mockRejectedValueOnce(new Error('401'));
        await expect(
            AuthService.login({ email: 'admin@gmail.com', password: 'wrong' }),
        ).rejects.toThrow('401');
    });

    it('logs out correctly', async () => {
        mockedPost.mockResolvedValueOnce({ data: {} });
        await AuthService.logout();
        expect(mockedPost).toHaveBeenCalledWith('/logout');
    });

    it('throws when logout fails due to expired token', async () => {
        mockedPost.mockRejectedValueOnce(new Error('401'));
        await expect(AuthService.logout()).rejects.toThrow('401');
    });
});

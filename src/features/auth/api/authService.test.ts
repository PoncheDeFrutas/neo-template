import { describe, it, expect, vi, afterEach } from 'vitest';
import { AuthService } from './authService';
import api from '@shared/api/axios';

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
        const result = await AuthService.login({ username: 'user', password: 'pass' });
        expect(mockedPost).toHaveBeenCalledWith('/auth/login', {
            username: 'user',
            password: 'pass',
        });
        expect(result.token).toBe('valid-token');
    });

    it('throws when login fails (expired token)', async () => {
        mockedPost.mockRejectedValueOnce(new Error('401'));
        await expect(AuthService.login({ username: 'user', password: 'pass' })).rejects.toThrow(
            '401',
        );
    });

    it('logs out correctly', async () => {
        mockedPost.mockResolvedValueOnce({ data: {} });
        await AuthService.logout();
        expect(mockedPost).toHaveBeenCalledWith('/auth/logout');
    });

    it('throws when logout fails due to expired token', async () => {
        mockedPost.mockRejectedValueOnce(new Error('401'));
        await expect(AuthService.logout()).rejects.toThrow('401');
    });
});

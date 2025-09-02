import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from './store';

const createToken = (expOffsetSeconds: number) => {
    const payload = { exp: Math.floor(Date.now() / 1000) + expOffsetSeconds };
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    return `${header}.${body}.signature`;
};

beforeEach(() => {
    useAuthStore.setState({ token: null, user: null, roles: [], isAuthenticated: false });
    globalThis.localStorage.clear();
});

describe('useAuthStore', () => {
    it('logs in with valid token and logs out after expiration', () => {
        vi.useFakeTimers();
        const token = createToken(1);
        const { login } = useAuthStore.getState();
        login(token);
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
        expect(globalThis.localStorage.getItem('token')).toBe(token);

        vi.advanceTimersByTime(1000);
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
        vi.useRealTimers();
    });

    it('logout clears token', () => {
        const token = createToken(60);
        const { login, logout } = useAuthStore.getState();
        login(token);
        logout();
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
        expect(globalThis.localStorage.getItem('token')).toBeNull();
    });
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import { vi, type Mock } from 'vitest';

vi.mock('@features/auth/model/store', () => ({
    useAuthStore: vi.fn(),
}));

import { useAuthStore } from '@features/auth/model/store';
const mockedUseAuthStore = useAuthStore as unknown as Mock;

const createToken = (payload: Record<string, unknown>) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    return `${header}.${body}.signature`;
};

const renderWithRoutes = () =>
    render(
        <MemoryRouter initialEntries={['/secret']}>
            <Routes>
                <Route element={<ProtectedRoute requiredRoles={['admin']} />}>
                    <Route path="/secret" element={<div>Secret</div>} />
                </Route>
                <Route path="/" element={<div>Public</div>} />
            </Routes>
        </MemoryRouter>,
    );

describe('ProtectedRoute', () => {
    afterEach(() => {
        vi.clearAllMocks();
        globalThis.localStorage.clear();
    });

    it('renders children when token is valid and role allowed', () => {
        const token = createToken({ exp: Math.floor(Date.now() / 1000) + 60, roles: ['admin'] });
        mockedUseAuthStore.mockImplementation((selector: any) =>
            selector({ token, logout: vi.fn() }),
        );
        globalThis.localStorage.setItem('token', token);
        renderWithRoutes();
        expect(screen.getByText('Secret')).toBeInTheDocument();
    });

    it('redirects when token is expired', () => {
        const token = createToken({ exp: Math.floor(Date.now() / 1000) - 60, roles: ['admin'] });
        const logout = vi.fn();
        mockedUseAuthStore.mockImplementation((selector: any) => selector({ token: null, logout }));
        globalThis.localStorage.setItem('token', token);
        renderWithRoutes();
        expect(screen.getByText('Public')).toBeInTheDocument();
        expect(logout).toHaveBeenCalled();
    });

    it('redirects when role is not allowed', () => {
        const token = createToken({ exp: Math.floor(Date.now() / 1000) + 60, roles: ['user'] });
        mockedUseAuthStore.mockImplementation((selector: any) =>
            selector({ token, logout: vi.fn() }),
        );
        globalThis.localStorage.setItem('token', token);
        renderWithRoutes();
        expect(screen.getByText('Public')).toBeInTheDocument();
    });
});

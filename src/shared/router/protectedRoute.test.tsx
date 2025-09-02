import { useAuth } from '@features/auth';
import { useAuthStore } from '@features/auth/model/store';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { type Mock, vi } from 'vitest';

import ProtectedRoute from './protectedRoute';

vi.mock('@features/auth/model/store', () => ({
    useAuthStore: vi.fn(),
}));

vi.mock('@features/auth', () => ({
    useAuth: vi.fn(),
}));

const mockedUseAuthStore = useAuthStore as unknown as Mock;
const mockedUseAuth = useAuth as unknown as Mock;

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
    });

    it('renders children when authenticated and role allowed', () => {
        const logout = vi.fn();
        mockedUseAuthStore.mockImplementation(
            (selector: (state: { logout: () => void }) => unknown) => selector({ logout }),
        );
        mockedUseAuth.mockReturnValue({
            user: { exp: Math.floor(Date.now() / 1000) + 60 },
            roles: ['admin'],
            isAuthenticated: true,
        });
        renderWithRoutes();
        expect(screen.getByText('Secret')).toBeInTheDocument();
    });

    it('redirects when token is expired', () => {
        const logout = vi.fn();
        mockedUseAuthStore.mockImplementation(
            (selector: (state: { logout: () => void }) => unknown) => selector({ logout }),
        );
        mockedUseAuth.mockReturnValue({
            user: { exp: Math.floor(Date.now() / 1000) - 60 },
            roles: ['admin'],
            isAuthenticated: true,
        });
        renderWithRoutes();
        expect(screen.getByText('Public')).toBeInTheDocument();
        expect(logout).toHaveBeenCalled();
    });

    it('redirects when role is not allowed', () => {
        mockedUseAuthStore.mockImplementation(
            (selector: (state: { logout: () => void }) => unknown) => selector({ logout: vi.fn() }),
        );
        mockedUseAuth.mockReturnValue({
            user: { exp: Math.floor(Date.now() / 1000) + 60 },
            roles: ['user'],
            isAuthenticated: true,
        });
        renderWithRoutes();
        expect(screen.getByText('Public')).toBeInTheDocument();
    });
});
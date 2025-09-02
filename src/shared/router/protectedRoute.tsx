import { useAuthStore } from '@features/auth/model/store';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface DecodedToken extends JwtPayload {
    roles?: string[];
    [key: string]: unknown;
}

interface ProtectedRouteProps {
    requiredRoles: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRoles }) => {
    const { token: storeToken, logout } = useAuthStore((state) => ({
        token: state.token,
        logout: state.logout,
    }));

    const token = storeToken ?? globalThis.localStorage?.getItem('token');
    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            logout();
            return <Navigate to="/" replace />;
        }

        const roles = decoded.roles ?? [];
        const hasRole =
            requiredRoles.length === 0 || roles.some((role) => requiredRoles.includes(role));

        if (!hasRole) {
            return <Navigate to="/" replace />;
        }
    } catch {
        logout();
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

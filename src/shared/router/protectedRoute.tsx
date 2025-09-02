import { useAuth } from '@features/auth';
import { useAuthStore } from '@features/auth/model/store';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
interface ProtectedRouteProps {
    requiredRoles: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRoles }) => {
    const logout = useAuthStore((state) => state.logout);
    const { user, roles, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    
    if (user?.exp && user.exp * 1000 < Date.now()) {
        logout();
        return <Navigate to="/" replace />;
    }

    const hasRole =
        requiredRoles.length === 0 || roles.some((role) => requiredRoles.includes(role));

    if (!hasRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
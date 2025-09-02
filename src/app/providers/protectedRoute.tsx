import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    role: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ role }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
        if (payload.role !== role) {
            return <Navigate to="/" replace />;
        }
    } catch {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
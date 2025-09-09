import { useAuth } from '@features/auth';
import { useAuthStore } from '@features/auth/model/store';
import { useEffect, type FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
    requiredRoles: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRoles }) => {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const { user, roles, isAuthenticated } = useAuth();

    const isExpired = Boolean(user?.exp && user.exp * 1000 < Date.now());
    useEffect(() => {
        // Avoid calling store updates during render
        if (isExpired) logout();
    }, [isExpired, logout]);

    const hasRole =
        requiredRoles.length === 0 || roles.some((role) => requiredRoles.includes(role));

    const shouldRedirect = !isAuthenticated || isExpired || !hasRole;
    const redirectTo = '/';
    if (shouldRedirect && location.pathname !== redirectTo) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    }
    if (shouldRedirect) {
        // Already at public route. Render nothing to avoid loops.
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoute;

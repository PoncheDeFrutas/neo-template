import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Navbar, Button } from '@/shared/ui';
import { ThemeToggle } from '@/features/theme-toggle';
import { useAuth } from '@/features/auth';
import { useAuthStore } from '@/features/auth/model/store';

/**
 * Default header component for the application.
 *
 * Renders a navigation bar with brand name, navigation items, and authentication controls.
 * The component adapts based on user authentication status, showing either login or logout options.
 *
 * @returns The default header JSX element containing:
 * - Brand name "AYDS1"
 * - Navigation items (Inicio, UI, About) with active state highlighting
 * - Theme toggle component
 * - Authentication button (Login/Logout based on auth status)
 *
 * @example
 * ```tsx
 * <DefaultHeader />
 * ```
 */
const DefaultHeader: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const logout = useAuthStore((s) => s.logout);

    const navItems = useMemo(
        () => [
            { label: 'Inicio', onClick: () => navigate('/'), active: location.pathname === '/' },
            {
                label: 'UI',
                onClick: () => navigate('/ui'),
                active: location.pathname.startsWith('/ui'),
            },
            {
                label: 'About',
                onClick: () => navigate('/about'),
                active: location.pathname.startsWith('/about'),
            },
        ],
        [location.pathname, navigate],
    );

    return (
        <Navbar
            brand={<span>AYDS1</span>}
            items={navItems}
            rightSlot={
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <Button variant="outline" onClick={logout}>
                            Salir
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={() => navigate('/login')}>
                            Ingresar
                        </Button>
                    )}
                </div>
            }
            enableDrawer={false}
        />
    );
};

export default DefaultHeader;

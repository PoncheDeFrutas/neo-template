import type { FC } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from '@/shared/ui';

/**
 * AdminLayout component that provides the main layout structure for admin pages.
 *
 * This component serves as a wrapper for admin routes, providing:
 * - Minimum full-screen height container
 * - Scroll position restoration between route changes
 * - Route outlet for nested admin components
 *
 * The component uses React Router's location key to ensure proper re-rendering
 * when navigating between different admin routes.
 *
 * @returns JSX element containing the admin layout structure
 */
const AdminLayout: FC = () => {
    const location = useLocation();
    return (
        <div className="min-h-screen">
            <ScrollRestoration />
            <div key={location.key}>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default AdminLayout;

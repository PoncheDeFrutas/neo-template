import type { FC } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from '@/shared/ui';

/**
 * Client layout component that provides a base layout structure for client-side pages.
 *
 * This component serves as a wrapper layout that:
 * - Ensures minimum full screen height
 * - Restores scroll position when navigating between pages
 * - Provides a unique key based on location for proper React reconciliation
 * - Renders child routes through the Outlet component
 *
 * @returns The client layout JSX element containing scroll restoration and outlet for nested routes
 */
const ClientLayout: FC = () => {
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

export default ClientLayout;

import type { FC } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from '@/shared/ui';
import DefaultHeader from './components/defaultHeader';
import DefaultFooter from './components/defaultFooter';

/**
 * Default layout component that provides the main structure for pages.
 *
 * This component renders a full-height layout with header, main content area, and footer.
 * It includes scroll restoration functionality and lazy loading support for nested routes.
 *
 * @returns The default layout structure with header, outlet for nested routes, and footer
 *
 * @example
 * ```tsx
 * // Used in React Router configuration
 * <Route path="/" element={<DefaultLayout />}>
 *   <Route index element={<HomePage />} />
 *   <Route path="about" element={<AboutPage />} />
 * </Route>
 * ```
 */
const DefaultLayout: FC = () => {
    const location = useLocation();
    return (
        <div className="min-h-screen public-bg flex flex-col">
            <ScrollRestoration />
            <DefaultHeader />
            <div className="flex-1" key={location.key}>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </div>
            <DefaultFooter />
        </div>
    );
};

export default DefaultLayout;

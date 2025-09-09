import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from '@/routes/admin';
import clientRoutes from '@/routes/client';
import defaultRoutes from '@/routes/default';

const NotFoundPage = lazy(() => import('@pages/not-found'));

/**
 * Application router configuration using React Router's createBrowserRouter.
 *
 * Combines multiple route configurations including default routes, client-specific routes,
 * and admin routes. Includes a catch-all route (*) that renders a NotFoundPage component
 * wrapped in Suspense with a loading fallback for unmatched paths.
 *
 * @remarks
 * The router uses browser history API for navigation and includes lazy loading
 * support through React Suspense for the 404 page.
 */
const router = createBrowserRouter([
    ...defaultRoutes,
    ...clientRoutes,
    ...adminRoutes,
    {
        path: '*',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <NotFoundPage />
            </Suspense>
        ),
    },
]);

export default router;

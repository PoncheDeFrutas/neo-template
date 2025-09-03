import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from '@/routes/admin';
import clientRoutes from '@/routes/client';
import HomePage from '@/pages/home';

const NotFoundPage = lazy(() => import('@pages/not-found'));
const UIShowcasePage = lazy(() => import('@pages/ui'));

const router = createBrowserRouter([
    ...clientRoutes,
    ...adminRoutes,
    {
        path: '/',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
            </Suspense>
        )
    },
    {
        path: '/ui',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <UIShowcasePage />
            </Suspense>
        ),
    },
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

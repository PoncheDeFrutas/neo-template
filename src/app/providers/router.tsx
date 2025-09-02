import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from '@/routes/admin';
import clientRoutes from '@/routes/client';

const NotFoundPage = lazy(() => import('@pages/not-found'));

const router = createBrowserRouter([
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

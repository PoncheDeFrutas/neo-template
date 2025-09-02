import AdminLayout from '@app/layouts/adminLayout';
import ProtectedRoute from '@app/providers/protectedRoute';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const AboutPage = lazy(() => import('@pages/about'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

const adminRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute role="admin" />,
        children: [
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AboutPage />
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
                ],
            },
        ],
    },
];

export default adminRoutes;
import AdminLayout from '@app/layouts/adminLayout';
import ProtectedRoute from '@/shared/router/protectedRoute';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const AboutPage = lazy(() => import('@pages/about'));

const adminRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute requiredRoles={['admin']} />,
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
                ],
            },
        ],
    },
];

export default adminRoutes;

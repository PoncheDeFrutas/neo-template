import ClientLayout from '@app/layouts/clientLayout';
import ProtectedRoute from '@/shared/router/protectedRoute';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const AboutPage = lazy(() => import('@pages/about'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

const clientRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute requiredRoles={['client']} />,
        children: [
            {
                path: '/',
                element: <ClientLayout />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <HomePage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'about',
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

export default clientRoutes;

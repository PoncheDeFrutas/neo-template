import ClientLayout from '@app/layouts/clientLayout';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const AboutPage = lazy(() => import('@pages/about'));

const clientRoutes: RouteObject[] = [
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
        ],
    },
];

export default clientRoutes;

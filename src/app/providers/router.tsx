import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const AboutPage = lazy(() => import('@pages/about'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
            </Suspense>
        ),
    },
    {
        path: '/about',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <AboutPage />
            </Suspense>
        ),
    },
]);

export default router;

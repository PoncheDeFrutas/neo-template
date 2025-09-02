import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const AboutPage = lazy(() => import('@pages/about'));

/**
 * Application router configuration using React Router.
 *
 * Defines the main routing structure for the application with lazy-loaded pages
 * wrapped in Suspense boundaries for better performance and user experience.
 *
 * @remarks
 * - Each route is wrapped with Suspense to handle loading states during code splitting
 * - Uses createBrowserRouter for modern routing with data APIs support
 *
 * Routes:
 * - `/` - Home page route
 * - `/about` - About page route
 */
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

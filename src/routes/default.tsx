import DefaultLayout from '@app/layouts/defaultLayout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const AboutPage = lazy(() => import('@pages/about'));
const UiPage = lazy(() => import('@pages/ui'));
const LoginPage = lazy(() => import('@pages/login'));
const RegisterPage = lazy(() => import('@pages/registers'));

const defaultRoutes: RouteObject[] = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'ui',
                element: <UiPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
];

export default defaultRoutes;

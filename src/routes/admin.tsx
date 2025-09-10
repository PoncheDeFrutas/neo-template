import AdminLayout from '@app/layouts/adminLayout';
import ProtectedRoute from '@/shared/router/protectedRoute';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ComingSoonPage from '@/pages/coming-soon';

const AdminWelcomePage = lazy(() => import('@pages/admin/welcome'));

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
                        element: <AdminWelcomePage />,
                    },
                    {
                        path: 'dashboard',
                        element: <ComingSoonPage
                            title="Panel General"
                            description="Visión general del sistema y métricas clave."
                        />,
                    },
                    {
                        path: 'users',
                        element: <ComingSoonPage
                            title="Gestión de Usuarios"
                            description="Administra los usuarios del sistema."
                        />,
                    },
                    {
                        path: 'shops',
                        element: <ComingSoonPage
                            title="Gestión de Tiendas"
                            description="Administra las tiendas registradas en la plataforma."
                        />,
                    },
                    {
                        path: 'delivery-persons',
                        element: <ComingSoonPage
                            title="Gestión de Repartidores"
                            description="Administra los repartidores y sus asignaciones."
                        />,
                    },
                    {
                        path: 'roles',
                        element: <ComingSoonPage
                            title="Roles y Permisos"
                            description="Define y asigna roles y permisos a los usuarios."
                        />,
                    },
                    {
                        path: 'settings',
                        element: <ComingSoonPage
                            title="Configuración del Sistema"
                            description="Ajusta las configuraciones globales de la plataforma."
                        />,
                    }
                ],
            },
        ],
    },
];


export default adminRoutes;

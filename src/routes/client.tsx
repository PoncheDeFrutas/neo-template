import ComingSoonPage from '@pages/coming-soon';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import ClientLayout from '@/app/layouts/clientLayout';
import ProtectedRoute from '@/shared/router/protectedRoute';

const ClientWelcomePage = lazy(() => import('@pages/client/welcome'));

// Client dashboard routes (protected by role "client").
// Only the welcome page is implemented. Other pages are referenced with a placeholder.
const clientRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute requiredRoles={['client']} />,
        children: [
            {
                path: '/client',
                element: <ClientLayout />,
                children: [
                    {
                        index: true,
                        element: <ClientWelcomePage />,
                    },
                    {
                        path: 'tiendas',
                        element: (
                            <ComingSoonPage
                                title="Catálogo de tiendas"
                                description="Explora y descubre tiendas disponibles."
                            />
                        ),
                    },
                    {
                        path: 'tienda/:id',
                        element: (
                            <ComingSoonPage
                                title="Perfil de la tienda"
                                description="Información detallada de la tienda seleccionada."
                            />
                        ),
                    },
                    {
                        path: 'carrito',
                        element: (
                            <ComingSoonPage
                                title="Carrito"
                                description="Revisa y gestiona tus productos antes de comprar."
                            />
                        ),
                    },
                    {
                        path: 'checkout',
                        element: (
                            <ComingSoonPage
                                title="Checkout"
                                description="Finaliza tu compra de forma segura."
                            />
                        ),
                    },
                    {
                        path: 'seguimiento',
                        element: (
                            <ComingSoonPage
                                title="Seguimiento del pedido"
                                description="Consulta el estado y progreso de tu pedido."
                            />
                        ),
                    },
                    {
                        path: 'historial',
                        element: (
                            <ComingSoonPage
                                title="Historial de compras"
                                description="Revisa tus pedidos anteriores y sus detalles."
                            />
                        ),
                    },
                    {
                        path: 'perfil',
                        element: (
                            <ComingSoonPage
                                title="Perfil"
                                description="Gestiona tu información personal y preferencias."
                            />
                        ),
                    },
                    {
                        path: 'ajustes',
                        element: (
                            <ComingSoonPage
                                title="Ajustes"
                                description="Configura las preferencias de tu cuenta."
                            />
                        ),
                    },
                ],
            },
        ],
    },
];

export default clientRoutes;

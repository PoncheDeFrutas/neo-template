import {
    CreditCard,
    History,
    Layers3,
    Settings,
    ShoppingCart,
    Store,
    Truck,
    User,
} from 'lucide-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { Button, Card } from '@/shared/ui';

type Action = {
    label: string;
    description: string;
    to: string;
    icon: FC<{ size?: number }>;
};

const ClientWelcomePage: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const actions = useMemo<Action[]>(
        () => [
            {
                label: 'Catálogo de tiendas',
                description: 'Explora y descubre tiendas disponibles',
                to: '/client/tiendas',
                icon: Layers3,
            },
            {
                label: 'Perfil de la tienda',
                description: 'Consulta una tienda específica',
                to: '/client/tienda/1',
                icon: Store,
            },
            {
                label: 'Carrito',
                description: 'Revisa tus productos',
                to: '/client/carrito',
                icon: ShoppingCart,
            },
            {
                label: 'Checkout',
                description: 'Finaliza tu compra',
                to: '/client/checkout',
                icon: CreditCard,
            },
            {
                label: 'Seguimiento del pedido',
                description: 'Monitorea el estado del pedido',
                to: '/client/seguimiento',
                icon: Truck,
            },
            {
                label: 'Historial de compras',
                description: 'Consulta tus pedidos anteriores',
                to: '/client/historial',
                icon: History,
            },
            {
                label: 'Perfil',
                description: 'Gestiona tu información personal',
                to: '/client/perfil',
                icon: User,
            },
            {
                label: 'Ajustes',
                description: 'Configura tus preferencias',
                to: '/client/ajustes',
                icon: Settings,
            },
        ],
        [],
    );

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
            <section className="mb-6">
                <h1 className="text-2xl font-semibold text-text">
                    Bienvenido{user?.email ? `, ${user.email}` : ''}
                </h1>
                <p className="mt-1 text-muted-foreground">
                    Este es tu panel de cliente. Desde aquí podrás acceder a las secciones
                    principales. Por ahora, solo la bienvenida está implementada; el resto está
                    referenciado.
                </p>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {actions.map(({ label, description, to, icon: Icon }) => (
                    <Card
                        key={to}
                        hoverable
                        clickable
                        onClick={() => navigate(to)}
                        className="flex items-center gap-3"
                        padding="md"
                        variant="elevated"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Icon size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-text">{label}</div>
                            <div className="text-xs text-muted-foreground">{description}</div>
                        </div>
                        <Button variant="outline" onClick={() => navigate(to)}>
                            Abrir
                        </Button>
                    </Card>
                ))}
            </section>
        </main>
    );
};

export default ClientWelcomePage;

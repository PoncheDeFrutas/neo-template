import { BarChart, Settings, ShieldCheck, User, Users } from 'lucide-react';
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

const AdminWelcomePage: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const actions = useMemo<Action[]>(
        () => [
            {
                label: 'Panel General',
                description: 'Visión general del sistema y métricas clave',
                to: '/admin/dashboard',
                icon: BarChart,
            },
            {
                label: 'Gestión de Usuarios',
                description: 'Administra usuarios, roles y permisos',
                to: '/admin/users',
                icon: Users,
            },
            {
                label: 'Gestion de Tiendas',
                description: 'Administra las tiendas registradas en la plataforma',
                to: '/admin/stores',
                icon: User,
            },
            {
                label: 'Gestion de Repartidores',
                description: 'Administra los repartidores y sus asignaciones',
                to: '/admin/delivery-persons',
                icon: User,
            },
            {
                label: 'Roles y Permisos',
                description: 'Define y asigna roles y permisos a los usuarios',
                to: '/admin/roles',
                icon: ShieldCheck,
            },
            {
                label: 'Configuración del Sistema',
                description: 'Ajusta las configuraciones globales de la plataforma',
                to: '/admin/settings',
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
                    Este es tu panel de Administrador. Desde aquí podrás acceder a las secciones
                    principales para gestionar tu negocio.
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

export default AdminWelcomePage;

import type { FC } from 'react';
import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, EmptyState } from '@/shared/ui';

const DEFAULT_CONTACT = 'admin@example.com';

const PendingVerificationPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { email?: string; role?: string } };
    const [params] = useSearchParams();

    const email = useMemo(
        () => location.state?.email || params.get('email') || '',
        [location.state?.email, params],
    );
    const role = useMemo(
        () => location.state?.role || params.get('role') || 'tu cuenta',
        [location.state?.role, params],
    );

    return (
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
            <Card
                variant="elevated"
                className="w-full max-w-2xl"
                padding="lg"
                title="Verificación pendiente"
                description={`Aún no hemos verificado ${role}.`}
            >
                <EmptyState
                    className="mt-4"
                    title="Tu perfil está en revisión"
                    description={`Tu solicitud está siendo revisada por el equipo. Te notificaremos por correo (${email || 'tu correo'}) cuando esté lista. Si tienes alguna duda, escribe a ${DEFAULT_CONTACT}.`}
                    action={
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate('/')}>
                                Ir al inicio
                            </Button>
                            <Button onClick={() => navigate('/login')}>
                                Volver a iniciar sesión
                            </Button>
                        </div>
                    }
                />
            </Card>
        </main>
    );
};

export default PendingVerificationPage;

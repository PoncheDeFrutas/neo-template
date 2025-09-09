import { lazy, Suspense, useMemo, useState } from 'react';
import { LogIn, Save } from 'lucide-react';
import { Button, Divider, Input, Select, Spinner } from '@/shared/ui';
import type { RoleKey } from '../model/roles';
import { ROLE_KEYS } from '../model/roles';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../hooks/useRegisterForm';

const ClientFields = lazy(() => import('../../../pages/registers/ui/fields/ClientFields'));
const DealerFields = lazy(() => import('../../../pages/registers/ui/fields/DealerFields'));
const StoreFields = lazy(() => import('../../../pages/registers/ui/fields/StoreFields'));
const AdminFields = lazy(() => import('../../../pages/registers/ui/fields/AdminFields'));

type Props = {
    defaultRole?: RoleKey;
    onSuccess?: () => void;
};

export default function RegisterForm({ defaultRole = 'client', onSuccess }: Props) {
    const navigate = useNavigate();
    const [role, setRole] = useState<RoleKey>(defaultRole);
    const { onSubmit, submitting, errors, formError } = useRegisterForm({
        role,
        onSuccess:
            onSuccess ??
            (() => navigate('/login', { replace: true, state: { justRegistered: true } })),
    });

    const RoleFields = useMemo(() => {
        switch (role) {
            case 'client':
                return <ClientFields disabled={submitting} errors={errors} />;
            case 'dealer':
                return <DealerFields disabled={submitting} errors={errors} />;
            case 'shop':
                return <StoreFields disabled={submitting} errors={errors} />;
            default:
                return <AdminFields disabled={submitting} errors={errors} />;
        }
    }, [role, submitting, errors]);

    return (
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <h2 className="text-sm font-medium text-text">Datos base</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                    label="Nombre"
                    name="firstName"
                    placeholder="Ej. Ana"
                    required
                    disabled={submitting}
                    error={errors.firstName}
                />
                <Input
                    label="Apellido"
                    name="lastName"
                    placeholder="Ej. Pérez"
                    required
                    disabled={submitting}
                    error={errors.lastName}
                />
                <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    required
                    disabled={submitting}
                    error={errors.email}
                />
                <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    passwordToggle
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    disabled={submitting}
                    error={errors.password}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="w-full max-w-md mx-auto">
                    <Select
                        label="Rol"
                        name="role"
                        placeholder="Selecciona un rol"
                        value={role}
                        onChange={(e) => setRole(e.currentTarget.value as RoleKey)}
                        options={ROLE_KEYS.map((r) => ({
                            value: r,
                            label: r.charAt(0).toUpperCase() + r.slice(1),
                        }))}
                        required
                        disabled={submitting}
                        error={errors.role}
                    />
                </div>
            </div>

            {formError ? (
                <p className="text-sm text-danger" role="alert">
                    {formError}
                </p>
            ) : null}

            <Divider className="my-6" />

            <Suspense
                fallback={
                    <div className="py-8 flex items-center justify-center">
                        <Spinner />
                    </div>
                }
            >
                {RoleFields}
            </Suspense>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        type="submit"
                        loading={submitting}
                        variant="secondary"
                        leftIcon={<Save size={18} />}
                    >
                        Regístrate
                    </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Button
                        variant="link"
                        rightIcon={<LogIn size={16} />}
                        onClick={() => navigate('/login')}
                    >
                        Iniciar sesión
                    </Button>
                </div>
            </div>
        </form>
    );
}

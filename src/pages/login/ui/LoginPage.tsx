import { Lock, Mail } from 'lucide-react';
import { type FC, type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthService } from '@/features/auth';
import { useAuthStore } from '@/features/auth/model/store';
import { ROLE_ID_BY_KEY } from '@/features/register';
import { Button, Card, Input } from '@/shared/ui';

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as unknown as { state?: { from?: { pathname?: string } } };
    const authLogin = useAuthStore((s) => s.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }
        setSubmitting(true);
        try {
            const { token } = await AuthService.login({ email, password });
            authLogin(token);
            const { roles } = useAuthStore.getState();
            if (roles.includes('admin')) {
                navigate('/admin', { replace: true });
                return;
            }
            if (roles.includes('dealer')) {
                navigate('/dealer', { replace: true });
                return;
            }
            if (roles.includes('shop')) {
                navigate('/shop', { replace: true });
                return;
            }
            if (roles.includes('client')) {
                navigate('/client', { replace: true });
                return;
            }
            const to = location.state?.from?.pathname || '/';
            navigate(to, { replace: true });
        } catch (err: any) {
            const status = err?.response?.status as number | undefined;
            const data = err?.response?.data as
                | {
                      code?: string;
                      reason?: string;
                      message?: string;
                      roleId?: string;
                      pendingApproval?: boolean;
                      error?: string;
                  }
                | undefined;
            if (status === 403) {
                const reason = (data?.reason || data?.code || data?.message || data?.error || '')
                    .toString()
                    .toLowerCase();
                const roleId = (data?.roleId || '').toString().toLowerCase();
                const role = Object.entries(ROLE_ID_BY_KEY).find(
                    ([, id]) => id.toString() === roleId,
                )?.[0];
                const isEmailNotVerified =
                    reason.includes('email') ||
                    reason.includes('valid') ||
                    reason.includes('código') ||
                    data?.code === 'EMAIL_NOT_VERIFIED';
                const isProfilePending =
                    data?.pendingApproval === true ||
                    data?.code === 'PROFILE_NOT_VERIFIED' ||
                    reason.includes('aprob') ||
                    reason.includes('pendiente') ||
                    reason.includes('perfil');

                if (isProfilePending || role === 'dealer' || role === 'shop') {
                    navigate(
                        '/pending-verification?email=' +
                            encodeURIComponent(email) +
                            (role ? `&role=${encodeURIComponent(role)}` : ''),
                        {
                            replace: true,
                            state: { email, role },
                        },
                    );
                    return;
                }
                if (!isProfilePending && isEmailNotVerified) {
                    navigate('/validate?email=' + encodeURIComponent(email), {
                        replace: true,
                        state: { email },
                    });
                    return;
                }
            }
            setError('Credenciales inválidas o error de servidor.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
            <Card
                variant="elevated"
                className="w-full max-w-md"
                padding="lg"
                title="Ingresar"
                description="Accede con tu correo y contraseña"
            >
                <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
                    <Input
                        type="email"
                        name="email"
                        label="Correo electrónico"
                        placeholder="tu@correo.com"
                        leftIcon={<Mail size={16} />}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Contraseña"
                        placeholder="••••••••"
                        leftIcon={<Lock size={16} />}
                        required
                        passwordToggle
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error ? (
                        <p className="text-sm text-danger" role="alert">
                            {error}
                        </p>
                    ) : null}

                    <Button type="submit" fullWidth loading={submitting}>
                        Ingresar
                    </Button>
                </form>
                <div className="mt-3 flex items-center justify-center">
                    <Button type="button" variant="link" onClick={() => navigate('/register')}>
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </div>
            </Card>
        </main>
    );
};

export default LoginPage;

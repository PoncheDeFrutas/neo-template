import { useState, type FC, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

import { Button, Card, Input } from '@/shared/ui';
import { AuthService } from '@/features/auth';
import { useAuthStore } from '@/features/auth/model/store';

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
            // Backend espera "email" y "password"
            const { token } = await AuthService.login({ email, password });
            authLogin(token);
            const to = location.state?.from?.pathname || '/';
            navigate(to, { replace: true });
        } catch (err) {
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

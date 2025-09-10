import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Input, showToast } from '@/shared/ui';
import CodeInput from '@/shared/ui/CodeInput';
import { ValidationService } from '@/features/auth/api/validationService';
import { showErrorToast } from '@/shared/ui/Toast';
import { useAuthStore } from '@/features/auth/model/store';

export default function ValidatePage() {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { email?: string } };
    const [params] = useSearchParams();
    const initialEmail = useMemo(() => {
        return (
            location.state?.email ||
            params.get('email') ||
            (typeof window !== 'undefined' ? sessionStorage.getItem('validationEmail') || '' : '')
        );
    }, [location.state, params]);

    const [email, setEmail] = useState<string>(initialEmail);
    const [code, setCode] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);

    useEffect(() => {
        // Persist only to sessionStorage to avoid changing the URL repeatedly,
        // which can trigger scroll restoration and jump to top on some browsers.
        sessionStorage.setItem('validationEmail', email);
    }, [email]);

    const handleValidate = async () => {
        setError(null);
        setInfo(null);
        if (!email) {
            setError('Ingresa el correo.');
            return;
        }
        if (!/^\d{6}$/.test(code)) {
            setError('Ingresa el código de 6 dígitos.');
            return;
        }
        try {
            setSubmitting(true);
            const result: any = await ValidationService.validate({ email, code });
            // Si el backend devuelve un token tras validar, autenticamos y redirigimos según rol
            const maybeToken: string | undefined = result?.token;
            if (maybeToken) {
                useAuthStore.getState().login(maybeToken);
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
            }
            // Fallback: si no hay token, volvemos a login con prefill del correo
            setInfo('Validación exitosa. Redirigiendo al inicio de sesión…');
            showToast('Validación exitosa', { type: 'success', autoClose: 2000 });
            setTimeout(() => {
                navigate('/login', { replace: true, state: { justValidated: true, email } });
            }, 2000);
        } catch (e: any) {
            const status = e?.response?.status;
            if (status === 400) {
                setError('Código inválido.');
                showErrorToast('Código inválido. Verifica e intenta de nuevo.');
            } else if (status === 404) {
                setError('Usuario o validación no encontrados.');
                showErrorToast('Usuario o validación no encontrados.');
            } else {
                setError('Error al validar. Intenta de nuevo.');
                showErrorToast('Error al validar. Intenta de nuevo.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleResend = async () => {
        setError(null);
        setInfo(null);
        if (!email) {
            setError('Ingresa el correo para reenviar.');
            return;
        }
        try {
            setSubmitting(true);
            await ValidationService.resend({ email });
            setInfo('Te enviamos un nuevo código a tu correo.');
            showToast('Código reenviado', { type: 'info' });
            // Mantener el foco en el primer input vacío del código: CodeInput lo conserva
        } catch (e: any) {
            const status = e?.response?.status;
            if (status === 404) setError('Usuario o validación no encontrados.');
            else setError('No se pudo reenviar el código.');
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
                title="Validar tu cuenta"
                description="Ingresa el código de verificación enviado a tu correo"
            >
                <div className="space-y-4 mt-2">
                    <Input
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        disabled={submitting}
                        autoFocus={!email}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text">
                            Código de verificación
                        </label>
                        <CodeInput
                            length={6}
                            value={code}
                            onChange={setCode}
                            disabled={submitting}
                            className="justify-center"
                        />
                        <p className="text-xs text-muted-foreground">
                            Ingresa los 6 dígitos enviados a tu correo.
                        </p>
                    </div>

                    {error && (
                        <p className="text-sm text-danger" role="alert">
                            {error}
                        </p>
                    )}
                    {info && (
                        <p className="text-sm text-success" role="status">
                            {info}
                        </p>
                    )}

                    <div className="flex items-center gap-3">
                        <Button onClick={handleValidate} loading={submitting}>
                            Validar
                        </Button>
                        <Button variant="outline" onClick={handleResend} disabled={submitting}>
                            Reenviar código
                        </Button>
                    </div>

                    <div className="text-sm">
                        <Button variant="link" onClick={() => navigate('/login')}>
                            Volver a iniciar sesión
                        </Button>
                    </div>
                </div>
            </Card>
        </main>
    );
}

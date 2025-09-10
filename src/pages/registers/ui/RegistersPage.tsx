import { useNavigate } from 'react-router-dom';
import { Button, Card, Tooltip } from '@/shared/ui';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen w-full bg-cover bg-center">
            <div className="min-h-screen w-full bg-black/50">
                <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
                    <div className="mb-4">
                        <Tooltip content="Volver a la página anterior">
                            <Button
                                variant="ghost"
                                size="sm"
                                shape="pill"
                                leftIcon={<ArrowLeft size={18} />}
                                onClick={() => navigate(-1)}
                            >
                                Volver
                            </Button>
                        </Tooltip>
                    </div>

                    <Card
                        variant="elevated"
                        padding="lg"
                        elevation={2}
                        hoverable={false}
                        rounded="2xl"
                        className="backdrop-blur-[2px] bg-surface/95"
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <header className="flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold tracking-tight text-text">
                                    Crear cuenta
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Completa primero los datos base, selecciona tu rol y completa tu
                                    registro!
                                </p>
                            </header>
                            <img
                                src="/Logo.webp"
                                alt="Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </div>

                    </Card>
                </div>
            </div>
        </section>
    );
}

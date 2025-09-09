import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Divider, IconWithText } from '@/shared/ui';
import {
    Package,
    Smartphone,
    Globe,
    Users,
    Store,
    Bike,
    Shield,
    ListChecks,
    Beaker,
    CheckCircle2,
    Clock,
} from 'lucide-react';

const AboutPage: FC = () => {
    const navigate = useNavigate();
    return (
        <main className="px-4 py-12">
            {/* Hero */}
            <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center space-y-6 text-center">
                <div className="flex justify-center">
                    <Badge size="md">About · RapiEntrega Web</Badge>
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Una plataforma web para entregas a domicilio
                </h1>
                <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
                    Llevamos el servicio de RapiEntrega más allá del móvil: accesible desde
                    navegador, con módulos para clientes, tiendas, repartidores y administradores;
                    todo con foco en calidad y escalabilidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button onClick={() => navigate('/ui')}>Explorar UI</Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                        Ir al inicio
                    </Button>
                </div>
            </section>

            {/* Qué resolvemos */}
            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Qué problema resolvemos</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Limitaciones actuales"
                        description="Solo disponible en móviles, sin panel web integral."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Smartphone size={14} />}
                                text="Exclusivo para apps móviles"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Users size={14} />}
                                text="Accesibilidad limitada para algunos usuarios"
                            />
                            <IconWithText
                                size="xs"
                                icon={<ListChecks size={14} />}
                                text="Falta de panel administrativo integral"
                            />
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Nuestra solución"
                        description="Plataforma web modular y accesible, por roles."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Globe size={14} />}
                                text="Disponible en navegadores"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Store size={14} />}
                                text="Tiendas: catálogo y pedidos"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Bike size={14} />}
                                text="Repartidores: logística y rutas"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Shield size={14} />}
                                text="Administradores: supervisión y control"
                            />
                        </div>
                    </Card>
                </div>
            </section>

            {/* Competencias */}
            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Competencias que desarrollamos</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card
                        variant="elevated"
                        padding="lg"
                        title="Análisis y requerimientos"
                        description="Casos de uso y requisitos del sistema."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<ListChecks size={14} />}
                                text="Requerimientos funcionales y no funcionales"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Users size={14} />}
                                text="Entrevistas y análisis de procesos"
                            />
                        </div>
                    </Card>
                    <Card
                        variant="elevated"
                        padding="lg"
                        title="Metodologías ágiles"
                        description="Scrum y Kanban para entregas frecuentes."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<CheckCircle2 size={14} />}
                                text="Sprints y tableros Kanban"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Users size={14} />}
                                text="Colaboración y coordinación de equipos"
                            />
                        </div>
                    </Card>
                </div>
            </section>

            {/* Objetivos */}
            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Objetivos de aprendizaje</h2>
                <Card
                    variant="surface"
                    padding="lg"
                    title="General"
                    description="Desarrollar una plataforma web funcional y escalable para entregas a domicilio."
                >
                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <div className="mb-2 text-sm font-semibold text-muted-foreground">
                                Específicos
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <IconWithText
                                    size="xs"
                                    icon={<Package size={14} />}
                                    text="Módulos por rol con UX segura e intuitiva"
                                />
                                <IconWithText
                                    size="xs"
                                    icon={<Beaker size={14} />}
                                    text="Pruebas unitarias de componentes clave"
                                />
                                <IconWithText
                                    size="xs"
                                    icon={<Clock size={14} />}
                                    text="Flujos E2E: registro, pedido, entrega, seguimiento"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-sm font-semibold text-muted-foreground">
                                Calidad y escalabilidad
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <IconWithText
                                    size="xs"
                                    icon={<Shield size={14} />}
                                    text="Arquitectura modular y testeable"
                                />
                                <IconWithText
                                    size="xs"
                                    icon={<Globe size={14} />}
                                    text="Accesible desde web, más alcance"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            <Divider className="my-12" />

            {/* CTA final */}
            <section className="mx-auto max-w-7xl text-center">
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
                    Conoce los componentes y patrones de UI que usamos en la plataforma.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                    <Button onClick={() => navigate('/ui')}>Explorar UI</Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                        Volver al inicio
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;

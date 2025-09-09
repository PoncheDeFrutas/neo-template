import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, Divider, IconWithText } from '@/shared/ui';
import { MapPin, ShoppingBag, Store, Bike, Shield, Truck, Clock, Weight } from 'lucide-react';

const HomePage: FC = () => {
    const navigate = useNavigate();

    return (
        <main className="px-4 py-12">
            <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center space-y-6 text-center">
                <div className="flex justify-center">
                    <Badge size="md">Proyecto AYDS1 · RapiEntrega Web</Badge>
                </div>
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                    Gestión de entregas a domicilio, accesible y escalable
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
                    Plataforma web para clientes, tiendas, repartidores y administradores: explora
                    tiendas cercanas, realiza pedidos, sigue tus entregas en tiempo real y calcula
                    costos según el peso total.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button onClick={() => navigate('/ui')} leftIcon={<ShoppingBag size={16} />}>
                        Explorar UI
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/about')}
                        leftIcon={<MapPin size={16} />}
                    >
                        Conocer más
                    </Button>
                </div>
            </section>

            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Pensado para cada rol</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                    Módulos claros para quienes usan el sistema día a día.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card
                        as="a"
                        href="/ui"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/ui');
                        }}
                        clickable
                        variant="elevated"
                        padding="lg"
                        title="Clientes"
                        description="Explora tiendas cercanas, arma tu pedido y sigue el envío."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<ShoppingBag size={12} />}
                                text="Compras fáciles"
                            />
                            <IconWithText
                                size="xs"
                                icon={<MapPin size={12} />}
                                text="Tiendas cercanas"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Clock size={12} />}
                                text="Estado en tiempo real"
                            />
                        </div>
                    </Card>
                    <Card
                        as="a"
                        href="/about"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/about');
                        }}
                        clickable
                        variant="elevated"
                        padding="lg"
                        title="Tiendas"
                        description="Gestiona productos, precios y pedidos desde un panel claro."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Store size={14} />}
                                text="Catálogo y stock"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Clock size={14} />}
                                text="Pedidos en curso"
                            />
                        </div>
                    </Card>
                    <Card
                        as="a"
                        href="/about"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/about');
                        }}
                        clickable
                        variant="elevated"
                        padding="lg"
                        title="Repartidores"
                        description="Logística simple: rutas, tiempos y confirmaciones de entrega."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Bike size={14} />}
                                text="Rutas asignadas"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Clock size={14} />}
                                text="Tiempos estimados"
                            />
                        </div>
                    </Card>
                    <Card
                        as="a"
                        href="/about"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/about');
                        }}
                        clickable
                        variant="elevated"
                        padding="lg"
                        title="Administradores"
                        description="Supervisa operación, métricas y usuarios con control total."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Shield size={14} />}
                                text="Seguridad y roles"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Clock size={14} />}
                                text="Indicadores clave"
                            />
                        </div>
                    </Card>
                </div>
            </section>

            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-1 text-xl font-semibold">Cómo funciona</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                    Tres pasos simples desde el pedido hasta la entrega.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="1. Realiza tu pedido"
                        description="Elige productos, confirma tu dirección y método de pago."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<ShoppingBag size={14} />}
                                text="Arma tu carrito"
                            />
                            <IconWithText
                                size="xs"
                                icon={<MapPin size={14} />}
                                text="Dirección precisa"
                            />
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="2. Preparación y asignación"
                        description="La tienda prepara el pedido y se asigna un repartidor."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Store size={14} />}
                                text="Confirmación de tienda"
                            />
                            <IconWithText
                                size="xs"
                                icon={<Truck size={14} />}
                                text="Asignación de entrega"
                            />
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="3. Seguimiento y entrega"
                        description="Sigue tu pedido en tiempo real hasta la puerta."
                    >
                        <div className="mt-2 flex flex-wrap gap-3">
                            <IconWithText
                                size="xs"
                                icon={<Clock size={14} />}
                                text="Tiempo estimado"
                            />
                            <IconWithText
                                size="xs"
                                icon={<MapPin size={14} />}
                                text="Ubicación en vivo"
                            />
                        </div>
                    </Card>
                </div>
            </section>

            <section className="mx-auto mt-14 max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Funcionalidades clave</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Explora tiendas cercanas"
                        description="Localiza comercios disponibles por zona o categoría."
                    />
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Seguimiento en tiempo real"
                        description="Consulta el estado y el progreso de tus entregas."
                    />
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Pedidos sencillos"
                        description="Flujos claros para armar y pagar tu pedido."
                    />
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Costo según peso"
                        description="Cálculo automático de envío por peso total."
                        footer={
                            <div className="pt-1">
                                <IconWithText
                                    size="xs"
                                    icon={<Weight size={14} />}
                                    text="Transparencia en costos"
                                />
                            </div>
                        }
                    />
                </div>

                <Divider className="my-8" />
            </section>
        </main>
    );
};

export default HomePage;

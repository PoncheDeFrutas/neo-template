import { Home, Info, LayoutGrid } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from '@/shared/ui';

const NotFoundPage: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen grid place-items-center p-6">
            <div className="w-full max-w-xl text-center">
                <div className="mb-6 select-none">
                    <div className="text-7xl font-black tracking-tight text-muted-foreground opacity-20">
                        404
                    </div>
                </div>
                <Card variant="elevated" padding="lg" className="text-center">
                    <h1 className="text-xl font-semibold text-text">Página no encontrada</h1>
                    <p className="text-sm text-muted-foreground">
                        La ruta que buscas no existe o fue movida.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                        <Button onClick={() => navigate('/')} leftIcon={<Home size={16} />}>
                            Volver al inicio
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/ui')}
                            leftIcon={<LayoutGrid size={16} />}
                        >
                            Explorar UI
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/about')}
                            leftIcon={<Info size={16} />}
                        >
                            Acerca de
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NotFoundPage;

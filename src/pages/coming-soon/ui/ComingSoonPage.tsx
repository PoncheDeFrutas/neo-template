import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, EmptyState } from '@/shared/ui';

type Props = {
    title: string;
    description?: string;
};

const ComingSoonPage: FC<Props> = ({ title, description }) => {
    const navigate = useNavigate();
    return (
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
            <Card variant="elevated" className="w-full max-w-2xl" padding="lg" title={title}>
                <EmptyState
                    className="mt-4"
                    title="Próximamente"
                    description={
                        description ||
                        'Estamos trabajando en esta sección. Vuelve más tarde para ver las novedades.'
                    }
                    action={
                        <Button variant="outline" onClick={() => navigate('/client')}>
                            Volver al inicio del cliente
                        </Button>
                    }
                />
            </Card>
        </main>
    );
};

export default ComingSoonPage;

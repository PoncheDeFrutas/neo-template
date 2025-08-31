import { Button } from '@shared/ui';
import type { FC } from 'react';

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="mt-4 flex gap-4">
                <Button size="sm" variant="primary">
                    Small
                </Button>
                <Button size="md" variant="secondary">
                    Medium
                </Button>
                <Button size="lg" variant="outline">
                    Large
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
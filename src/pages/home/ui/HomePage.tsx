import { ThemeToggle } from '@/features/theme-toogle';
import { Input } from '@/shared/ui';
import { CounterWidget } from '@widgets/counter';
import type { FC } from 'react';

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="mt-8">
                <CounterWidget />
                <ThemeToggle />
                <Input />
            </div>
        </div>
    );
};

export default HomePage;

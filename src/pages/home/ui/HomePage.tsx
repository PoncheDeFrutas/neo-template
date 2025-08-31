import { Button } from '@shared/ui';
import type { FC } from 'react';

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="mt-4 flex gap-4">
                <Button size="small" primary={true} label="Small Button" onClick={() => alert('Small Button clicked!')}>
                    Small
                </Button>
                <Button size="medium" primary={false} label="Medium Button" onClick={() => alert('Medium Button clicked!')}>
                    Medium
                </Button>
                <Button size="large" primary={false} label="Large Button" onClick={() => alert('Large Button clicked!')}>
                    Large
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
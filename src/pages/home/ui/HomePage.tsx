import { Button } from '@shared/ui';
import type { FC } from 'react';

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="mt-4 flex gap-4">
                <Button
                    size="small"
                    primary={true}
                    label="Small Button"
                    onClick={() => alert('Small Button clicked!')}
                />
                <Button
                    size="medium"
                    primary={false}
                    label="Medium Button"
                    onClick={() => alert('Medium Button clicked!')}
                />
                <Button
                    size="large"
                    primary={false}
                    label="Large Button"
                    onClick={() => alert('Large Button clicked!')}
                />
            </div>
        </div>
    );
};

export default HomePage;

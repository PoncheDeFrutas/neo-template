import { CounterButton, useCounter } from '@features/counter';
import { Button } from '@shared/ui';
import type { FC } from 'react';

export const CounterWidget: FC = () => {
    const { decrement } = useCounter();
    return (
        <div className="flex gap-2">
            <CounterButton />
            <Button label="Decrement" onClick={decrement} />
        </div>
    );
};

export default CounterWidget;

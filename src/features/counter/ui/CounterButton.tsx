import { Button } from '@shared/ui';
import { useCounter } from '../model/useCounter';
import type { FC } from 'react';

export const CounterButton: FC = () => {
    const { count, increment } = useCounter();
    return <Button label={`Count: ${count}`} onClick={increment} />;
};

export default CounterButton;
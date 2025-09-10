import { beforeEach, describe, expect, it } from 'vitest';

import { useCounter } from './useCounter';

beforeEach(() => {
    useCounter.setState({ count: 0 });
});

describe('useCounter', () => {
    it('increment increases count', () => {
        const { increment } = useCounter.getState();
        increment();
        expect(useCounter.getState().count).toBe(1);
    });

    it('decrement reduces count', () => {
        const { decrement } = useCounter.getState();
        decrement();
        expect(useCounter.getState().count).toBe(-1);
    });
});

import { useEffect, useRef, useState } from 'react';

import { Input } from './input';

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export interface PinCodeInputProps {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function PinCodeInput({ length = 4, value, onChange, className }: PinCodeInputProps) {
    const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (value !== undefined) {
            const next = value.split('').slice(0, length);
            while (next.length < length) next.push('');
            setDigits(next);
        }
    }, [value, length]);

    const updateDigits = (next: string[]) => {
        if (value === undefined) setDigits(next);
        onChange?.(next.join(''));
    };

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '').slice(-1);
        const next = [...digits];
        next[index] = val;
        updateDigits(next);
        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData('text')
            .replace(/[^0-9]/g, '')
            .slice(0, length);
        const next = pasted.split('');
        while (next.length < length) next.push('');
        updateDigits(next);
        const focusIndex = Math.min(pasted.length, length) - 1;
        if (focusIndex >= 0) {
            inputsRef.current[focusIndex]?.focus();
        }
    };

    return (
        <div className={cn('flex gap-2', className)}>
            {Array.from({ length }).map((_, i) => (
                <Input
                    key={i}
                    ref={(el) => {
                        inputsRef.current[i] = el;
                    }}
                    className="w-10 text-center"
                    maxLength={1}
                    value={digits[i]}
                    onChange={handleChange(i)}
                    onKeyDown={handleKeyDown(i)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
            ))}
        </div>
    );
}

export default PinCodeInput;

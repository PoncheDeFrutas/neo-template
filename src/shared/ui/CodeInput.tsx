import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

type Props = {
    length?: number;
    value?: string;
    onChange?: (code: string) => void;
    onComplete?: (code: string) => void;
    disabled?: boolean;
    error?: string | boolean;
    className?: string;
};

export function CodeInput({
    length = 6,
    value,
    onChange,
    onComplete,
    disabled,
    error,
    className,
}: Props) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [internal, setInternal] = useState<string>(() => (value ?? '').padEnd(length, ' '));

    useEffect(() => {
        if (typeof value === 'string') setInternal((value ?? '').padEnd(length, ' '));
    }, [value, length]);

    const digits = useMemo(() => {
        const padded = (internal ?? '').padEnd(length, ' ');
        return padded.slice(0, length).split('');
    }, [internal, length]);
    const setDigit = (idx: number, next: string) => {
        const arr = [...digits];
        arr[idx] = next;
        const nextCode = arr.join('').trimEnd();
        setInternal(nextCode.padEnd(length, ' '));
        onChange?.(nextCode);
        if (nextCode.replace(/\s/g, '').length === length)
            onComplete?.(nextCode.replace(/\s/g, ''));
    };

    const focusAt = (idx: number) => inputsRef.current[idx]?.focus();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        let v = e.target.value.replace(/\D/g, ''); // digits only
        if (!v) {
            setDigit(idx, ' ');
            return;
        }
        // Support pasting multiple digits
        if (v.length > 1) {
            const arr = [...digits];
            for (let i = 0; i < v.length && idx + i < length; i++) arr[idx + i] = v[i];
            const nextCode = arr.join('').trimEnd();
            setInternal(nextCode.padEnd(length, ' '));
            onChange?.(nextCode);
            const lastIdx = Math.min(idx + v.length, length - 1);
            focusAt(lastIdx);
            if (nextCode.replace(/\s/g, '').length === length)
                onComplete?.(nextCode.replace(/\s/g, ''));
        } else {
            setDigit(idx, v);
            if (idx < length - 1) focusAt(idx + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace') {
            if ((digits[idx] ?? '').trim() === '') {
                if (idx > 0) focusAt(idx - 1);
            } else {
                setDigit(idx, ' ');
            }
        } else if (e.key === 'ArrowLeft') {
            if (idx > 0) focusAt(idx - 1);
        } else if (e.key === 'ArrowRight') {
            if (idx < length - 1) focusAt(idx + 1);
        }
    };

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {Array.from({ length }).map((_, idx) => (
                <input
                    key={idx}
                    ref={(el) => {
                        inputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="\\d*"
                    maxLength={1}
                    className={cn(
                        'h-12 w-10 rounded-md border text-center text-base',
                        'border-border bg-surface text-text outline-none',
                        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
                        disabled && 'opacity-50',
                        error && 'border-danger focus-visible:ring-danger/70',
                    )}
                    value={(digits[idx] ?? '').trim()}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    disabled={disabled}
                    aria-invalid={!!error}
                />
            ))}
        </div>
    );
}

export default CodeInput;

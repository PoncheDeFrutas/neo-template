import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
    label?: ReactNode;
    description?: ReactNode;
    error?: string | boolean;
    size?: Size;
    containerClassName?: string;
};

const controlSize: Record<Size, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
};
const dotAfter: Record<Size, string> = {
    sm: 'after:w-2 after:h-2 after:top-[3px] after:left-[3px]',
    md: 'after:w-2.5 after:h-2.5 after:top-[4px] after:left-[4px]',
    lg: 'after:w-3 after:h-3 after:top-[5px] after:left-[5px]',
};
const labelTextSize: Record<Size, string> = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
    const {
        id,
        name,
        label,
        description,
        error,
        size = 'md',
        disabled,
        className,
        containerClassName,
        required,
        ...rest
    } = props;

    const autoId = useId();
    const inputId = id ?? `${name ?? 'radio'}-${autoId}`;
    const hintId = description ? `${inputId}-desc` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);

    return (
        <label
            htmlFor={inputId}
            className={cn(
                'group flex items-start gap-3 select-none',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                containerClassName,
            )}
        >
            <input
                ref={ref}
                id={inputId}
                name={name}
                type="radio"
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                required={required}
                className={cn('peer sr-only', className)}
                {...rest}
            />
            <span
                aria-hidden
                className={cn(
                    'mt-0.5 inline-flex items-center justify-center rounded-full border bg-elevated relative pointer-events-none',
                    'transition-all duration-200 ease-out',
                    'border-border hover:border-strong',
                    'peer-focus-visible:ring-2 ring-ring peer-focus-visible:border-transparent',
                    'peer-checked:border-[var(--color-primary)]',
                    'after:content-[""] after:absolute after:rounded-full after:bg-[var(--color-primary)] after:opacity-0 peer-checked:after:opacity-100',
                    'after:block',
                    hasError && 'border-danger',
                    controlSize[size],
                    dotAfter[size],
                )}
            />
            {(label || description || hasError) && (
                <span className="-mt-0.5 flex-1">
                    {label && (
                        <span className={cn('block font-medium text-text', labelTextSize[size])}>
                            {label}
                            {required ? <span className="text-danger"> *</span> : null}
                        </span>
                    )}
                    {description && !hasError ? (
                        <span id={hintId} className="mt-0.5 block text-xs text-muted-foreground">
                            {description}
                        </span>
                    ) : null}
                    {typeof error === 'string' && (
                        <span id={errorId} className="mt-0.5 block text-xs text-danger">
                            {error}
                        </span>
                    )}
                </span>
            )}
        </label>
    );
});

Radio.displayName = 'Radio';

export default Radio;

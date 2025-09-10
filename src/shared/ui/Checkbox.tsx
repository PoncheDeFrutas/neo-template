import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
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

const labelTextSize: Record<Size, string> = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
};

// Using native checkbox with accent-color for better cross-theme visibility

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
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
        style,
        ...rest
    } = props;

    const autoId = useId();
    const inputId = id ?? `${name ?? 'checkbox'}-${autoId}`;
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
                type="checkbox"
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                required={required}
                className={cn(
                    'mt-0.5 flex-shrink-0 align-top',
                    controlSize[size],
                    'rounded-sm border border-border bg-bg',
                    'hover:border-strong',
                    'focus-visible:outline-none focus-visible:ring-2 ring-ring',
                    hasError && 'border-danger',
                    className,
                )}
                style={{
                    accentColor: hasError ? 'var(--color-danger)' : 'var(--color-primary)',
                    ...(style as CSSProperties),
                }}
                {...rest}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;

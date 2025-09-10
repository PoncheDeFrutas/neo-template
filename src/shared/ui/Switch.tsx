import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
    label?: ReactNode;
    size?: Size;
    containerClassName?: string;
};

const trackSizes: Record<Size, string> = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-8 w-14',
};

const thumbSizes: Record<Size, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
};

const thumbTranslateX: Record<Size, string> = {
    sm: 'peer-checked:translate-x-4',
    md: 'peer-checked:translate-x-5',
    lg: 'peer-checked:translate-x-6',
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
    const {
        id,
        name,
        label,
        size = 'md',
        disabled,
        className,
        containerClassName,
        required,
        ...rest
    } = props;
    const autoId = useId();
    const inputId = id ?? `${name ?? 'switch'}-${autoId}`;

    return (
        <label
            htmlFor={inputId}
            className={cn(
                'group inline-flex items-center gap-3 select-none',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                containerClassName,
            )}
        >
            <span className={cn('relative inline-flex items-center', trackSizes[size])}>
                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    type="checkbox"
                    disabled={disabled}
                    required={required}
                    className={cn('peer sr-only', className)}
                    {...rest}
                />
                {/* Track */}
                <span
                    aria-hidden
                    className={cn(
                        'absolute inset-0 rounded-full transition-colors duration-200 ease-out',
                        // Tailwind colors: off=red, on=green (slightly muted)
                        'bg-red-500 peer-checked:bg-green-600',
                        // Focus ring also switches color
                        'peer-focus-visible:ring-2 ring-red-300 peer-checked:ring-green-400',
                    )}
                />
                {/* Thumb */}
                <span
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 translate-x-0 rounded-full shadow',
                        // Thumb color: light for contrast in both states
                        'bg-white transition-transform transition-colors duration-200 ease-out',
                        // Slight tint if desired
                        'peer-checked:bg-white',
                        thumbSizes[size],
                        thumbTranslateX[size],
                    )}
                />
            </span>
            {label && (
                <span className="text-sm font-medium text-text">
                    {label}
                    {required ? <span className="text-danger"> *</span> : null}
                </span>
            )}
        </label>
    );
});

Switch.displayName = 'Switch';

export default Switch;

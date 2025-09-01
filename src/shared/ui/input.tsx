import { forwardRef, type InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type ValidationState = 'none' | 'success' | 'error';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
    validationState?: ValidationState;
}

const baseStyles =
    'flex w-full rounded-md border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const validationStyles: Record<ValidationState, string> = {
    none: 'border-gray-300 focus-visible:ring-blue-500',
    success: 'border-green-500 focus-visible:ring-green-500',
    error: 'border-red-500 focus-visible:ring-red-500',
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const sizeStyles: Record<InputSize, string> = {
    sm: 'h-8 px-2 py-1 text-sm',
    md: 'h-10 px-3 py-2 text-sm',
    lg: 'h-12 px-4 py-3 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, size = 'md', validationState = 'none', ...props },
    ref,
) {
    return (
        <input
            ref={ref}
            className={cn(
                baseStyles,
                validationStyles[validationState],
                sizeStyles[size],
                className,
            )}
            {...props}
        />
    );
});

export default Input;
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type ValidationState = 'none' | 'success' | 'error';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
    validationState?: ValidationState;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    helperText?: string;
}

const baseStyles =
    'w-full rounded-md border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const validationStyles: Record<ValidationState, string> = {
    none: 'border-gray-300 focus-visible:ring-blue-500',
    success: 'border-green-500 focus-visible:ring-green-500',
    error: 'border-red-500 focus-visible:ring-red-500',
};

function cn(...classes: Array<string | false | null | undefined | number | bigint>) {
    return classes.filter(Boolean).join(' ');
}

const sizeStyles: Record<InputSize, string> = {
    sm: 'h-8 px-2 py-1 text-sm',
    md: 'h-10 px-3 py-2 text-sm',
    lg: 'h-12 px-4 py-3 text-base',
};

const leftPaddingStyles: Record<InputSize, string> = {
    sm: 'pl-8',
    md: 'pl-10',
    lg: 'pl-12',
};

const rightPaddingStyles: Record<InputSize, string> = {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        className,
        size = 'md',
        validationState = 'none',
        leftElement,
        rightElement,
        helperText,
        ...props
    },
    ref,
) {
    return (
        <div className="relative w-full">
            {leftElement && (
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    {leftElement}
                </span>
            )}
            <input
                ref={ref}
                className={cn(
                    baseStyles,
                    validationStyles[validationState],
                    sizeStyles[size],
                    leftElement && leftPaddingStyles[size],
                    rightElement && rightPaddingStyles[size],
                    className,
                )}
                {...props}
            />
            {rightElement && (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {rightElement}
                </span>
            )}
            {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});

export default Input;

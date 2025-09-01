import { forwardRef, type InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
}

const baseStyles =
'flex w-full rounded-md border border-gray-300 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const sizeStyles: Record<InputSize, string> = {
    sm: 'h-8 px-2 py-1 text-sm',
    md: 'h-10 px-3 py-2 text-sm',
    lg: 'h-12 px-4 py-3 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, size = 'md', ...props },
    ref,
) {
    return <input ref={ref} className={cn(baseStyles, sizeStyles[size], className)} {...props} />;
});

export default Input;

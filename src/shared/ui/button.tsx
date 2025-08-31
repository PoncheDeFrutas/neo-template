import { type ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonState = 'default' | 'loading' | 'disabled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    backgroundColor?: string;
    size?: ButtonSize;
    state?: ButtonState;
    label: string;
    onClick?: () => void;
}

const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const sizeStyles: Record<ButtonSize, string> = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-4',
    large: 'h-12 px-6 text-lg',
};

function getStateStyles(state: ButtonState) {
    switch (state) {
        case 'loading':
            return 'opacity-75 cursor-wait animate-pulse';
        case 'disabled':
            return 'opacity-50 cursor-not-allowed';
        default:
            return '';
    }
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

/** Primary UI component for user interaction */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { 
        primary = false, 
        size = 'medium', 
        state = 'default', 
        backgroundColor, 
        label, 
        className,
        ...props 
    },
    ref,
) {
    const mode = primary 
        ? 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500' 
        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500';
    
    return (
        <button
            ref={ref}
            type="button"
            className={cn(baseStyles, sizeStyles[size], mode, getStateStyles(state), className)}
            style={{ backgroundColor }}
            {...props}
        >
            {label}
        </button>
    );
});

export default Button;
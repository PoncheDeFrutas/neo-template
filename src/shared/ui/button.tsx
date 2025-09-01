import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

export type ButtonVariant = 'default' | 'outline' | 'gradient' | 'gradientOutline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    pill?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    label?: ReactNode;
    color?: string;
}

const baseStyles =
    'inline-flex items-center justify-center font-medium focus:outline-none ' +
    'focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 ' +
    'disabled:pointer-events-none';

const sizeStyles: Record<ButtonSize, string> = {
    xs: 'text-xs px-3 py-2',
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-5 py-3',
    xl: 'text-base px-6 py-3.5',
};

const variantStyles: Record<ButtonVariant, string> = {
    default: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    outline:
        'border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-blue-500',
    gradient:
        'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-300',
    gradientOutline:
        'text-blue-700 border-2 border-cyan-500 hover:text-white ' +
        'hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 focus:ring-cyan-300',
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        variant = 'default',
        size = 'md',
        pill = false,
        leftIcon,
        rightIcon,
        icon,
        loading = false,
        disabled,
        className,
        label,
        color,
        style,
        children,
        ...props
    },
    ref,
) {
    const isDisabled = disabled || loading;
    const content = children ?? label;

    const colorStyle =
        color && (variant === 'outline' || variant === 'gradientOutline')
            ? { color, borderColor: color }
            : color
              ? { backgroundColor: color }
              : undefined;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            style={{ ...colorStyle, ...style }}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                pill ? 'rounded-full' : 'rounded-lg',
                className,
            )}
            {...props}
        >
            {loading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}

            {icon ? (
                <span className="h-5 w-5">{icon}</span>
            ) : (
                <>
                    {leftIcon && <span className={content ? 'mr-2' : ''}>{leftIcon}</span>}
                    {content}
                    {rightIcon && <span className={content ? 'ml-2' : ''}>{rightIcon}</span>}
                </>
            )}
        </button>
    );
});

export default Button;

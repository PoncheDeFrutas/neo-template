import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/cn';
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'custom';
type Size = 'sm' | 'md' | 'lg' | 'icon';
type Shape = 'rounded' | 'square' | 'pill' | 'circle';
type CommonProps = {
    label?: string;
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
};
type ButtonAsButton = {
    as?: 'button';
} & ButtonHTMLAttributes<HTMLButtonElement> &
    CommonProps;
type ButtonAsAnchor = {
    as: 'a';
} & AnchorHTMLAttributes<HTMLAnchorElement> &
    CommonProps;
export type ButtonProps = ButtonAsButton | ButtonAsAnchor;
const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-700 ease-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none';

const variantClasses: Record<Exclude<Variant, 'custom'>, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    outline: 'bg-bg text-text border-border !border-[0.75px] hover:bg-opacity-50',
    ghost: 'bg-transparent text-text hover:bg-elevated',
    link: 'bg-transparent underline underline-offset-4 hover:no-underline',
    destructive: 'bg-danger text-danger-foreground hover:opacity-90',
};
const sizeClasses: Record<Size, string> = {
    sm: 'h-8 px-3 py-1.5 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base',
    icon: 'h-10 w-10 p-0',
};
function Spinner() {
    return (
        <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (props, ref) => {
        const {
            as = 'button',
            label,
            children,
            variant = 'primary',
            size = 'md',
            shape = 'rounded',
            fullWidth,
            loading,
            leftIcon,
            rightIcon,
            className,
            disabled,
            ...rest
        } = props as ButtonProps & { disabled?: boolean };
        const isLink = as === 'a';
        const isLinkVariant = variant === 'link';
        const shapeClass =
            shape === 'square'
                ? 'rounded-none'
                : shape === 'pill' || shape === 'circle'
                  ? 'rounded-full'
                  : 'rounded-md';
        const variantClass = variant === 'custom' ? '' : variantClasses[variant];
        const feedbackClass = isLinkVariant ? '' : 'active:scale-95';
        const classes = cn(
            baseClasses,
            variantClass,
            isLinkVariant ? 'p-0 h-auto' : sizeClasses[size],
            fullWidth && 'w-full',
            shapeClass,
            feedbackClass,
            className,
        );
        const content = (
            <>
                {size === 'icon' ? (
                    <>{loading ? <Spinner /> : (children ?? leftIcon ?? rightIcon)}</>
                ) : (
                    <>
                        {loading && <Spinner />}
                        {leftIcon}
                        {(children ?? label) ? (
                            <span className="whitespace-nowrap">{children ?? label}</span>
                        ) : null}
                        {rightIcon}
                    </>
                )}
            </>
        );
        const ariaProps = {
            'aria-busy': loading || undefined,
            'aria-disabled': disabled || loading || undefined,
        };
        if (isLink) {
            const { onClick, href, target, rel } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
            return (
                <a
                    ref={ref as Ref<HTMLAnchorElement>}
                    href={href}
                    target={target}
                    rel={rel}
                    onClick={onClick}
                    className={classes}
                    {...ariaProps}
                >
                    {content}
                </a>
            );
        }
        const { type = 'button', onClick } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
        return (
            <button
                ref={ref as Ref<HTMLButtonElement>}
                type={type}
                onClick={onClick}
                className={classes}
                disabled={disabled || loading}
                {...ariaProps}
            >
                {content}
            </button>
        );
    },
);
Button.displayName = 'Button';
export default Button;

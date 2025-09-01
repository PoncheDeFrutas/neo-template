import { type ButtonHTMLAttributes, forwardRef, type ReactNode, useState } from 'react';

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
    gradient: 'text-white bg-gradient-to-r hover:bg-gradient-to-r focus:ring-cyan-300',
    gradientOutline:
        'text-blue-700 border-2 border-cyan-500 hover:text-white ' +
        'hover:bg-gradient-to-r focus:ring-cyan-300',
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const defaultFrom = '#06b6d4';
const defaultTo = '#3b82f6';

function adjustColor(baseColor: string): string {
    const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

    const hex = baseColor.trim();
    if (/^#([0-9a-f]{3})$/i.test(hex)) {
        const [, h] = /^#([0-9a-f]{3})$/i.exec(hex)!;
        const r = parseInt(h[0] + h[0], 16);
        const g = parseInt(h[1] + h[1], 16);
        const b = parseInt(h[2] + h[2], 16);
        return rgbToHex(adjustRGB(r, g, b));
    }
    if (/^#([0-9a-f]{6})$/i.test(hex)) {
        const [, h] = /^#([0-9a-f]{6})$/i.exec(hex)!;
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        return rgbToHex(adjustRGB(r, g, b));
    }

    const rgbMatch = baseColor.match(/^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\)$/i);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);
        const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : undefined;
        const [nr, ng, nb] = adjustRGB(r, g, b);
        return a !== undefined ? `rgba(${nr}, ${ng}, ${nb}, ${a})` : `rgb(${nr}, ${ng}, ${nb})`;
    }

    return baseColor;

    function rgbToHex([r, g, b]: [number, number, number]) {
        const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    function adjustRGB(r: number, g: number, b: number): [number, number, number] {
        const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
        const factor = 0.12;
        if (lum > 0.5) {
            return [clamp(r * (1 - factor)), clamp(g * (1 - factor)), clamp(b * (1 - factor))];
        }
        return [clamp(r + (255 - r) * factor), clamp(g + (255 - g) * factor), clamp(b + (255 - b) * factor)];
    }
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
    const [hovered, setHovered] = useState(false);

    const colorStyle = (() => {
        if (!color) return undefined;
        if (variant === 'outline' || variant === 'gradientOutline') {
            return hovered ? { borderColor: color } : { color, borderColor: color };
        }
        return { backgroundColor: color };
    })();

    const from = color ?? defaultFrom;
    const to = adjustColor(color ?? defaultTo);
    const gradientStyle =
        variant === 'gradient'
            ? { backgroundImage: `linear-gradient(to right, ${from}, ${to})` }
            : variant === 'gradientOutline' && hovered
              ? { backgroundImage: `linear-gradient(to right, ${from}, ${to})` }
              : undefined;

    const { onMouseEnter: userOnMouseEnter, onMouseLeave: userOnMouseLeave, ...restProps } = props;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            style={{ ...colorStyle, ...gradientStyle, ...style }}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                pill ? 'rounded-full' : 'rounded-lg',
                className,
            )}
            onMouseEnter={(e) => {
                setHovered(true);
                userOnMouseEnter?.(e);
            }}
            onMouseLeave={(e) => {
                setHovered(false);
                userOnMouseLeave?.(e);
            }}
            {...restProps}
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

import { type CSSProperties, type ReactNode } from 'react';

export type BadgeVariant = 'default' | 'bordered' | 'pill' | 'link' | 'notification' | 'chips';

export type BadgeSize = 'default' | 'large';

export interface BadgeProps {
    children?: ReactNode;
    size?: BadgeSize;
    variant?: BadgeVariant;
    href?: string;
    icon?: ReactNode;
    iconOnly?: boolean;
    onRemove?: () => void;
    color?: string;
    textColor?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export function Badge({
    children,
    size = 'default',
    variant = 'default',
    href,
    icon,
    iconOnly = false,
    onRemove,
    color,
    textColor,
}: BadgeProps) {
    const base = iconOnly
        ? 'inline-flex items-center justify-center p-1'
        : 'inline-block rounded px-2 py-0.5 text-xs';
    const sizeStyles = size === 'large' ? 'text-sm px-3 py-1' : '';
    const variantBase: Record<BadgeVariant, string> = {
        default: '',
        bordered: 'border',
        pill: 'rounded-full',
        link: '',
        notification: 'relative',
        chips: 'inline-flex items-center',
    };

    const computedText = color
        ? textColor ?? getContrastColor(color)
        : undefined;
    const style: CSSProperties | undefined = color
        ? {
              backgroundColor: color,
              color: computedText,
              ...(variant === 'bordered' ? { borderColor: computedText } : {}),
          }
        : undefined;

    let className = cn(base, sizeStyles, variantBase[variant]);
    if (!color) {
        className = cn(
            className,
            'bg-blue-100 text-blue-800',
            variant === 'bordered' && 'border-blue-800',
            variant === 'link' && 'hover:bg-blue-200',
        );
    } else if (variant === 'link') {
        className = cn(className, 'hover:opacity-80');
    }

    if (icon && !iconOnly && variant !== 'chips') {
        className = cn(className, 'inline-flex items-center gap-1');
    }

    const content = iconOnly ? (
        icon
    ) : (
        <>
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
            {variant === 'notification' && (
                <span
                    className={
                        color
                            ? 'absolute top-0 right-0 block h-2 w-2 rounded-full'
                            : 'absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-800'
                    }
                    style={color ? { backgroundColor: computedText } : undefined}
                />
            )}
            {variant === 'chips' && (
                <button type="button" className="ms-2" aria-label="remove" onClick={onRemove}>
                    &times;
                </button>
            )}
        </>
    );

    if (variant === 'link' && href) {
        return (
            <a href={href} className={className} style={style}>
                {content}
            </a>
        );
    }

    return <span className={className}>{content}</span>;
    return (
        <span className={className} style={style}>
            {content}
        </span>
    );
}

function getContrastColor(baseColor: string): string {
    const rgb = (() => {
        if (baseColor.startsWith('#')) {
            const hex = baseColor.slice(1);
            const normalized =
                hex.length === 3
                    ? hex
                          .split('')
                          .map((c) => c + c)
                          .join('')
                    : hex;
            const num = parseInt(normalized, 16);
            return {
                r: (num >> 16) & 255,
                g: (num >> 8) & 255,
                b: num & 255,
            };
        }
        const match = baseColor.match(
            /^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i,
        );
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10),
            };
        }
        return { r: 0, g: 0, b: 0 };
    })();

    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}